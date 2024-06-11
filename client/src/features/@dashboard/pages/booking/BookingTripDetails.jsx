import CloseIcon from "@mui/icons-material/Close";
import { Box, Container, Grid, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { formatDateVN } from "~/utils/formatTime";

import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { useMemo } from "react";
import { APPLICATION_NAME } from "~/constants";
import { fPrice } from "~/utils/formatNumber";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function BookingTripDetails({ data, open, onClose }) {
  const details = useMemo(() => data?.trip || null, [data?.trip]);

  return (
    <BootstrapDialog
      maxWidth="lg"
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Chi tiết đặt chuyến đi của
        <Typography color="blue" component={"span"}>{` ${data?.fullName || ""}`}</Typography>
      </BootstrapDialogTitle>

      <DialogContent dividers>
        <Grid container>
          <Grid item md={4}>
            <Typography gutterBottom>
              Số điện thoại: <strong>{data?.phone}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Email: <strong>{data?.email}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Địa chỉ khách hàng: <strong>{data?.address}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Chi phí chuyến đi: <strong>{fPrice(data?.fee?.trip_fee)}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Chi phí khách sạn: <strong>{fPrice(data?.fee?.hotel_fee)}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Tổng chi phí: <strong>{fPrice(data?.fee?.total_price)}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Tên khách sạn: <strong>{data?.trip?.hotel?.hotel_name}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Tên chuyến đi: <strong>{data?.trip?.name}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Điểm đến: <strong>{data?.trip?.destination?.name}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Ngày bắt đầu: <strong>{formatDateVN(data.fee.start_date)}</strong>
            </Typography>
          </Grid>
          <Grid item md={4}>
            <Typography gutterBottom>
              Ngày kết thúc: <strong>{formatDateVN(data.fee.end_date)}</strong>
            </Typography>
          </Grid>
        </Grid>

        {details ? (
          <Box>
            <Stack sx={{ background: "#fff" }}>
              <Container
                maxWidth={"lg"}
                sx={{
                  py: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack>
                  <Typography fontSize={25}>
                    <strong>{details.name}</strong>
                  </Typography>
                  <Typography fontSize={16} color={"#0006"}>
                    Ngày tạo: {formatDateVN(details?.created_at, "P")} | Tạo bởi{" "}
                    {details?.user
                      ? `${details?.user?.last_name} ${details?.user?.first_name}`
                      : APPLICATION_NAME}
                  </Typography>
                </Stack>

                <Stack flexDirection={"row"}>{/* Giá tiền */}</Stack>
              </Container>
            </Stack>

            <Container maxWidth={"lg"} sx={{ py: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  background: "#fff",
                  p: 2,
                  overflow: "scroll",
                  gap: 3,
                  "::-webkit-scrollbar": {
                    height: "4px",
                    width: "4px",
                    border: "1px solid #d5d5d5",
                  },
                }}
              >
                {details?.trip_details.map((item, index) => {
                  return (
                    <Stack key={index} minWidth={400}>
                      <Typography textAlign={"center"} fontSize={20}>
                        <strong>{item.name}</strong>
                      </Typography>

                      <Timeline
                        sx={{
                          [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                          },
                        }}
                      >
                        {item.places?.map((event, index, eventOld) => (
                          <TimelineItem key={index}>
                            <TimelineOppositeContent fontSize={13} color="text.secondary">
                              {event?.timeline || `${7 + index}h`}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                              <TimelineDot />
                              {eventOld.length - 1 !== index ? <TimelineConnector /> : null}
                            </TimelineSeparator>
                            <TimelineContent>{event?.place?.name}</TimelineContent>
                          </TimelineItem>
                        ))}
                      </Timeline>
                    </Stack>
                  );
                })}
              </Box>
            </Container>
          </Box>
        ) : null}
      </DialogContent>
    </BootstrapDialog>
  );
}
