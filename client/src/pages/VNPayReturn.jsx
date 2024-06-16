import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";
import Page from "~/components/Page";

function VNPayReturn(props) {
  return (
    <Page title="Thanh toán thành công">
      <Box>
        <Container maxWidth="lg">
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={24}
              sx={{
                borderRadius: "2px",
                minWidth: 300,
                minHeight: 300,
                transition: "all .25s ease",
                "&:hover": {
                  boxShadow:
                    "rgb(0 0 0 / 20%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 3px 14px 3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px",
                },
              }}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                sx={{
                  background: "linear-gradient(to right, #249ee8 , #127cde);",
                  p: 2,
                  color: "#fff",
                }}
              >
                <CheckCircleIcon
                  fontSize="large"
                  sx={{ width: 100, color: "#19c790", height: 100 }}
                />
                <Typography mt={2} variant="h3">
                  Đặt thành công
                </Typography>

                <Typography mt={2}>Chúc bạn có một trải nghiệm thú vị</Typography>
              </Stack>

              <Stack justifyContent="center" mt={2} alignItems="center" mb={2}>
                <Typography mb={1.5} fontStyle="italic" color="error">
                  * Vui lòng kiểm tra email để xem chi tiết hoá đơn
                </Typography>
                <Button
                  component={Link}
                  to="/"
                  sx={{ borderRadius: "2px" }}
                  variant="outlined"
                >
                  Trở về trang chủ
                </Button>
              </Stack>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Page>
  );
}

VNPayReturn.propTypes = {};

export default VNPayReturn;
