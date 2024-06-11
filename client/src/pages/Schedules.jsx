import { Box, Container, Grid, Typography } from "@mui/material";
import _ from "lodash";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer, MailList, NavBar } from "~/components/home";
import Page from "~/components/Page";
import TripCard from "~/components/shared/TripCard";
import { UNLIMITED } from "~/constants";
import { authState } from "~/features/authentication/authSlice";
import { tripActions, useTripSlice } from "~/features/trip/tripSlice";

const Schedules = () => {
  const dispatch = useDispatch();
  const { data: trips } = useTripSlice();
  const { user } = useSelector(authState);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (_.isEmpty(user)) {
      navigate("/sign-in", { replace: true });
      return;
    }

    dispatch(tripActions.getAllStart({ limit: UNLIMITED, where: `user_id,${user.user_id}` }));
  }, [user]);

  return (
    <Page title="Lịch trình đã tạo">
      <NavBar />

      <Container maxWidth="lg" sx={{ p: 6 }}>
        <Typography pb={2} variant="h5">
          Danh sách lịch trình đã tạo
        </Typography>

        <Grid container flexDirection={"row"} spacing={2}>
          {trips.length ? (
            trips.map((item, index) => (
              <Grid item md={3} key={index} sx={{ position: "relative", height: "100%" }}>
                <TripCard to="/schedule" item={item} />
              </Grid>
            ))
          ) : (
            <Box>
              <Typography color="red" fontSize={20}>
                Bạn chưa tạo lịch trình nào
              </Typography>
            </Box>
          )}
        </Grid>
      </Container>

      <MailList />
      <Footer />
    </Page>
  );
};

export default Schedules;
