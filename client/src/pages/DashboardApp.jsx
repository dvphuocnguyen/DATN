// @mui
import { Container, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// components
import Page from "../components/Page";
// sections
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { revenueActions, revenueState } from "~/features/revenue/revenueSlice";
import { AppWidgetSummary } from "../sections/@dashboard/app";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { totalRevueByRooms, totalBillCancel, totalCustomer, costTrip, totalRevueByMonth } =
    useSelector(revenueState);

  useEffect(() => {
    dispatch(revenueActions.fetchAllRevueStart());
  }, []);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Xin chào, Chào mừng bạn quay trở lại
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Doanh thu khách sạn"
              total={totalRevueByRooms}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Doanh thu chuyến đi"
              total={costTrip}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Khách hàng"
              total={totalCustomer}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tổng số đơn hủy"
              total={totalBillCancel}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
