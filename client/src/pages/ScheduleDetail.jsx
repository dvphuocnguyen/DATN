import BorderColorIcon from "@mui/icons-material/BorderColor";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  List,
  ListItem,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";

import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SavingsIcon from "@mui/icons-material/Savings";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tripAPI } from "~/apis";
import Page from "~/components/Page";
import NumericFormatCustom from "~/components/form/Number/NumericFormatCustom";
import { Footer, MailList, NavBar } from "~/components/home";
import { APPLICATION_NAME } from "~/constants";
import { appActions } from "~/features/app/appSlice";
import { sleep } from "~/utils";
import { fPrice } from "~/utils/formatNumber";
import { formatDateVN } from "~/utils/formatTime";

const cost_details = {
  move: {
    cost: 0,
    quantityPeople: 0,
  },
  shopping: {
    cost: 0,
    quantityPeople: 0,
  },
  ticket: {
    cost: 0,
    quantityPeople: 0,
  },
  foodDrinks: {
    cost: 0,
    quantityPeople: 0,
  },
};

const keys = {
  move: "Di chuyển",
  shopping: "Mua sắm",
  ticket: "Vé thăm quan",
  foodDrinks: "Thức ăn",
};

const icons = {
  move: <DirectionsCarFilledIcon />,
  shopping: <ShoppingBagIcon />,
  ticket: <ConfirmationNumberIcon />,
  foodDrinks: <FastfoodIcon />,
};

