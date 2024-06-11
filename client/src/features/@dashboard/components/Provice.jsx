import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { proviceActions, proviceState } from "~/features/provices/proviceSlice";

function Provice({ getFieldProps, touched, errors, values, setFieldValue }) {
  const { provices, districts, wards } = useSelector(proviceState);
  const dispatch = useDispatch();

  const [state, setState] = useState(() => {
    return {
      province: null,
      district: null,
      ward: null,
    };
  });

  useEffect(() => {
    let isUnmounted = false;

    if (!isUnmounted) {
      setState((prev) => ({
        ...prev,
        province: provices?.find((t) => t.code === values.provice_code) ?? null,
        district: districts?.find((t) => t.code === values.district_code) ?? null,
        ward: wards?.find((t) => t.code === values.ward_code) ?? null,
      }));
    }

    return () => {
      isUnmounted = true;
    };
  }, [values, provices, wards, districts]);

  useEffect(() => {
    dispatch(proviceActions.getProvicesStart());
  }, []);

  const handleChangeState = (name, code, stateName) => (_, value) => {
    setState((prev) => ({ ...prev, [stateName]: value }));

    if (value) {
      if (stateName === "province") {
        dispatch(proviceActions.getDistrictsStart(value.code));
      }

      if (stateName === "district") {
        dispatch(proviceActions.getWardsStart(value.code));
      }
    }

    setFieldValue(name, value?.name || null);
    setFieldValue(code, value?.code || null);
  };

  return (
    <>
      <Autocomplete
        id="province"
        options={provices}
        value={state.province}
        onChange={handleChangeState("provice_name", "provice_code", "province")}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.name} size="small" {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            error={Boolean(touched.provice_code && errors.provice_code)}
            helperText={touched.provice_code && errors.provice_code}
            {...params}
            inputProps={{ ...params.inputProps }}
            label="Tỉnh thành"
            margin="normal"
          />
        )}
      />

      <Autocomplete
        id="district_code"
        options={districts}
        value={state.district}
        onChange={handleChangeState("district_name", "district_code", "district")}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.name} size="small" {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            error={Boolean(touched.district_code && errors.district_code)}
            helperText={touched.district_code && errors.district_code}
            {...params}
            inputProps={{ ...params.inputProps }}
            label="Quận, huyện"
            margin="normal"
          />
        )}
      />

      <Autocomplete
        id="ward"
        options={wards}
        value={state.ward}
        onChange={handleChangeState("ward_name", "ward_code", "ward")}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option.name} size="small" {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            error={Boolean(touched.ward_code && errors.ward_code)}
            helperText={touched.ward_code && errors.ward_code}
            {...params}
            inputProps={{ ...params.inputProps }}
            label="Xã, phường"
            margin="normal"
          />
        )}
      />

      <TextField
        fullWidth
        label="Địa chỉ chi tiết"
        multiline
        rows={2}
        margin="normal"
        {...getFieldProps("hotel_address")}
        error={Boolean(touched.hotel_address && errors.hotel_address)}
        helperText={touched.hotel_address && errors.hotel_address}
      />
    </>
  );
}

Provice.propTypes = {
  touched: PropTypes.any,
  errors: PropTypes.any,
  values: PropTypes.any,
  getFieldProps: PropTypes.func,
  setFieldValue: PropTypes.func,
};

export default memo(Provice);
