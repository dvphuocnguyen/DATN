import { Avatar, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledBadge } from "~/components/home/SearchList/components";
import LazyLoadImage from "~/components/LazyLoadImage";
import { APPLICATION_NAME } from "~/constants";
import { fPrice } from "~/utils/formatNumber";
import { formatDateVN } from "~/utils/formatTime";

const TripCard = ({ item, to = "/trip" }) => {
  return (
    <LazyLoadImage
      component={Link}
      to={`${to}/${item.id}`}
      src={item?.destination?.thumbUrl ?? item?.destination?.thumb}
      alt={item.name}
      sx={{
        cursor: "pointer",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
      }}
      sxImage={{
        borderRadius: "10px 10px 0 0",
        minHeight: 200,
        maxHeight: 200,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "calc(50% - 30px)",
          px: 2,
          py: 0.5,
          borderRadius: "0 8px 8px 0",
          fontSize: 14,
          left: 0,
          background: (theme) => theme.palette.grey[200],
          fontWeight: 700,
        }}
      >
        {`${item.total_day} ngày`}
      </Box>

      <Box
        sx={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          transition: "all 0.25s ease-in-out 0s",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          },
        }}
      >
        <Typography pl={1} pr={1} noWrap mt={1} sx={{ fontWeight: 600, fontSize: 14 }}>
          {item.name}
        </Typography>

        <Typography pl={1} pr={1} noWrap fontSize={13} color={(theme) => theme.palette.grey[500]}>
          {item.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          }}
          mt={1}
          p={1}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              flex: 2,
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt="Tour-Logo"
                src={"/Tour-Logo.png"}
                sx={{ width: 40, height: 40, border: "1px dashed rgba(0,0,0,0.4)" }}
              />
            </StyledBadge>

            <Box>
              <Typography fontWeight={700} fontSize={13}>
                {item?.user
                  ? `${item?.user?.last_name} ${item?.user?.first_name}`
                  : APPLICATION_NAME}
              </Typography>

              <Typography fontSize={13} color={"#0006"}>
                {formatDateVN(item.created_at, "P")}
              </Typography>
            </Box>
          </Box>

          <Typography pl={4} fontSize={14} color={"#f36"}>
            {fPrice(item.trip_fee + item.hotel_fee)}
          </Typography>
        </Box>
      </Box>
    </LazyLoadImage>
  );
};

export default TripCard;
