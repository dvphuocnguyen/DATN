import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import LazyLoadImage from "~/components/LazyLoadImage";

const DivStyle = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
}));

const IconDeleteStyle = styled(HighlightOffIcon)(({ theme }) => ({
  position: "absolute",
  top: 3,
  right: 3,
  fontSize: 30,
  cursor: "pointer",
  transition: "all 0.25s",
  zIndex: 10,
  "&:hover": {
    opacity: 0.5,
    color: "red",
    transform: "rotate(45deg)",
  },
}));

function OverviewImg({ src, onClickImg, onDeleteImg, ...others }) {
  return (
    <DivStyle>
      <Box sx={{ width: "100%", height: "100%" }} onClick={onClickImg}>
        <LazyLoadImage src={src} alt="" loading="lazy" sx={{ borderRadius: "7px", ...others }} />
      </Box>
      <IconDeleteStyle onClick={onDeleteImg} />
    </DivStyle>
  );
}

OverviewImg.propTypes = {
  src: PropTypes.string.isRequired,
  onClickImg: PropTypes.func,
  onDeleteImg: PropTypes.func,
};

export default OverviewImg;
