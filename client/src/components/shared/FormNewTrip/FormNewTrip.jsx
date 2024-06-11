import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlagIcon from "@mui/icons-material/Flag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { addDays, differenceInDays } from "date-fns";
import _ from "lodash";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingInputSearch from "~/components/home/SearchList/LoadingInputSearch";
import { DatePickerStyle } from "~/components/home/SearchList/components";
import DatePicker from "~/components/home/date-picker/DatePicker";
import { authState } from "~/features/authentication/authSlice";
import { usePlaceSlice } from "~/features/place/placeSlice";
import useOutsideAlerter from "~/hooks/useOutsideAlerter";
import { formatDateVN } from "~/utils/formatTime";

const FormNewTrip = ({ initialValues = { destination: null }, onSubmit }) => {
  const refBox = useRef();
  const { data: placesOptions } = usePlaceSlice();
  const [openDate, setOpenDate] = useState(false);
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState(() => {
    return initialValues.destination || null;
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 2),
      key: "selection",
    },
  ]);
  const { user } = useSelector(authState);
  const navigate = useNavigate();

  useOutsideAlerter(refBox, () => {
    setOpenDate(false);
  });

  const handleChangeDate = (dates) => {
    setDate(() => [dates.selection]);
  };

  const handleOpenDatePicker = () => {
    setOpenDate(true);
  };

  const handleChangeDestination = (_, value) => {
    setDestination(value);
  };

  const handleSubmit = () => {
    if (_.isEmpty(user)) {
      navigate("/sign-in", { replace: true });
      return;
    }

    if (!start) {
      toast.error("Vui lòng nhập điểm xuất phát!");
      return;
    }

    if (!destination) {
      toast.error("Vui lòng chọn điểm đến!");
      return;
    }

    const startDate = date[0].startDate;
    const endDate = date[0].endDate;

    const result = differenceInDays(endDate, startDate) + 1;
    const totalDay = result === 0 ? 1 : result;

    if (totalDay === 1) {
      toast.error("Vui lòng chọn ngày đến cách ngày đi lớn hơn 1 ngày!");
      return;
    }

    if (totalDay < 2 || totalDay > 5) {
      toast.error("Lịch trình ít nhất 2 ngày nhiều nhất 5 ngày!");
      return;
    }

    const payload = {
      user_id: user.user_id,
      start,
      destination_id: destination.id,
      start_date: startDate,
      end_date: endDate,
      totalDay,
    };

    onSubmit?.(payload);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Typography>Điểm xuất phát</Typography>
        <TextField
          id="outlined-basic"
          placeholder="Chọn điểm xuất phát"
          variant="outlined"
          fullWidth
          margin="dense"
          value={start}
          onChange={({ target: { value } }) => setStart(value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlagIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item md={6}>
        <Typography>Điểm đến</Typography>

        {placesOptions?.length ? (
          <Autocomplete
            disablePortal
            m
            options={placesOptions}
            getOptionLabel={(option) => option.name}
            onChange={handleChangeDestination}
            value={destination}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="dense"
                placeholder="Bạn muốn đến đâu?"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        ) : (
          <LoadingInputSearch />
        )}
      </Grid>

      <Grid item md={12}>
        <Box sx={{ position: "relative" }}>
          <Typography mb={1}>Ngày đi - Ngày về</Typography>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            sx={{ padding: "16px 14px", border: "1px solid #ccc", borderRadius: 1 }}
          >
            <CalendarMonthIcon onClick={handleOpenDatePicker} sx={{ mr: 1, cursor: "pointer" }} />
            {`${formatDateVN(date[0].startDate, "P")} - 
            ${formatDateVN(date[0].endDate, "P")}`}
          </Stack>

          {openDate && (
            <DatePickerStyle ref={refBox}>
              <DatePicker date={date} onChangeDate={handleChangeDate} />
            </DatePickerStyle>
          )}
        </Box>
      </Grid>

      <Grid item md={12}>
        <Button
          onClick={handleSubmit}
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
          Tạo lịch trình
        </Button>
      </Grid>
    </Grid>
  );
};

export default FormNewTrip;
