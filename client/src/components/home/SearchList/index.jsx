import BedIcon from "@mui/icons-material/Bed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import vi from "date-fns/locale/vi";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DatePickerStyle,
  GridItemStyle,
  GridStyle,
  PaperStyle,
  ToolbarStyle,
  WrapperStyle,
} from "~/components/home/SearchList/components";
import { OPTION_TYPES } from "~/constants";
import { proviceActions, selectProvinceOptions } from "~/features/provices/proviceSlice";
import useOutsideAlerter from "~/hooks/useOutsideAlerter";
import DatePicker from "../date-picker/DatePicker";
import ButtonOptions from "./ButtonOptions";
import LoadingInputSearch from "./LoadingInputSearch";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { usePlaceSlice } from "~/features/place/placeSlice";

const optionTypes = [
  {
    label: "Lịch trình",
    value: OPTION_TYPES.TOUR,
  },
  {
    label: "Khách sạn",
    value: OPTION_TYPES.HOTEL,
  },
];

function SearchList({
  provinceName,
  optionTypeSelected = OPTION_TYPES.TOUR,
  onChangeOptionType = (value) => {},
}) {
  const { data: placesOptions } = usePlaceSlice();
  const [destination, setDestination] = useState("");
  const [destinationTrip, setDestinationTrip] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [counter, setCounter] = useState(0);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const dateRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provices = useSelector(selectProvinceOptions);

  useEffect(() => {
    dispatch(proviceActions.getProvicesStart());
  }, []);

  useEffect(() => {
    if (!provinceName) return;

    setDestination(provinceName);

    handleSearch(provinceName);
  }, [provinceName]);

  useOutsideAlerter(dateRef, () => {
    setOpenDate(false);
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = useCallback(
    (destination) => {
      if (!destination) {
        toast.error("Vui lòng chọn nơi bạn muốn đến!");
        return;
      }

      navigate("/hotels", { state: { destination, date, options } });
    },
    [destination]
  );

  const optionsList = useMemo(() => {
    return [
      {
        name: "Người lớn",
        number: options.adult,
        disabled: options.adult <= 1,
        label: "adult",
      },
      {
        name: "Trẻ em",
        number: options.children,
        disabled: options.children <= 0,
        label: "children",
      },
      {
        name: "Phòng",
        number: options.room,
        disabled: options.room <= 1,
        label: "room",
      },
    ];
  }, [options]);

  const handleChangeDate = (dates) => {
    setDate((pre) => [dates.selection]);
  };

  const handleClickDatePicker = () => {
    if (openDate) {
      setCounter((prev) => ++prev);
    }
  };

  useEffect(() => {
    if (counter === 1 && !openDate) {
      setCounter(0);
    }

    if (counter === 2) {
      setCounter(0);
      setOpenDate(false);
    }
  }, [counter, openDate]);

  const handleChangeDestination = (key) => (event, value) => {
    if (key === "trip") {
      setDestinationTrip(value);
    } else {
      setDestination(value?.name);
    }
  };

  const handleSearchTour = useCallback((destination) => {
    if (!destination) {
      toast.error("Vui lòng chọn nơi bạn muốn đến!");
      return;
    }

    navigate("/trip/new", { state: { destination } });
  }, []);

  return (
    <Box
      sx={{
        backgroundImage: "url(/bg.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        "&::before": {
          content: `""`,
          position: "absolute",
          width: "100%",
          display: "block",
          backgroundColor: "rgba(0,0,0,0.4)",
          height: "100%",
        },
      }}
    >
      <Container maxWidth="lg" style={{ position: "relative" }}>
        <ToolbarStyle
          sx={{
            color: "#fff",
            p: 7.4,
            height: 450,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Stack spacing={1} mb={3}>
            <Typography variant="h2" textTransform={"uppercase"}>
              {optionTypeSelected === OPTION_TYPES.TOUR
                ? "Tạo lịch trình cụ thể đơn giản"
                : "Tìm chỗ nghỉ khách sạn"}
            </Typography>

            <Typography variant="h4" fontWeight={500}>
              {optionTypeSelected === OPTION_TYPES.TOUR
                ? "Combo giá ưu nãy, trãi nghiệm độc đáo"
                : "Tìm ưu đãi khách sạn, chỗ nghỉ đa dạng và nhiều hơn nữa..."}
            </Typography>
          </Stack>

          <WrapperStyle sx={{ color: "black" }}>
            <Stack
              sx={{
                width: "100%",
                flexDirection: "row",
                color: "white",
                mx: 1,
                mr: 4,
                borderBottom: (theme) => `2px solid ${theme.palette.grey[300]}`,
                gap: 1,
              }}
            >
              {optionTypes.map((item) => {
                return (
                  <Box
                    onClick={() => onChangeOptionType?.(item.value)}
                    key={item.value}
                    sx={{
                      p: 2,
                      cursor: "pointer",
                      background: (theme) => theme.palette.grey[300],
                      borderRadius: "8px 8px 0 0",
                      color: (theme) =>
                        optionTypeSelected === item.value ? theme.palette.primary.main : "black",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      transition: "all 0.25s ease-in-out 0s",
                      "&:hover": {
                        color: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                );
              })}
            </Stack>

            {optionTypeSelected === OPTION_TYPES.HOTEL ? (
              // Dành cho khách sạn
              <GridStyle direction={{ lg: "row", xs: "column" }} spacing={"4px"}>
                <GridItemStyle>
                  {provices?.length ? (
                    <Autocomplete
                      sx={{
                        minWidth: {
                          md: 200,
                        },
                      }}
                      disablePortal
                      // inputValue={destination}
                      options={provices}
                      getOptionLabel={(option) => option.name}
                      onChange={handleChangeDestination("hotel")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Bạn muốn đến đâu?"
                          variant="standard"
                          fullWidth
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <BedIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    />
                  ) : (
                    <LoadingInputSearch />
                  )}
                </GridItemStyle>

                <GridItemStyle>
                  <Box ref={dateRef}>
                    <Stack direction={"row"} spacing={1} onClick={() => setOpenDate(!openDate)}>
                      <CalendarMonthIcon />
                      <Stack>
                        <Typography>
                          {`${format(date[0].startDate, "E P", {
                            locale: vi,
                          })} - ${format(date[0].endDate, "E P", {
                            locale: vi,
                          })}`}
                        </Typography>
                      </Stack>
                    </Stack>
                    {openDate && (
                      <DatePickerStyle onClick={handleClickDatePicker}>
                        <DatePicker date={date} onChangeDate={handleChangeDate} />
                      </DatePickerStyle>
                    )}
                  </Box>
                </GridItemStyle>

                <GridItemStyle>
                  <Box>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      onClick={() => setOpenOptions(!openOptions)}
                    >
                      <PermIdentityIcon />
                      <Typography>{`${options.adult} người lớn · ${options.children} trẻ em · ${options.room} phòng`}</Typography>
                    </Stack>
                    {openOptions && (
                      <PaperStyle>
                        {optionsList.map((i, index) => (
                          <ButtonOptions
                            key={index}
                            disabled={i.disabled}
                            name={i.name}
                            number={i.number}
                            onClickFunc={handleOption}
                            label={i.label}
                          />
                        ))}
                      </PaperStyle>
                    )}
                  </Box>
                </GridItemStyle>

                <GridItemStyle>
                  <Button
                    sx={{ height: "100%", borderRadius: "2px" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleSearch(destination)}
                  >
                    Tìm
                  </Button>
                </GridItemStyle>
              </GridStyle>
            ) : (
              // Dành cho lịch trình
              <GridStyle direction={{ lg: "row", xs: "column" }} spacing={"4px"}>
                <GridItemStyle>
                  {placesOptions?.length ? (
                    <Autocomplete
                      sx={{
                        minWidth: {
                          md: 900,
                        },
                      }}
                      disablePortal
                      options={placesOptions}
                      getOptionLabel={(option) => option.name}
                      onChange={handleChangeDestination("trip")}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Bạn muốn đến đâu?"
                          variant="standard"
                          fullWidth
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
                </GridItemStyle>

                <GridItemStyle>
                  <Button
                    sx={{ height: "100%", borderRadius: "2px" }}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleSearchTour(destinationTrip)}
                  >
                    Lên lịch trình
                  </Button>
                </GridItemStyle>
              </GridStyle>
            )}
          </WrapperStyle>
        </ToolbarStyle>
      </Container>
    </Box>
  );
}

export default memo(SearchList);
