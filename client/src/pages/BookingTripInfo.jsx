import CancelIcon from "@mui/icons-material/Cancel";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { Container } from "@mui/system";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Page from "~/components/Page";
import TextTrucate from "~/components/TextTrucate";
import TableInfo from "~/components/booking/TableInfo";
import { Footer, MailList, NavBar } from "~/components/home";
import { statusBookingTrip } from "~/constants";
import DialogConfirm from "~/features/@dashboard/components/DialogConfim";
import BookingTripDetails from "~/features/@dashboard/pages/booking/BookingTripDetails";
import { appActions } from "~/features/app/appSlice";
import { authState } from "~/features/authentication/authSlice";
import { bookingTripActions, useBookingTripSlice } from "~/features/bookingTrip/bookingTripSlice";
import { fPrice } from "~/utils/formatNumber";
import { fDateTimeSuffix } from "~/utils/formatTime";

function BookingTripInfo() {
  const { filters, data } = useBookingTripSlice();
  const [selectedDetails, setSelectedDetails] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(authState);
  const [selected, setSelectedDelete] = useState(null);

  useEffect(() => {
    if (_.isEmpty(user)) return;

    dispatch(
      bookingTripActions.getAllStart({
        ...filters,
        where: "user_id," + user.user_id,
      })
    );
  }, [filters, user]);

  const dataHead = [
    "Mã Booking",
    "Tên chuyến đi",
    "Người đặt",
    "Số điện thoại",
    "Tổng chi phí",
    "Ngày đặt",
    "Trạng thái",
    "Chức năng",
  ];

  const handleOpenDialogConfirm = useCallback((bill) => {
    setSelectedDelete(bill);
  }, []);

  const handleOnclickSeeDetails = (data) => {
    setSelectedDetails(data);
  };

  const handleOnClickChangeStatus = (selected) => {
    dispatch(appActions.setOpenOverlay(true));
    setTimeout(() => {
      dispatch(
        bookingTripActions.confirmBookingTripStart({
          id: selected.id,
          data: { status: "canceled", user_id: user.user_id },
        })
      );
    }, 300);
    setSelectedDelete(null);
  };

  return (
    <Page title="Thông tin đặt phòng">
      <NavBar />

      {selected && (
        <DialogConfirm
          open={true}
          data={selected}
          name={`Chuyến đi ${selected?.trip?.name}`}
          onClose={() => setSelectedDelete(null)}
          onConfirm={handleOnClickChangeStatus}
          text={`Có chắc chắn rằng Bạn muốn hủy chuyến đi này không?`}
          title="Xác nhận hủy chuyến đi"
        />
      )}

      {selectedDetails ? (
        <BookingTripDetails open data={selectedDetails} onClose={() => setSelectedDetails(null)} />
      ) : null}

      <Container sx={{ p: 6 }} maxWidth="lg">
        <Typography variant="h5">Danh sách chuyến đi đã đặt</Typography>

        <TableInfo dataHead={dataHead}>
          {data && data.length ? (
            data.map((row, index) => {
              const _status = statusBookingTrip[row.status];

              return (
                <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Tooltip title={row.id} arrow placement="top-start">
                      <TextTrucate text={row.id} width={100} />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <TextTrucate text={row.trip.name} width={150} />
                  </TableCell>
                  <TableCell align="right">{`${row.fullName}`}</TableCell>
                  <TableCell align="right">{`${row.phone}`}</TableCell>
                  <TableCell align="right">{fPrice(row.fee.total_price)}</TableCell>
                  <TableCell align="right">{fDateTimeSuffix(row.created_at)}</TableCell>
                  <TableCell align="right">
                    <Typography fontSize={14} color={(theme) => theme.palette[_status.color].main}>
                      {_status.text}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {row.status === "pending" ? (
                      <Tooltip title={"Hủy chuyến đi"} arrow placement="top">
                        <Box display="inline-block">
                          <IconButton onClick={() => handleOpenDialogConfirm(row)} size="small">
                            <CancelIcon fontSize="inherit" color="error" />
                          </IconButton>
                        </Box>
                      </Tooltip>
                    ) : null}
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleOnclickSeeDetails(row)}
                    >
                      <Tooltip title="Xem chi tiết">
                        <RemoveRedEyeIcon fontSize="inherit" />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell>Không có dữ liệu!</TableCell>
            </TableRow>
          )}
        </TableInfo>
      </Container>

      <MailList />
      <Footer />
    </Page>
  );
}

export default BookingTripInfo;
