import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import NumericFormatCustom from "~/components/form/Number/NumericFormatCustom";
import { hotelActions, hotelState } from "~/features/hotels/hotelSlice";
import { usePlaceSlice } from "~/features/place/placeSlice";
import { subPlaceActions, useSubPlaceSlice } from "~/features/subPlace/subPlaceSlice";
import { tripSchema } from "~/utils";

const FormAddEditPlan = ({
  initialValues = {
    name: "",
    total_day: "",
    destination_id: "",
    description: "",
    trip_fee: "",
    user_id: "",
    hotel_id: "",
    hotel_fee: "",
    trip_details: [],
  },
  onSubmit = (values) => {},
  isClient = false,
}) => {
  const dispatch = useDispatch();
  const { data: optionsPlace } = usePlaceSlice();
  const { data: optionsSubPlaces } = useSubPlaceSlice();
  const { data: optionsHotels } = useSelector(hotelState);
  const [selectedPlace, setSelectedPlace] = useState(() => {
    return optionsPlace.find((t) => t.id === initialValues.destination_id);
  });
  const [selectedHotel, setSelectedHotel] = useState(() => {
    return initialValues.hotel_id
      ? optionsHotels.find((t) => t.hotel_id === initialValues.hotel_id)
      : null;
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: tripSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;

      if (!values.trip_details.length) {
        toast.warning("Chưa có lịch trình chi tiết!");
        return;
      }

      if (!values?.trip_details?.every((t) => t.name)) {
        toast.warning("Các lịch tình chi tiết phải có tên đầy đủ!");
        return;
      }

      if (!values?.trip_details?.every((t) => t.description)) {
        toast.warning("Các lịch tình chi tiết phải có mô tả đầy đủ!");
        return;
      }

      if (!values?.trip_details.every((t) => +t.order_day > 0)) {
        toast.warning("Các lịch tình chi tiết phải có ngày lớn hơn 0!");
        return;
      }

      if (!values?.trip_details.every((t) => t.places.length)) {
        toast.warning("Các lịch tình chi tiết phải có ít nhất 1 điểm đến");
        return;
      }

      if (!values?.trip_details.every((t) => t.places.every((t) => t.place_id && t.place))) {
        toast.warning("Các lịch tình chi tiết phải có đầy đủ các điểm đến");
        return;
      }

      onSubmit(values);
    },
  });

  const { errors, touched, handleSubmit, values, setFieldValue, getFieldProps } = formik;

  const handleChangeOptionPlace = (event, value) => {
    setSelectedPlace(value);
    setFieldValue("destination_id", value?.id);
    setFieldValue("total_day", "");
    setFieldValue("trip_details", []);
    setFieldValue("trip_fee", "");

    // console.log(`handleChangeOptionPlace`);

    if (value) {
      setSelectedHotel(null);
      dispatch(
        hotelActions.findHotelsStart({
          destination: value.name,
          total_people: 1,
        })
      );
      dispatch(subPlaceActions.getAllStart({ where: `area_id,${value.id}` }));
    } else {
      dispatch(hotelActions.setData([]));

      if (values.hotel_id) {
        setFieldValue("hotel_id", "");
      }
    }
  };

  const handleChangeOptionHotel = (_, value) => {
    setFieldValue("hotel_id", value?.hotel_id);
    setSelectedHotel(value);

    if (value) {
      let totalDay = 0;

      if (values.total_day) {
        totalDay = +values.total_day;
      }

      const hotel_fee = value.price * totalDay;

      setFieldValue("hotel_fee", hotel_fee);
    }
  };

  const handleChangeDay = ({ target: { value } }) => {
    const totalDay = +value;

    setFieldValue("total_day", value);

    if (totalDay < 2 || totalDay > 5) return;

    if (selectedHotel) {
      const totalPrice = selectedHotel?.price * totalDay;
      setFieldValue("hotel_fee", totalPrice);
    }

    let prevTripDetails = [...values.trip_details];
    const prevTripDetailsLength = prevTripDetails.length;

    if (totalDay > prevTripDetailsLength) {
      const newLength = totalDay - prevTripDetailsLength;

      for (let index = 0; index < newLength; index++) {
        const id = prevTripDetailsLength + index + 1;

        const newPlaceDefault = {
          id: Math.round(Math.random() * Date.now() * 1000),
          place_id: "",
          place: null,
          order_place: 1,
        };

        const newTripDetails = {
          id: Math.round(Math.random() * Date.now() * 1000),
          name: `Ngày ${id}`,
          description: `Giới thiệu về ngày ${id}`,
          places: [newPlaceDefault],
          order_day: id,
        };

        prevTripDetails.push(newTripDetails);
      }
    } else {
      const newLength = prevTripDetailsLength - totalDay;

      prevTripDetails = prevTripDetails.reverse().slice(newLength, prevTripDetailsLength).reverse();
    }

    setFieldValue("trip_details", prevTripDetails);
  };

  const handleChangeDetailsTrip =
    (key, id) =>
    ({ target: { value } }) => {
      const prevDetailsTrip = [...values.trip_details];
      if (!prevDetailsTrip.length) return;

      const index = prevDetailsTrip.findIndex((t) => t.id === id);

      if (index === -1) return;

      prevDetailsTrip[index] = {
        ...prevDetailsTrip[index],
        [key]: value,
      };

      setFieldValue("trip_details", prevDetailsTrip);
    };

  const handleAddPlace = (id, lastId) => () => {
    const prevDetailsTrip = [...values.trip_details];
    if (!prevDetailsTrip.length) return;

    const index = prevDetailsTrip.findIndex((t) => t.id === id);

    if (index === -1) return;

    const newId = Math.round(Math.random() * Date.now() * 1000);

    const newPlaceDefault = {
      id: newId,
      place_id: "",
      place: null,
      order_place: newId,
    };

    prevDetailsTrip[index] = {
      ...prevDetailsTrip[index],
      places: [...prevDetailsTrip[index].places, newPlaceDefault],
    };

    setFieldValue("trip_details", prevDetailsTrip);
  };

  const handleDeletePlace = (id, placeId) => () => {
    const prevDetailsTrip = [...values.trip_details];
    if (!prevDetailsTrip.length) return;

    const index = prevDetailsTrip.findIndex((t) => t.id === id);

    if (index === -1) return;

    prevDetailsTrip[index] = {
      ...prevDetailsTrip[index],
      places: [...prevDetailsTrip[index].places].filter((t) => t.id !== placeId),
    };

    setFieldValue("trip_details", prevDetailsTrip);
  };

  const handleChangeOptionSubPlace = (id, placeId) => (_, value) => {
    const prevDetailsTrip = [...values.trip_details];

    if (!prevDetailsTrip.length) return;

    const index = prevDetailsTrip.findIndex((t) => t.id === id);

    if (index === -1) return;

    const tripDetails = prevDetailsTrip[index];
    const places = [...tripDetails.places];

    const idx = places.findIndex((t) => t.id === placeId);

    console.log({ prevDetailsTrip, tripDetails, places });

    if (idx === -1) return;

    places[idx] = {
      ...places[idx],
      place_id: value?.id,
      place: value,
    };

    prevDetailsTrip[index] = {
      ...prevDetailsTrip[index],
      places: places,
    };

    setFieldValue("trip_details", prevDetailsTrip);
  };

  const handleChangeTimeLine =
    (id, placeId) =>
    ({ target: { value } }) => {
      const prevDetailsTrip = [...values.trip_details];

      if (!prevDetailsTrip.length) return;

      const index = prevDetailsTrip.findIndex((t) => t.id === id);

      if (index === -1) return;

      const tripDetails = prevDetailsTrip[index];
      const places = [...tripDetails.places];

      const idx = places.findIndex((t) => t.id === placeId);

      if (idx === -1) return;

      places[idx] = {
        ...places[idx],
        timeline: value,
      };

      prevDetailsTrip[index] = {
        ...prevDetailsTrip[index],
        places: places,
      };

      setFieldValue("trip_details", prevDetailsTrip);
    };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={isClient ? 12 : 8}>
            <Card>
              <CardContent>
                <TextField
                  fullWidth
                  required
                  label="Tên lịch trình"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  margin="normal"
                />

                <TextField
                  required
                  fullWidth
                  label="Giới thiệu về lịch trình"
                  multiline
                  rows={4}
                  margin="normal"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </CardContent>
            </Card>

            {values.trip_details.map((row, index) => {
              return (
                <Card key={index} sx={{ mt: 2 }}>
                  <CardContent>
                    <TextField
                      fullWidth
                      required
                      label={`Ngày (đây là ngày thứ ${index + 1})`}
                      placeholder="VD: 1"
                      value={row.order_day}
                      type="number"
                      margin="normal"
                      onChange={handleChangeDetailsTrip("order_day", row.id)}
                    />

                    <TextField
                      fullWidth
                      required
                      label={`Nhập tên chi tiết ngày ${index + 1}`}
                      value={row.name}
                      margin="normal"
                      onChange={handleChangeDetailsTrip("name", row.id)}
                    />

                    <TextField
                      required
                      fullWidth
                      label={`Giới thiệu chi tiết ngày ${index + 1}`}
                      multiline
                      rows={2}
                      margin="normal"
                      value={row.description}
                      onChange={handleChangeDetailsTrip("description", row.id)}
                    />

                    {row.places.map((item, idx, old) => {
                      const isLastPosition = idx + 1 === old.length;
                      return (
                        <FormControl
                          fullWidth
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ width: "95%" }}>
                            <Autocomplete
                              key={idx}
                              id="size-small-filled"
                              options={optionsSubPlaces}
                              value={item.place}
                              onChange={handleChangeOptionSubPlace(row.id, item.id)}
                              getOptionLabel={(option) => option.name}
                              isOptionEqualToValue={(option, value) => option.name === value.name}
                              renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                  <Chip
                                    variant="outlined"
                                    label={option.name}
                                    size="small"
                                    {...getTagProps({ index })}
                                  />
                                ))
                              }
                              renderInput={(params) => (
                                <TextField
                                  required
                                  error={Boolean(touched.destination_id && errors.destination_id)}
                                  helperText={touched.destination_id && errors.destination_id}
                                  {...params}
                                  inputProps={{ ...params.inputProps }}
                                  label={`Địa điểm ${idx + 1}`}
                                  margin="normal"
                                />
                              )}
                            />
                          </Box>

                          {isClient ? (
                            <Box sx={{ width: "10%" }}>
                              <TextField
                                label="TimeLine"
                                value={item.timeline}
                                onChange={handleChangeTimeLine(row.id, item.id)}
                              />
                            </Box>
                          ) : null}

                          <Box sx={{ width: "5%" }}>
                            {isLastPosition ? (
                              <IconButton
                                color="primary"
                                variant="contained"
                                onClick={handleAddPlace(row.id, idx + 1)}
                                fullWidth
                              >
                                <AddIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                color="error"
                                variant="contained"
                                onClick={handleDeletePlace(row.id, item.id)}
                                disabled={idx === 0}
                                fullWidth
                              >
                                <DeleteIcon />
                              </IconButton>
                            )}
                          </Box>
                        </FormControl>
                      );
                    })}
                  </CardContent>
                </Card>
              );
            })}
          </Grid>

          <Grid item xs={12} sm={12} md={isClient ? 12 : 4}>
            {isClient ? null : (
              <Card>
                <CardContent>
                  <Autocomplete
                    id="size-small-filled"
                    options={optionsPlace}
                    value={selectedPlace}
                    onChange={handleChangeOptionPlace}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.name}
                          size="small"
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        error={Boolean(touched.destination_id && errors.destination_id)}
                        helperText={touched.destination_id && errors.destination_id}
                        {...params}
                        inputProps={{ ...params.inputProps }}
                        label="Khu vực (điểm đến)"
                        margin="normal"
                      />
                    )}
                  />

                  <Autocomplete
                    id="size-small-filled"
                    options={optionsHotels}
                    value={selectedHotel}
                    onChange={handleChangeOptionHotel}
                    getOptionLabel={(option) => option.hotel_name}
                    isOptionEqualToValue={(option, value) => option.hotel_name === value.hotel_name}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.hotel_name}
                          size="small"
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{ ...params.inputProps }}
                        label="Khách sạn (nếu có)"
                        margin="normal"
                      />
                    )}
                  />

                  <TextField
                    fullWidth
                    required
                    label="Tổng số ngày"
                    {...getFieldProps("total_day")}
                    onChange={handleChangeDay}
                    error={Boolean(touched.total_day && errors.total_day)}
                    helperText={touched.total_day && errors.total_day}
                    margin="normal"
                  />

                  <TextField
                    fullWidth
                    label="Chi phí chuyến đi"
                    required
                    {...getFieldProps("trip_fee")}
                    error={Boolean(touched.trip_fee && errors.trip_fee)}
                    helperText={touched.trip_fee && errors.trip_fee}
                    margin="normal"
                    InputProps={{
                      inputComponent: NumericFormatCustom,
                    }}
                  />

                  {selectedHotel ? (
                    <TextField
                      fullWidth
                      label="Chi phí khách sạn"
                      required
                      disabled
                      {...getFieldProps("hotel_fee")}
                      error={Boolean(touched.hotel_fee && errors.hotel_fee)}
                      helperText={touched.hotel_fee && errors.hotel_fee}
                      margin="normal"
                      InputProps={{
                        inputComponent: NumericFormatCustom,
                      }}
                    />
                  ) : null}

                  <TextField
                    fullWidth
                    label="Tổng chi phí chuyến đi"
                    required
                    disabled
                    value={(+values.hotel_fee || 0) + (+values.trip_fee || 0)}
                    margin="normal"
                    InputProps={{
                      inputComponent: NumericFormatCustom,
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <LoadingButton type="submit" loading={false} fullWidth variant="contained">
                  {initialValues?.id ? "Lưu thay đổi" : "Tạo lịch trình"}
                </LoadingButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default FormAddEditPlan;
