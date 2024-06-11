import { Stack } from "@mui/material";
import InfoItemHome from "~/components/home/InfoItemHome";

const arrayInfo = [
  {
    icon: "images/info/icon_planding.svg",
    label: "Tìm điểm đến",
    sub: "Tìm điểm tham quan, khách sạn, nhà hàng, vé & tour dễ dàng và nhanh chóng.",
  },
  {
    icon: "images/info/icon_planding_2.svg",
    label: "Lên lịch trình cá nhân",
    sub: "Chỉ cần nhập điểm đi, điểm đến sẽ tự động tạo lịch trình cho bạn theo sở thích và chỉnh sửa sắp xếp lại theo ý muốn.",
  },
  {
    icon: "images/info/icon_planding_3.svg",
    label: "Đặt vé trực tuyến",
    sub: "Đặt tất cả các dịch vụ du lịch trên cùng một ứng dụng.",
  },
];

const InfoCardHome = () => {
  return (
    <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      {arrayInfo.map((item, index) => {
        return <InfoItemHome key={index} icon={item.icon} label={item.label} sub={item.sub} />;
      })}
    </Stack>
  );
};

export default InfoCardHome;
