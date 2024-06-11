import CheckIcon from "@mui/icons-material/Check";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextTrucate from "~/components/TextTrucate";
import { statusBookingTrip } from "~/constants";
import DialogConfirm from "~/features/@dashboard/components/DialogConfim";
import { appActions } from "~/features/app/appSlice";
import { billActions } from "~/features/bill/billSlice";
import { bookingTripActions, useBookingTripSlice } from "~/features/bookingTrip/bookingTripSlice";
import { fPrice } from "~/utils/formatNumber";
import { fDateTimeSuffix } from "~/utils/formatTime";
import { PageLayoutWithTable } from "../../components";
import BookingTripDetails from "~/features/@dashboard/pages/booking/BookingTripDetails";

function BookingTrip(props) {
  const { paginations, filters, data, isLoading } = useBookingTripSlice();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [selected, setSelectedDelete] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

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

  useEffect(() => {
    dispatch(bookingTripActions.getAllStart(filters));
  }, [filters]);

  const handleOpenDialogConfirm = useCallback((bill) => {
    setSelectedDelete(bill);
    setOpen(true);
  }, []);

  const handleOnPageChange = useCallback(
    (page) => {
      dispatch(billActions.setFilter({ ...filters, page }));
    },
    [filters]
  );

  const handleSearchNameFloor = (value) => {
    dispatch(
      billActions.setDebounceName({
        ...filters,
        search: value,
        page: 1,
      })
    );
  };

  const handleOnclickSeeDetails = (data) => {
    setSelectedDetails(data);
  };

  const handleOnClickChangeStatus = (selected) => {
    dispatch(appActions.setOpenOverlay(true));
    setTimeout(() => {
      dispatch(
        bookingTripActions.confirmBookingTripStart({
          id: selected.id,
          data: { status: "confirmed" },
        })
      );
    }, 300);
    setSelectedDelete(null);
  };

  return (
    <>
      {selected && (
        <DialogConfirm
          open={true}
          data={selected}
          name={`Chuyến đi ${selected?.trip?.name} của khách hàng ${selected?.fullName}`}
          onClose={() => setSelectedDelete(null)}
          onConfirm={handleOnClickChangeStatus}
          text={`Có chắc chắn rằng Bạn muốn duyệt chuyến đi này không?`}
          title="Xác nhận duyệt chuyến đi"
        />
      )}

      {selectedDetails ? (
        <BookingTripDetails open data={selectedDetails} onClose={() => setSelectedDetails(null)} />
      ) : null}

      <PageLayoutWithTable
        hidden={true}
        dataHead={dataHead}
        title="Quản lý đặt chuyến đi"
        named="Đặt chuyến đi"
        linkToAdd="/manager/room-type/add"
        loading={isLoading}
        pagination={paginations}
        onPageChange={handleOnPageChange}
        onInputSearchChange={handleSearchNameFloor}
      >
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
                    <Tooltip title={"Duyệt"} arrow placement="top">
                      <Box display="inline-block">
                        <IconButton onClick={() => handleOpenDialogConfirm(row)} size="small">
                          <CheckIcon fontSize="inherit" />
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
      </PageLayoutWithTable>
    </>
  );
}

export default BookingTrip;
