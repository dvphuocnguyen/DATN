import { FreeMode, Pagination } from "swiper";
import { Swiper } from "swiper/react";
import { DEFAULT_BREAKPOINT } from "~/constants";

const SliderComponent = ({ children, breakpoints = DEFAULT_BREAKPOINT }) => {
  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={8}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="mySwiper"
      breakpoints={breakpoints}
    >
      {children}
    </Swiper>
  );
};

export default SliderComponent;
