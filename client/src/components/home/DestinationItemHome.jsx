import { Box, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DestinationItemHome = ({ img, title, sub, price, date, username, avatar, to }) => {
  return (
    <Box
      component={Link}
      to={to ? to : ""}
      sx={{
        maxWidth: 267,
        color: "#000",
        textDecoration: "none",
        borderRadius: "5px",
        overflow: "hidden",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        },
        border:
          username && avatar && date && price ? "1px solid rgba(0, 0, 0, 0.05)" : "transparent",
      }}
    >
      <Box
        sx={{
          display: "block",
          width: "100%",
          objectFit: "cover",
        }}
        component={"img"}
        loading="lazy"
        alt="img"
        src={img}
      />

      <Box>
        <Tooltip title={title} arrow placement="top">
          <Typography pl={1} pr={1} noWrap mt={1} sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Tooltip>
        {sub ? (
          <Tooltip title={sub} arrow placement="right">
            <Typography pl={1} pr={1} pb={2} noWrap>
              {sub}
            </Typography>
          </Tooltip>
        ) : null}
        {username && avatar && date && price ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderTop: "1px solid rgba(0, 0, 0, 0.05)",
            }}
            mt={1}
            p={1}
          >
            {avatar ? (
              <Box
                sx={{
                  borderRadius: 50,
                  width: 40,
                  height: 40,
                  objectFit: "cover",
                }}
                component={"img"}
                loading="lazy"
                alt="avatar"
                src={avatar}
              />
            ) : null}
            <Box pl={1}>
              {username ? <Typography fontSize={14}>{username}</Typography> : null}
              {date ? (
                <Typography fontSize={14} color={"#0006"}>
                  {date}
                </Typography>
              ) : null}
            </Box>

            {price ? (
              <Typography pl={4} color={"#f36"}>
                {price}
              </Typography>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default DestinationItemHome;
