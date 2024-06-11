import { Box, Container } from "@mui/material";
import _ from "lodash";
import { useLayoutEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar } from "~/components/home";
import Page from "~/components/Page";
import FormNewTrip from "~/components/shared/FormNewTrip";
import { UNLIMITED } from "~/constants";
import { appActions } from "~/features/app/appSlice";
import { placeActions } from "~/features/place/placeSlice";

const NewTrip = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(placeActions.getAllStart({ limit: UNLIMITED }));
  }, []);

  useLayoutEffect(() => {
    if (!state || !state?.destination || _.isEmpty(state?.destination)) {
      navigate("/", { replace: true });
      return;
    }
  }, [state]);

  const initialValues = useMemo(() => {
    if (state?.destination) return { ...state };
  }, [state?.destination]);

  const handleSubmitCreateNewTrip = (values) => {
    dispatch(appActions.setText("Đang tạo chuyến đi. Vui lòng chờ..."));
    dispatch(appActions.setOpenOverlay(true));
    dispatch(placeActions.createByUserStart(values));
  };

  return (
    <Page title="Tạo chuyến đi">
      <NavBar />

      <Container
        sx={{
          p: 6,
          mt: 1,
          minHeight: "calc(100vh - 300px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        maxWidth="lg"
      >
        <Box maxWidth={600}>
          <FormNewTrip initialValues={initialValues} onSubmit={handleSubmitCreateNewTrip} />
        </Box>
      </Container>
    </Page>
  );
};

export default NewTrip;
