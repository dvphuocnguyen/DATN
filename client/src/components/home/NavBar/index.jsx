import { Container, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { APPLICATION_NAME } from "~/constants";
import { authActions, authState } from "~/features/authentication/authSlice";
import AccountPopover from "~/layouts/dashboard/AccountPopover";

const WrapperStyle = styled(AppBar)(({ theme }) => ({
  [theme.breakpoints.down(400)]: {
    padding: 0,

    "&>div>div>button": {
      fontSize: 12,
      opacity: 0.7,
    },
  },
}));

export default function NavBar() {
  const dispach = useDispatch();
  const { accessToken, user } = useSelector(authState);

  useEffect(() => {
    if (!accessToken) return;

    dispach(authActions.getCurrentUserStart({ accessToken }));
  }, [accessToken]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <WrapperStyle position="static" sx={{ background: (theme) => theme.palette.primary.main }}>
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              flexDirection: {
                md: "row",
                xs: "column",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Link
                sx={{
                  textDecoration: "none",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
                component={RouterLink}
                to="/"
              >
                <Box
                  component={"img"}
                  alt={"Logo"}
                  src="/Tour-Logo.png"
                  sx={{
                    width: 100,
                    height: 80,
                    objectFit: "contain",
                    filter: "drop-shadow(2px 4px 6px white)",
                  }}
                />
                <Typography variant="h4" component="div" fontWeight={700} fontStyle={"italic"}>
                  {APPLICATION_NAME}
                </Typography>
              </Link>
            </Box>

            <Box>
              {/* {user?.role === "ADMIN" ||
                (user?.role === "HOTEL" ? null : (
                  <Link
                    component={RouterLink}
                    to="/register/post-hotel"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button color="inherit" sx={{ mr: 1 }}>
                      Đăng ký chỗ nghỉ của Quý vị
                    </Button>
                  </Link>
                ))} */}

              {!accessToken ? (
                <>
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button color="inherit" sx={{ mr: 1 }}>
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/sign-up"
                    sx={{ color: "inherit", textDecoration: "none" }}
                  >
                    <Button color="inherit" sx={{ mr: 1 }}>
                      Đăng ký
                    </Button>
                  </Link>
                </>
              ) : (
                <AccountPopover />
              )}
            </Box>
          </Toolbar>
        </Container>
      </WrapperStyle>
    </Box>
  );
}
