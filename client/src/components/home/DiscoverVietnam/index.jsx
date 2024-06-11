import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { FreeMode, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardComponent from "~/components/shared/CardComponent";
import { dataAreaCountSelect } from "~/features/hotels/hotelSlice";
import { cutProvinceName, getImageArea } from "~/utils";
import LazyLoadImage from "../../LazyLoadImage";

function DiscoverVietnam({ onClick }) {
  const { data } = useSelector(dataAreaCountSelect);

  const handleOnClick = (item) => {
    if (!onClick) return;
    onClick(cutProvinceName(item.provice_name));
  };

  return (
    <CardComponent
      title={`Khám phá Việt Nam`}
      mt={5}
      sub={`Các điểm đến phổ biến này có nhiều điều chờ đón bạn`}
    >
      <Swiper
        slidesPerView={5}
        spaceBetween={8}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
        breakpoints={{
          100: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 8,
          },
        }}
      >
        {data?.length &&
          data.map((item, index) => (
            <SwiperSlide key={index} onClick={() => handleOnClick(item)}>
              <LazyLoadImage
                src={getImageArea(item.provice_code)}
                alt={item.provice_name}
                sx={{
                  cursor: "pointer",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                }}
                sxImage={{
                  borderRadius: "2px",
                  minHeight: 150,
                  maxHeight: 150,
                }}
              >
                <Typography fontWeight={700} mt={1}>
                  {item.provice_name}
                </Typography>
                <Typography variant="caption">{`${item.total} chỗ nghỉ`}</Typography>
              </LazyLoadImage>
            </SwiperSlide>
          ))}
      </Swiper>
    </CardComponent>
  );
}

DiscoverVietnam.propTypes = {};

export default DiscoverVietnam;
