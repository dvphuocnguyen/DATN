import EditIcon from "@mui/icons-material/Edit";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PageLayoutWithTable } from "~/features/@dashboard/components";
import DialogSeeReview from "~/features/@dashboard/pages/plan/components/DialogSeeReview";
import { tripActions, useTripSlice } from "~/features/trip/tripSlice";
import { fPrice } from "~/utils/formatNumber";

const dataHead = ["ID", "Tên lịch trình", "Giới thiệu", "Chi phí", "Thao tác"];

const Plan = () => {
  const { data, isLoading, filters, paginations } = useTripSlice();
  const dispatch = useDispatch();
  const [selectedSeeReview, setSelectedSeeReview] = useState(null);

  useEffect(() => {
    dispatch(tripActions.getAllStart({ ...filters, isUserNull: true }));
  }, [filters]);

  const handleOnPageChange = useCallback(
    (page) => {
      dispatch(tripActions.setFilter({ ...filters, page }));
    },
    [filters]
  );

  const handleSearchPlace = (value) => {
    dispatch(
      tripActions.setDebounceName({
        ...filters,
        search: value,
        page: 1,
      })
    );
  };

  const handleCloseSeeReview = () => {
    setSelectedSeeReview(null);
  };

  return (
    <PageLayoutWithTable
      dataHead={dataHead}
      title="Quản lý lịch trình"
      named="Lịch trình"
      linkToAdd="/manager/plan/add"
      loading={isLoading}
      pagination={paginations}
      align="left"
      onPageChange={handleOnPageChange}
      onInputSearchChange={handleSearchPlace}
    >
      {Boolean(selectedSeeReview) ? (
        <DialogSeeReview onClose={handleCloseSeeReview} open={true} selected={selectedSeeReview} />
      ) : null}

      {data.length ? (
        data.map((row, index) => (
          <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>

            <TableCell align="left">{row.name}</TableCell>

            <TableCell align="left">
              <Typography fontSize={14} noWrap width={200}>
                {row.description}
              </Typography>
            </TableCell>

            <TableCell align="left">{fPrice(row.trip_fee + row.hotel_fee)}</TableCell>

            <TableCell align="left">
              <Tooltip title="Xem chi tiết và chỉnh sửa" arrow placement="top">
                <IconButton size="small" component={Link} to={`/manager/plan/edit/${row.id}`}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Xem đánh giá" arrow placement="top">
                <IconButton size="small" onClick={() => setSelectedSeeReview(row)}>
                  <ReviewsIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell align="center" colSpan={5}>
            Chưa có địa điểm du lịch nào
          </TableCell>
        </TableRow>
      )}
    </PageLayoutWithTable>
  );
};

export default Plan;
