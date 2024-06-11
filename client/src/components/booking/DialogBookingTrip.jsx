import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useMemo } from "react";
import { APPLICATION_NAME } from "~/constants";
import { bookingTripSchema } from "~/utils";
import { fPrice } from "~/utils/formatNumber";
import { formatDateVN } from "~/utils/formatTime";

const DialogBookingTrip = ({ open, onClose, selected, user, onSubmit }) => {
  const initialValues = useMemo(() => {
    if (!selected || !user) return null;

    return {
      user_id: user?.user_id,
      trip_id: selected?.id,
      phone: user?.phone,
      address: "",
      email: user?.email,
      hotel_id: selected?.hotel?.hotel_id,
      fullName: `${user?.last_name} ${user?.first_name}`,
    };
  }, [user, selected]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: bookingTripSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit?.(values);
    },
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle fontWeight={"bold"} textAlign={"center"} mb={2} textTransform={"uppercase"}>
            Thông tin đặt chuyến đi
          </DialogTitle>

          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography fontSize={18}>
                  Chuyến đi: <strong>{selected.name}</strong>
                </Typography>

                {selected?.hotel ? (
                  <Typography fontSize={14} color={"#0006"}>
                    Đã bao gồm khách sạn: <strong>{selected.hotel.hotel_name}</strong>
                  </Typography>
                ) : null}

                <Typography fontSize={14} color={"#0006"}>
                  Ngày tạo: <b>{formatDateVN(selected.created_at, "P")}</b>, 1 người | Tạo bởi{" "}
                  <b>{APPLICATION_NAME}</b>
                </Typography>
              </Grid>

              <Grid item md={12}>
                <TextField
                  {...getFieldProps("fullName")}
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  required
                  placeholder="Nhập họ và tên"
                  label="Họ và tên"
                  margin="dense"
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  {...getFieldProps("phone")}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  required
                  label="Số điện thoại"
                  margin="dense"
                  fullWidth
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  required
                  label="Email"
                  margin="dense"
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  {...getFieldProps("address")}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                  required
                  label="Điểm xuất phát"
                  margin="dense"
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <Typography mb={1} fontWeight={"bold"}>
                  Chi tiết giá
                </Typography>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                >
                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                    fontSize={16}
                    borderBottom={"1px solid #ccc"}
                  >
                    <Typography>Hinh thức thanh toán</Typography>

                    <Typography>
                      <strong style={{ color: "#ff3366" }}>VN PAY</strong>
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                    fontSize={16}
                    borderBottom={"1px solid #ccc"}
                  >
                    <Typography>Giá package trọn gói</Typography>

                    <Typography>
                      <strong style={{ color: "#ff3366" }}>
                        {fPrice(selected.trip_fee + selected.hotel_fee)}
                      </strong>
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    p={2}
                  >
                    <Typography fontSize={20} fontWeight={"bold"}>
                      Tổng thanh toán
                    </Typography>
                    <Typography fontSize={20}>
                      <strong style={{ color: "#ff3366" }}>
                        {fPrice(selected.trip_fee + selected.hotel_fee)}
                      </strong>
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#f36",
                color: "#fff",
                padding: "11px 21px",
                mr: 2,
                mb: 2,
                "&:hover": {
                  backgroundColor: "#f36",
                  color: "#fff",
                },
              }}
            >
              Đặt và thanh toán
            </Button>
          </DialogActions>
        </Dialog>
      </Form>
    </FormikProvider>
  );
};

export default DialogBookingTrip;
