import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { addDays } from "date-fns";
import _ from "lodash";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import { tripAPI } from "~/apis";
import DialogBookingTrip from "~/components/booking/DialogBookingTrip";
import { Footer, MailList, NavBar } from "~/components/home";
import DatePicker from "~/components/home/date-picker/DatePicker";
import { DatePickerStyle } from "~/components/home/SearchList/components";
import LazyLoadImage from "~/components/LazyLoadImage";
import Page from "~/components/Page";
import FormAddReview from "~/components/shared/FormAddReview";
import ReviewComponent from "~/components/shared/ReviewComponent";
import SliderComponent from "~/components/shared/SliderComponent";
import { APPLICATION_NAME } from "~/constants";
import { appActions } from "~/features/app/appSlice";
import { authState } from "~/features/authentication/authSlice";
import { bookingTripActions } from "~/features/bookingTrip/bookingTripSlice";
import { reviewActions, useReviewSlice } from "~/features/reviews/reviewSlice";
import { sleep } from "~/utils";
import { fPrice } from "~/utils/formatNumber";
import { formatDateVN } from "~/utils/formatTime";

export const BREAKPOINT = {
  100: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 2,
    spaceBetween: 8,
  },
};

const TripDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openBooking, setOpenBooking] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { user } = useSelector(authState);
  const [openReview, setOpenReview] = useState(false);
  const { data: reviews } = useReviewSlice();

  useLayoutEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getData = async () => {
      try {
        dispatch(appActions.setOpenOverlay(true));

        const response = await tripAPI.getById(id);
        dispatch(reviewActions.getAllStart({ where: "trip_id," + id, order: "created_at,desc" }));

        await sleep();

        if (!response.data) {
          toast.error("Chuyến đi không tồn tại!");
          navigate("/");
          return;
        }

        const currentDate = new Date();
        const startDate = addDays(currentDate, 1);
        const endDate = addDays(startDate, response.data.total_day - 1);

        setDate((prev) => [{ key: "selection", startDate, endDate }]);

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

  const handleClickOpen = () => {
    if (_.isEmpty(user)) {
      navigate("/sign-in", { replace: true });
      return;
    }

    setOpenBooking(true);
  };

  const handleClose = () => {
    setOpenBooking(false);
  };

  const handleChangeDate = (dates) => {
    if (!details) return;

    const { selection } = dates;

    const newStartDate = selection.startDate;
    const newEndDate = addDays(newStartDate, details?.total_day - 1);

    setDate([{ key: "selection", startDate: newStartDate, endDate: newEndDate }]);

    setOpenDate(false);
  };

  const handleClickDatePicker = () => {};

  const handleSubmitBookingTrip = (values) => {
    const _date = date[0];

    dispatch(appActions.setOpenOverlay(true));
    dispatch(
      bookingTripActions.createStart({
        ...values,
        start_date: _date.startDate,
        end_date: _date.endDate,
      })
    );
  };

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const handleSubmitReview = (values) => {

    if (!user?.user_id) {
      navigate("/sign-in", { replace: true });
      return;
    }

    const payload = { ...values, user_id: user.user_id, trip_id: details.id }

    dispatch(reviewActions.createStart(payload));
    handleCloseReview();
  };

  return (
    <Page title="Chi tiết chuyến đi">
      <NavBar />

      {openReview ? (
        <FormAddReview open={true} onSubmit={handleSubmitReview} onClose={handleCloseReview} />
      ) : null}

      {openBooking && !_.isEmpty(user) ? (
        <DialogBookingTrip
          onSubmit={handleSubmitBookingTrip}
          open={true}
          onClose={handleClose}
          selected={details}
          user={user}
        />
      ) : null}

      <Container sx={{ pb: 6 }} maxWidth="lg">
        {details ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box>
                <Grid container spacing={2} sx={{ pr: 2, pb: 2 }} mt={3}>
                  {details?.destination?.imagesUrl?.length ? (
                    <SliderComponent breakpoints={BREAKPOINT}>
                      {details?.destination?.imagesUrl.map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <LazyLoadImage
                              src={item.url}
                              alt={item.id}
                              sx={{
                                cursor: "pointer",
                                borderRadius: "4px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                              sxImage={{
                                borderRadius: "10px 10px 0 0",
                                minHeight: 400,
                                maxHeight: 400,
                              }}
                            />
                          </SwiperSlide>
                        );
                      })}
                    </SliderComponent>
                  ) : null}
                </Grid>

                <Box>
                  <Stack
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Stack>
                      <Typography mb={2} sx={{ fontWeight: "bold", fontSize: 20 }}>
                        {details.name}
                      </Typography>
                      <Typography sx={{ fontSize: 16 }}>
                        Ngày tạo: <b>{` ${formatDateVN(details.created_at, "P")}`}</b>, 1 người |
                        Tạo bởi <b>{APPLICATION_NAME}</b>
                      </Typography>
                    </Stack>
                    <Stack flexDirection={"row"}>
                      <Button>
                        <ShareIcon />
                      </Button>
                      <Button ml={2}>
                        <FavoriteBorderIcon />
                      </Button>
                    </Stack>
                  </Stack>

                  <Typography mt={4} sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Giới thiệu
                  </Typography>

                  <Typography mt={2} sx={{ fontSize: 14, textAlign: "justify" }}>
                    {details.description}
                  </Typography>

                  <Typography mt={4} sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Chi tiết chuyến đi
                  </Typography>

                  {details.trip_details.map((item, index) => {
                    return (
                      <Box key={index}>
                        <Typography
                          mt={0.5}
                          sx={{ fontSize: 14, fontWeight: 700, textAlign: "justify" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography mt={0.5} sx={{ fontSize: 14, textAlign: "justify" }}>
                          - {item.description}
                        </Typography>
                        {item.places?.map((place, idx) => {
                          return (
                            <Typography
                              key={idx}
                              mt={0.5}
                              sx={{ pl: 2, fontSize: 14, textAlign: "justify" }}
                            >
                              + {`${place?.place?.name} (${place?.place?.description})`}
                            </Typography>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: "18px" }}>
              <Card
                sx={{
                  mt: 3,
                  ".css-46bh2p-MuiCardContent-root": {
                    p: 0,
                  },
                  overflow: "unset",
                }}
              >
                <CardContent>
                  <Stack mb={1.75} p={2} textAlign="start">
                    <Box sx={{ height: "100%" }}>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        Ngày
                      </Typography>

                      <Box sx={{ position: "relative", height: "100%" }}>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          sx={{
                            px: 2,
                            py: 2,
                            border: "1px solid #ccc",
                            borderRadius: 1,
                            cursor: "pointer",
                          }}
                          onClick={() => setOpenDate((prev) => !prev)}
                        >
                          <CalendarMonthIcon />
                          <Stack>
                            <Typography>
                              {`${formatDateVN(date[0].startDate, "P")} - 
                              ${formatDateVN(date[0].endDate, "P")}`}
                            </Typography>
                          </Stack>
                        </Stack>

                        {openDate && (
                          <DatePickerStyle onClick={handleClickDatePicker}>
                            <DatePicker
                              minDate={addDays(new Date(), 1)}
                              date={date}
                              onChangeDate={handleChangeDate}
                            />
                          </DatePickerStyle>
                        )}
                      </Box>
                    </Box>

                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      my={2}
                    >
                      <Typography sx={{ fontSize: 16 }} gutterBottom>
                        Giá trọn gói
                      </Typography>
                      <Typography sx={{ fontSize: 16 }}>
                        <strong style={{ color: "#ff3366" }}>
                          {fPrice(details.trip_fee + details.hotel_fee)}
                        </strong>{" "}
                        /người
                      </Typography>
                    </Stack>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f36",
                        color: "#fff",
                        padding: "11px 21px",
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "#f36",
                          color: "#fff",
                        },
                      }}
                      onClick={handleClickOpen}
                    >
                      Đặt ngay
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Stack flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography variant="h4">Đánh giá của khách hàng</Typography>
                <Button variant="contained" onClick={handleOpenReview}>
                  Đánh giá
                </Button>
              </Stack>

              <Divider sx={{ my: 2 }} />

              {reviews?.length ? (
                reviews.map((row, index) =>
                  row.is_active ? (
                    <ReviewComponent
                      key={index}
                      email={`${row?.user?.last_name} ${row?.user?.first_name}`}
                      comment={row.comment}
                      score={row.score}
                      createdAt={new Date(row.created_at)}
                    />
                  ) : null
                )
              ) : (
                <Typography variant="body2">Chưa có đánh giá của khách hàng</Typography>
              )}
            </Grid>
          </Grid>
        ) : (
          <Box mt={2}>
            <CircularProgress />
          </Box>
        )}
      </Container>

      <MailList />
      <Footer />
    </Page>
  );
};

export default TripDetails;
