import { Box, Typography } from "@mui/material";
import React from "react";

const RowComponent = ({ label, value, isBorder = true, textColor, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 3,
        py: 1,
        borderBottom: isBorder ? "1px dashed #dedede" : "none",
        ...props.sx,
      }}
      {...props}
    >
      <Typography>{label}</Typography>
      <Typography color={textColor} fontWeight={700}>
        {value}
      </Typography>
    </Box>
  );
};

export default RowComponent;
