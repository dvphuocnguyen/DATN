import CardComponent from "~/components/shared/CardComponent";
import SliderComponent from "~/components/shared/SliderComponent";

const DestinationHome = ({ title, children, mt, sub }) => {
  return (
    <CardComponent title={title} mt={mt} sub={sub}>
      <SliderComponent>{children}</SliderComponent>
    </CardComponent>
  );
};

export default DestinationHome;
