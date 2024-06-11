import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

const addReviewSchema = Yup.object().shape({
  comment: Yup.string().required("Bắt buộc."),
  score: Yup.number().min(1, "Vui lòng đánh giá").required("Bắt buộc."),
});

const FormAddReview = ({
  open,
  onClose,
  onSubmit,
  initialValues = { score: 0, comment: "" },
}) => {
 

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addReviewSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;

      onSubmit(values);
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    setFieldValue,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
          <DialogTitle>Đánh giá của bạn</DialogTitle>

          <DialogContent>
            <FormControl error={Boolean(touched.score && errors.score)}>
              <Typography component="legend">Điểm đánh giá</Typography>
              <Rating
                name="simple-controlled"
                value={values.score}
                onChange={(_, value) => setFieldValue("score", value)}
                precision={0.5}
              />

              {Boolean(touched.score && errors.score) ? (
                <FormHelperText>{touched.score && errors.score}</FormHelperText>
              ) : null}
            </FormControl>

            <TextField
              multiline
              rows={3}
              fullWidth
              margin="normal"
              autoComplete="comment"
              type="text"
              label="Cảm nhận của bạn"
              {...getFieldProps("comment")}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" color="error">
              Hủy bỏ
            </Button>

            <Button variant="contained" type="submit" onClick={handleSubmit}>
              Đánh giá
            </Button>
          </DialogActions>
        </Dialog>
      </Form>
    </FormikProvider>
  );
};

export default FormAddReview;
