import { Badge, Box, Paper, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const WrapperStyle = styled("div")(({ theme }) => ({
  width: "100%",
}));

export const GridStyle = styled(Stack)(({ theme }) => ({
  background: "#febb02",
  width: "auto",
  borderRadius: 2,
  padding: 4,
  margin: 10,
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const GridItemStyle = styled(Box)(({ theme }) => ({
  background: "#fff",
  borderRadius: 1,
  flex: "1 1 auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.35s ease-in-out",

  "& > div": {
    padding: 11,
    width: "100%",
    position: "relative",
  },

  "&:not(:first-of-type)": {
    cursor: "pointer",
  },

  "&:last-child": {
    background: "unset",
    padding: 0,
    width: "auto",
  },

  [theme.breakpoints.down("lg")]: {
    justifyContent: "flex-start",
  },
}));

export const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    padding: "64px 10px calc(32*5px) 10px",
  },
}));

export const DatePickerStyle = styled(Box)(({ theme }) => ({
  position: "absolute",
  zIndex: 9999,
  top: "100%",
  left: 0,
  height: "100%",
  boxShadow: "0px 2px 16px 0px rgba(0,0,0,0.45)",
  borderRadius: 2,
}));

export const PaperStyle = styled(Paper)(({ theme }) => ({
  position: "absolute",
  zIndex: 9999,
  top: "100%",
  left: 0,
  boxShadow: "0px 2px 16px 0px rgba(0,0,0,0.45)",
  borderRadius: 2,
}));
