import { Box, Typography } from "@mui/material";
import { memo } from "react";

const CardComponent = ({ title, children, sub, mt }) => {
  return (
    <Box sx={{ mt }}>
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="h4">{title}</Typography>
        {sub ? <Typography variant="body2">{sub}</Typography> : null}
      </Box>

      <Box pb={3}>{children}</Box>
    </Box>
  );
};

export default memo(CardComponent);