const ScheduleDetail = () => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useLayoutEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getData = async () => {
      try {
        dispatch(appActions.setOpenOverlay(true));

        const response = await tripAPI.getById(id);

        await sleep();

        console.log(`response::`, response);

        if (!response.data) {
          toast.error("Chuyến đi không tồn tại!");
          navigate("/");
          return;
        }

        setDetails(response.data);
      } catch (error) {
      } finally {
        dispatch(appActions.setOpenOverlay(false));
      }
    };

    getData();

    return () => {
      setDetails(null);
    };
  }, [id]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleChangeValue =
    (key, type) =>
    ({ target: { value } }) => {
      const prevDetails = { ...details };

      if (!prevDetails.cost_details) return;

      prevDetails.cost_details[key][type] = value;

      const tripFee = Object.keys(prevDetails.cost_details).reduce((acc, key) => {
        return (acc +=
          prevDetails.cost_details[key].cost * prevDetails.cost_details[key].quantityPeople);
      }, 0);

      prevDetails.trip_fee = tripFee;

      setDetails(prevDetails);
    };

  const handleSaveChangeCost = async () => {
    if (!details?.cost_details) return;

    const payload = {
      cost_details: details.cost_details,
      trip_fee: details.trip_fee,
    };

    try {
      dispatch(appActions.setOpenOverlay(true));
      dispatch(appActions.setText("Đang cập nhật"));
      const { data } = await tripAPI.updateCost(details.id, payload);
      setDetails(data);
    } catch (error) {
      console.log(`error::`, error);
    } finally {
      dispatch(appActions.setOpenOverlay(false));
      dispatch(appActions.setText(""));
    }
  };

  const DrawerList = (
    <Box sx={{ width: "800px" }} role="presentation">
      <List>
        <ListItem disablePadding>
          <Stack sx={{ width: "100%", p: 2 }}>
            <Stack sx={{ flexDirection: "row", gap: 1, alignItems: "center" }}>
              <SavingsIcon color="warning" fontSize="large" />

              <Typography fontWeight={"bold"} textTransform={"uppercase"}>
                Chi phí dự kiến
              </Typography>

              <Typography fontWeight={"bold"} textTransform={"uppercase"}>
                {fPrice(details?.trip_fee || 0)}
              </Typography>
            </Stack>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Chi phí</TableCell>
                  <TableCell align="left">Giá/Người</TableCell>
                  <TableCell align="right">Số người</TableCell>
                  <TableCell align="right">Tổng</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {details?.cost_details
                  ? Object.keys(details.cost_details).map((key, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                              {icons[key]}
                              {keys[key]}
                            </Stack>
                          </TableCell>

                          <TableCell align="left" width={200}>
                            <TextField
                              onChange={handleChangeValue(key, "cost")}
                              size="small"
                              fullWidth
                              value={details?.cost_details?.[key]?.cost}
                              required
                              InputProps={{
                                inputComponent: NumericFormatCustom,
                              }}
                            />
                          </TableCell>

                          <TableCell align="left" width={100}>
                            <Select
                              fullWidth
                              size="small"
                              onChange={handleChangeValue(key, "quantityPeople")}
                              value={`${details?.cost_details?.[key]?.quantityPeople}`}
                            >
                              {Array.from({ length: 16 }).map((_, index) => (
                                <MenuItem value={index} key={index}>
                                  {index}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell align="right" width={200}>
                            {fPrice(
                              details?.cost_details?.[key]?.cost *
                                details?.cost_details?.[key]?.quantityPeople
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>

            <Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f36",
                  color: "#fff",
                  padding: "11px 40px",
                  mr: 2,
                  my: 2,
                  "&:hover": {
                    backgroundColor: "#f36",
                    color: "#fff",
                  },
                  float: "right",
                }}
                onClick={handleSaveChangeCost}
              >
                Lưu thay đổi
              </Button>
            </Box>
          </Stack>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Page title="Chi tiết Lịch trình">
      <NavBar />

      {details ? (
        <Box>
          <Stack sx={{ background: "#fff" }}>
            <Container
              maxWidth={"lg"}
              sx={{ py: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Stack>
                <Typography fontSize={25}>
                  <strong>{details.name}</strong>
                </Typography>
                <Typography fontSize={16} color={"#0006"}>
                  Ngày tạo: {formatDateVN(details?.created_at, "P")} | Tạo bởi{" "}
                  {details?.user
                    ? `${details?.user?.last_name} ${details?.user?.first_name}`
                    : APPLICATION_NAME}
                  {`. Ngày đi: ${formatDateVN(
                    details?.metadata?.start_date,
                    "P"
                  )} - Ngày về: ${formatDateVN(details?.metadata?.end_date, "P")}`}
                </Typography>
              </Stack>

              <Stack flexDirection={"row"}>
                <Button
                  variant="contained"
                  sx={{
                    background: "#ffc42d",
                    height: 50,
                    mr: 2,
                    "&:hover": { background: "#ffc42d" },
                  }}
                  startIcon={<CurrencyExchangeIcon />}
                  onClick={toggleDrawer(true)}
                >
                  Thêm chi phí
                </Button>
                <Button
                  to={`/schedule/edit/${details.id}`}
                  startIcon={<BorderColorIcon />}
                  component={Link}
                  variant="contained"
                  sx={{ height: 50 }}
                >
                  Chỉnh sửa
                </Button>
              </Stack>
            </Container>
          </Stack>

          <Container maxWidth={"lg"} sx={{ py: 2 }}>
            <Box
              sx={{
                display: "flex",
                background: "#fff",
                p: 2,
                overflow: "scroll",
                gap: 3,
                "::-webkit-scrollbar": {
                  height: "4px",
                  width: "4px",
                  border: "1px solid #d5d5d5",
                },
              }}
            >
              {details?.trip_details.map((item, index) => {
                return (
                  <Stack key={index} minWidth={400}>
                    <Typography textAlign={"center"} fontSize={20}>
                      <strong>{item.name}</strong>
                    </Typography>

                    <Timeline
                      sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                          flex: 0.2,
                        },
                      }}
                    >
                      {item.places?.map((event, index, eventOld) => (
                        <TimelineItem key={index}>
                          <TimelineOppositeContent fontSize={13} color="text.secondary">
                            {event?.timeline || "7h"}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            {eventOld.length - 1 !== index ? <TimelineConnector /> : null}
                          </TimelineSeparator>
                          <TimelineContent>{event?.place?.name}</TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </Stack>
                );
              })}
            </Box>
          </Container>

          {/* Drawer Chi phí dự kiến */}

          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Box>
      ) : (
        <Container sx={{ p: 6, alignItems: "center", display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      )}

      {/* Drawer Chi phí dự kiến */}
      <MailList />
      <Footer />
    </Page>
  );
};

export default ScheduleDetail;
