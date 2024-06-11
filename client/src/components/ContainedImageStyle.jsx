import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const ContainedImageStyle = styled(Stack)(({ theme }) => ({
  border: "1px dotted #ddd",
  padding: 10,
  borderRadius: 7,
  height: "auto",
  cursor: "pointer",
  transition: "all 0.25s",
  "&>*": {
    transition: "all 0.25s",
  },
}));

export default ContainedImageStyle;
