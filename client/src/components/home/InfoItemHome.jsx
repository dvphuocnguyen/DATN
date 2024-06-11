import { Box, Stack, Typography } from "@mui/material";

const InfoItemHome = ({ icon, label, sub }) => {
  return (
    <Stack
      sx={{
        color: "#000",
        fontSize: "14px",
        lineHeight: "20px",
        width: "400px",
        height: "237px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box sx={{ width: "100%", height: "50px" }}>
        <Box
          sx={{ width: "100%", height: "100%" }}
          component={"img"}
          loading="lazy"
          alt="icon"
          src={icon}
        />
      </Box>

      <Typography mt={2} sx={{ fontWeight: "bold", fontSize: 20 }}>
        {label}
      </Typography>
      <Typography mt={1}>{sub}</Typography>
    </Stack>
  );
};

export default InfoItemHome;
