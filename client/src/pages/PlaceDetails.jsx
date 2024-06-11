import BookmarkIcon from "@mui/icons-material/Bookmark";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SwiperSlide } from "swiper/react";
import { areaAPI } from "~/apis";
import { Footer, MailList, NavBar } from "~/components/home";
import DestinationHome from "~/components/home/DestinationHome";
import LazyLoadImage from "~/components/LazyLoadImage";
import Page from "~/components/Page";
import DialogNewTrip from "~/components/shared/DialogNewTrip";
import TripCard from "~/components/shared/TripCard";
import { UNLIMITED } from "~/constants";
import { appActions } from "~/features/app/appSlice";
import { authState } from "~/features/authentication/authSlice";
import { placeActions } from "~/features/place/placeSlice";
import { tripActions, useTripSlice } from "~/features/trip/tripSlice";
import { sleep } from "~/utils";

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

const arrayCMT = [
  {
    icon: "",
    title: "",
    sub: "0 Đánh giá",
  },
  {
    icon: <FavoriteIcon />,
    title: "Đã thích",
    sub: "0 Đã thích",
  },
  {
    icon: <MessageIcon />,
    title: "Bình luận",
    sub: "0 Bình luận ",
  },
  {
    icon: <ShareIcon />,
    title: "Chia sẻ ",
    sub: "0 Chia sẻ",
  },
  {
    icon: <BookmarkIcon />,
    title: "Lưu địa danh",
    sub: "",
  },
  {
    icon: <DriveFolderUploadIcon />,
    title: "Upload ảnh",
    sub: "",
  },
];

const arrayImages = [
  "/images/introDes/img1.jpg",
  "/images/introDes/img2.jpg",
  "/images/introDes/img3.jpg",
  "/images/introDes/img4.jpg",
  "/images/introDes/img5.jpg",
  "/images/introDes/img5.jpg",
];

const PlaceDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openBooking, setOpenBooking] = useState(false);
  const { data: trips } = useTripSlice();
  const { user } = useSelector(authState);

  useLayoutEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const getData = async () => {
      try {
        dispatch(appActions.setOpenOverlay(true));

        const response = await areaAPI.getById(id);
        dispatch(placeActions.getAllStart({ limit: UNLIMITED }));
        dispatch(
          tripActions.getAllStart({
            limit: UNLIMITED,
            where: "destination_id," + id,
            isUserNull: true,
          })
        );

        await sleep();

        if (!response.data) {
          toast.error("Địa điểm không tồn tại!");
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

  const handleSubmitCreateNewTrip = (values) => {
    dispatch(appActions.setText("Đang tạo chuyến đi. Vui lòng chờ..."));
    dispatch(appActions.setOpenOverlay(true));
    dispatch(placeActions.createByUserStart(values));
  };

  return (
    <Page title="Chi tiết chuyến đi">
      <NavBar />

      {openBooking && !_.isEmpty(user) ? (
        <DialogNewTrip open onClose={handleClose} onSubmit={handleSubmitCreateNewTrip} />
      ) : null}

      <Container sx={{ pb: 6 }} maxWidth="lg">
        {details ? (
          <Grid container spacing={2}>
            {/* Content left */}
            <Grid item xs={12} md={8}>
              <Box>
                <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 20 }}>
                  Ảnh Về {details?.name}
                </Typography>

                <Grid container component={Paper} spacing={2} sx={{ pr: 2, pb: 2 }} mt={3}>
                  {details?.imagesUrl.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{ width: "100%", height: "200px", mb: 2, borderRadius: 1.5 }}
                      >
                        <LazyLoadImage
                          key={index}
                          alt="img"
                          sx={{ borderRadius: 1.5 }}
                          sxImage={{ height: 200, borderRadius: 1.5 }}
                          src={item?.url}
                        />
                      </Grid>
                    );
                  })}
                </Grid>

                <Box>
                  <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 20 }}>
                    Giới thiệu về {details?.name}
                  </Typography>
                  <Typography mt={2} sx={{ fontSize: 14, textAlign: "justify" }}>
                    {details?.description}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Content right */}
            <Grid item xs={12} md={4} sx={{ mt: "70px" }}>
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
                Tạo lịch trình cá nhân
              </Button>

              {/* Dialog TẠO LỊCH TRÌNH CÁ NHÂN */}

              <Dialog open={false} onClose={handleClose} minWidth={750}>
                <DialogTitle
                  fontWeight={"bold"}
                  textAlign={"center"}
                  mb={4}
                  textTransform={"uppercase"}
                >
                  Tạo lịch trình cá nhân
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <Typography>Điểm xuất phát</Typography>
                      <TextField
                        id="outlined-basic"
                        label="Chọn điểm xuất phát"
                        variant="outlined"
                        sx={{ mt: 1, width: "100%" }}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <Typography>Điểm đến</Typography>
                      <TextField
                        id="outlined-basic"
                        label="Điểm đến"
                        variant="outlined"
                        sx={{ mt: 1, width: "100%" }}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <Typography mb={1}>Ngày đến</Typography>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        sx={{ padding: "16px 14px", border: "1px solid #ccc", borderRadius: 1 }}
                      >
                        <CalendarMonthIcon sx={{ mr: 1 }} />
                        22/06/2024 - 26/06/2024
                      </Stack>
                    </Grid>

                    <Grid item md={6}>
                      <Typography mb={1}>Ngày về</Typography>
                      <Stack
                        flexDirection={"row"}
                        alignItems={"center"}
                        sx={{ padding: "16px 14px", border: "1px solid #ccc", borderRadius: 1 }}
                      >
                        <CalendarMonthIcon sx={{ mr: 1 }} />
                        22/06/2024 - 26/06/2024
                      </Stack>
                    </Grid>

                    <Grid item md={12}>
                      <Typography mb={1}>Chọn số người</Typography>
                      <Stack
                        sx={{ padding: "16px 14px", border: "1px solid #ccc", borderRadius: 1 }}
                      >
                        1 người lớn
                      </Stack>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#f36",
                      color: "#fff",
                      padding: "11px 21px",
                      mr: 2,
                      mb: 2,
                      "&:hover": {
                        backgroundColor: "#f36",
                        color: "#fff",
                      },
                    }}
                  >
                    Tạo lịch trình
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Dialog TẠO LỊCH TRÌNH CÁ NHÂN */}

              <Card sx={{ mt: 3 }}>
                <CardContent>
                  {arrayCMT.map((cmt, index) => {
                    return (
                      <Stack
                        key={index}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        mb={1.75}
                        pt={1}
                      >
                        <Stack flexDirection={"row"}>
                          <Typography>{cmt.icon}</Typography>
                          <Typography sx={{ pl: 1, fontSize: 14 }} gutterBottom>
                            {cmt.title}
                          </Typography>
                        </Stack>
                        <Typography sx={{ fontSize: 14 }}>{cmt.sub}</Typography>
                      </Stack>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={12} xs={12}>
              {trips.length ? (
                <DestinationHome
                  title={"Top combo giá tốt"}
                  mt={4}
                  sub={`Đặt chuyến đi nhanh chóng, giá cả phải chăng dành cho 1 người.`}
                >
                  {trips.map((item, index) => (
                    <SwiperSlide key={index}>
                      <TripCard item={item} />
                    </SwiperSlide>
                  ))}
                </DestinationHome>
              ) : null}
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

export default PlaceDetails;
