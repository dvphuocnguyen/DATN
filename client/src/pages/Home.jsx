import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { DiscoverVietnam, Footer, MailList, NavBar, SearchList } from "~/components/home";
import DestinationHome from "~/components/home/DestinationHome";
import InfoCardHome from "~/components/home/InfoCardHome";
import LazyLoadImage from "~/components/LazyLoadImage";
import Page from "~/components/Page";
import TripCard from "~/components/shared/TripCard";
import { OPTION_TYPES, UNLIMITED } from "~/constants";
import { hotelActions } from "~/features/hotels/hotelSlice";
import { placeActions, usePlaceSlice } from "~/features/place/placeSlice";
import { tripActions, useTripSlice } from "~/features/trip/tripSlice";

function Home() {
  const dispatch = useDispatch();
  const [provinceName, setProvinceName] = useState("");
  const { data: trips } = useTripSlice();
  const [optionTypeSelected, setOptionTypeSelected] = useState(OPTION_TYPES.TOUR);
  const { data } = usePlaceSlice();

  useEffect(() => {
    dispatch(hotelActions.countAreaStart());
    dispatch(placeActions.getAllStart({ limit: UNLIMITED }));
    dispatch(tripActions.getAllStart({ limit: UNLIMITED,   isUserNull: true, where: "user_id,null" }));
  }, []);

  const handleOnClick = (provinceName) => {
    setProvinceName(provinceName);
  };

  const handleChangeOptionType = (value) => {
    setOptionTypeSelected(value);
  };

  return (
    <Page title="Trang chủ">
      <NavBar />

      <SearchList
        provinceName={provinceName}
        optionTypeSelected={optionTypeSelected}
        onChangeOptionType={handleChangeOptionType}
      />

      <Container sx={{ p: 6, mt: 1 }} maxWidth="lg">
        <InfoCardHome />

        {data.length ? (
          <DestinationHome
            title={"Điểm đến phổ biến"}
            mt={5}
            sub={"Chiêm ngưỡng vẻ đẹp phong cảnh ngất ngưỡng"}
          >
            {data.map((item, index) => (
              <SwiperSlide key={index}>
                <LazyLoadImage
                  component={Link}
                  to={`/place/${item.id}`}
                  src={item.thumb}
                  alt={item.name}
                  sx={{
                    cursor: "pointer",
                    borderRadius: "4px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  sxImage={{
                    borderRadius: "10px 10px 0 0",
                    minHeight: 200,
                    maxHeight: 200,
                  }}
                >
                  <Typography fontWeight={700} mt={1}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" noWrap>
                    {item.description}
                  </Typography>
                </LazyLoadImage>
              </SwiperSlide>
            ))}
          </DestinationHome>
        ) : null}

        <DiscoverVietnam onClick={handleOnClick} />

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
      </Container>

      <MailList />
      <Footer />
    </Page>
  );
}

export default Home;
