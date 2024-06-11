import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { uploadAPI } from "~/apis";
import ContainedImageStyle from "~/components/ContainedImageStyle";
import OverviewImg from "~/features/@dashboard/components/OverviewImg";
import Provice from "~/features/@dashboard/components/Provice";
import { usePlaceSlice } from "~/features/place/placeSlice";
import { proviceActions } from "~/features/provices/proviceSlice";
import { getBlobImg, subPlaceSchema } from "~/utils";

const FormAddEditSubPlace = ({
  initialValues = {
    id: "",
    name: "",
    hotel_address: "",
    thumb: "",
    images: [],
    description: "",
    district_code: "",
    district_name: "",
    provice_code: "",
    provice_name: "",
    ward_code: "",
    ward_name: "",
    area_id: "",
    location: null,
  },
  onSubmit = (values) => {},
}) => {
  const dispatch = useDispatch();
  const { data: optionsPlace } = usePlaceSlice();
  const fileRef = useRef();
  const filesRef = useRef();
  const [imgBlob, setImgBlob] = useState(() => {
    return { url: initialValues.thumb } || null;
  });
  const [imagesBlob, setImagesBlob] = useState(() => {
    return initialValues.images || [];
  });
  const [selectedPlace, setSelectedPlace] = useState(() => {
    return optionsPlace.find((t) => t.id === initialValues.area_id);
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: subPlaceSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;

      console.log({ values, imagesBlob, imgBlob });

      if (values.images.length !== imagesBlob.length) {
        toast.warning("Vui lòng chờ upload nhiều ảnh trong giây lát. Và thử lại sau!");
        return;
      }

      if (!values.images?.length) {
        toast.error("Vui lòng upload danh sách ảnh. Trước khi tạo!");
        return;
      }

      if (values.thumb?.id !== imgBlob?.id) {
        toast.warning("Vui lòng chờ upload ảnh trong giây lát. Và thử lại sau!");
        return;
      }

      if (!values.thumb) {
        toast.error("Vui lòng upload ảnh!");
        return;
      }

      onSubmit(values);
    },
  });

  const { errors, touched, handleSubmit, values, setFieldValue, getFieldProps } = formik;

  const handleOpenInputFiles = useCallback(() => {
    if (filesRef.current) {
      filesRef.current.click();
    }
  }, [filesRef.current]);

  /**
   * Handle change file images and uploads files to server, this will slow upload a few minutes
   */
  const handleChangeImages = useCallback(
    async (event) => {
      if (!event.target.files.length) return;

      const files = event.target.files,
        arrayFiles = Array.from(files);

      const responseImagesBlob = await Promise.all(arrayFiles.map((file) => getBlobImg(file)));

      setImagesBlob((pre) => [...pre, ...responseImagesBlob]);

      const prevImages = [...values.images],
        responseImagesBlobLength = responseImagesBlob.length;

      /**
       * Upload files to server -> return response image
       */
      uploadAPI.formLocalFiles(files).then(({ data }) => {
        for (let index = 0; index < responseImagesBlobLength; index++) {
          const imageItem = responseImagesBlob[index],
            imageFound = data[index];

          if (imageFound) {
            prevImages.push({
              ...imageItem,
              path: imageFound.path,
              filename: imageFound.filename,
            });
          }
        }

        setFieldValue("images", prevImages);
      });
    },
    [values.images]
  );

  const handleDeleteImagesBlob = (img) => {
    const prevImages = [...values.images];
    console.log({ prevImages, img });
    const newImagesBlob = imagesBlob.filter((i) => i.id !== img.id);
    const newImages = prevImages.filter((t) => t.id !== img.id);

    setImagesBlob(() => newImagesBlob);
    setFieldValue("images", newImages);
  };

  const handleTriggerUploadImage = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleChangeImg = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imgBlob = await getBlobImg(file);

    setImgBlob(imgBlob);

    uploadAPI.formLocalFile(file).then(({ data }) => {
      const imagesUrl = {
        ...imgBlob,
        path: data.path,
        filename: data.filename,
      };

      setFieldValue("thumb", imagesUrl);
    });
  };

  const handleDeleteImgBlob = () => {
    setImgBlob(null);
    setFieldValue("thumb", null);
  };

  const handleChangeOptionPlace = (event, value) => {
    setSelectedPlace(value);
    setFieldValue("area_id", value?.id);

    if (value) {
      dispatch(proviceActions.getDistrictsStart(value?.province_code));
      dispatch(proviceActions.getWardsStart(value?.district_code));
    }

    setFieldValue("provice_code", value?.province_code);
    setFieldValue("provice_name", value?.province_name);
    setFieldValue("district_code", value?.district_code);
    setFieldValue("district_name", value?.district_name);
    setFieldValue("ward_code", value?.ward_code);
    setFieldValue("ward_name", value?.ward_name);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Card>
              <CardContent>
                <TextField
                  fullWidth
                  label="Tên địa điểm lân cận"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Giới thiệu về địa điểm lân cận"
                  multiline
                  rows={4}
                  margin="normal"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />

                <Box mt={2} height="100%">
                  <Typography variant="body1" color="#212B36">
                    Danh sách ảnh
                  </Typography>

                  <input
                    type="file"
                    ref={filesRef}
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleChangeImages}
                  />

                  <ContainedImageStyle spacing={2} sx={{ height: 200 }}>
                    <Stack
                      width="100%"
                      height="100%"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        background: "rgba(0,0,0,0.05)",
                        "&:hover": { opacity: 0.7 },
                      }}
                      borderRadius={1}
                      onClick={handleOpenInputFiles}
                    >
                      <AddPhotoAlternateIcon
                        sx={{
                          fontSize: 100,
                          filter: "drop-shadow(2px 4px 6px #2065D1)",
                        }}
                      />
                    </Stack>
                  </ContainedImageStyle>

                  {imagesBlob.length > 0 ? (
                    <Stack flexDirection={"row"} height="100%" width="100%" mt={2} gap={1}>
                      {imagesBlob.map((item, index) => (
                        <Box height={100} width={100} key={index}>
                          <OverviewImg
                            src={item.url}
                            border="1px dotted"
                            onDeleteImg={() => handleDeleteImagesBlob(item)}
                          />
                        </Box>
                      ))}
                    </Stack>
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card>
              <CardContent>
                <Box mt={2}>
                  <Typography variant="body1" color="#212B36">
                    Ảnh tiêu đề
                  </Typography>

                  <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={handleChangeImg}
                  />

                  <ContainedImageStyle>
                    {imgBlob?.url ? (
                      <OverviewImg
                        height={200}
                        src={imgBlob?.url}
                        onClickImg={handleTriggerUploadImage}
                        onDeleteImg={handleDeleteImgBlob}
                      />
                    ) : (
                      <Stack
                        width="100%"
                        height={200}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                          background: "rgba(0,0,0,0.05)",
                          "&:hover": { opacity: 0.8 },
                        }}
                        borderRadius={1}
                        onClick={handleTriggerUploadImage}
                      >
                        <AddPhotoAlternateIcon
                          sx={{
                            fontSize: 100,
                            filter: "drop-shadow(2px 4px 6px #2065D1)",
                          }}
                        />
                      </Stack>
                    )}
                  </ContainedImageStyle>
                </Box>

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
                      {...getFieldProps("area_id")}
                      error={Boolean(touched.area_id && errors.area_id)}
                      helperText={touched.area_id && errors.area_id}
                      {...params}
                      inputProps={{ ...params.inputProps }}
                      label="Khu vực (địa điểm du lịch)"
                      margin="normal"
                    />
                  )}
                />

                <Provice
                  key={"province"}
                  getFieldProps={getFieldProps}
                  touched={touched}
                  errors={errors}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <LoadingButton type="submit" loading={false} fullWidth variant="contained">
                  {initialValues?.id ? "Lưu thay đổi" : "Tạo địa điểm"}
                </LoadingButton>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default FormAddEditSubPlace;
