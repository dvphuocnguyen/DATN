import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableCell, TableRow, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LazyLoadImage from "~/components/LazyLoadImage";
import { PageLayoutWithTable } from "~/features/@dashboard/components";
import { placeActions, usePlaceSlice } from "~/features/place/placeSlice";

const dataHead = ["STT", "Tên địa điểm du lịch", "Ảnh", "Giới thiệu", "Thao tác"];

const Place = () => {
  const { data, isLoading, filters, paginations } = usePlaceSlice();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placeActions.getAllStart(filters));
  }, [filters]);

  const handleOnPageChange = useCallback(
    (page) => {
      dispatch(placeActions.setFilter({ ...filters, page }));
    },
    [filters]
  );

  const handleSearchPlace = (value) => {
    dispatch(
      placeActions.setDebounceName({
        ...filters,
        search: value,
        page: 1,
      })
    );
  };

  return (
    <PageLayoutWithTable
      dataHead={dataHead}
      title="Quản lý địa điểm du lịch"
      named="Địa điểm du lịch"
      linkToAdd="/manager/place/add"
      loading={isLoading}
      pagination={paginations}
      align="left"
      onPageChange={handleOnPageChange}
      onInputSearchChange={handleSearchPlace}
    >
      {data.length ? (
        data.map((row, index) => (
          <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>

            <TableCell align="left">{row.name}</TableCell>

            <TableCell align="left">
              <LazyLoadImage
                src={row.thumb}
                sx={{ width: 100, height: 100, borderRadius: 2 }}
                sxImage={{ borderRadius: 2 }}
              />
            </TableCell>

            <TableCell align="left">
              <Typography noWrap sx={{ width: 400 }}>
                {row.description}
              </Typography>
            </TableCell>

            <TableCell align="left">
              <Tooltip title="Chỉnh sửa">
                <IconButton size="small" component={Link} to={`/manager/place/edit/${row.id}`}>
                  <EditIcon fontSize="inherit" />
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

export default Place;
