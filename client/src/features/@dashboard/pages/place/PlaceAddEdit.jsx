import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { areaAPI } from "~/apis";
import { PageLayoutAddEdit } from "~/features/@dashboard/components";
import FormAddEditPlace from "~/features/@dashboard/pages/place/components/FormAddEditPlace";
import { appActions } from "~/features/app/appSlice";
import { placeActions } from "~/features/place/placeSlice";
import { proviceActions } from "~/features/provices/proviceSlice";
import { getSlug, sleep } from "~/utils";

const PlaceAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const isAddMode = !Boolean(id);

  useEffect(() => {
    if (!id) return;

    areaAPI.getById(id).then(async ({ data }) => {
      await sleep();
      setSelected(data);
      dispatch(proviceActions.getDistrictsStart(data?.province_code));
      dispatch(proviceActions.getWardsStart(data?.district_code));
    });
  }, [id]);

  const handleSubmit = (values) => {
    const images = values.images
      .map((img) => {
        if (typeof img === "object") {
          if (img.filename) {
            return img.filename;
          }

          return img.id;
        }

        return img;
      })
      .filter((t) => t);

    const payload = {
      ...values,
      slug: getSlug(values.name),
      province_code: values.provice_code,
      province_name: values.provice_name,
      address: values.hotel_address,
      thumb: typeof values.thumb === "object" ? values.thumb.filename : values.thumb,
      images,
    };

    dispatch(appActions.setOpenOverlay(true));

    if (!payload.id) {
      dispatch(placeActions.createStart(payload));
    } else {
      dispatch(placeActions.updateStart({ id: payload.id, data: payload }));
    }
  };

  const initialValues = useMemo(() => {
    if (!selected)
      return {
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
        location: null,
      };

    return {
      id: selected.id,
      name: selected.name,
      hotel_address: selected.address || "",
      thumb: selected?.thumbUrl || "",
      images: selected?.imagesUrl || [],
      description: selected?.description,
      district_code: selected?.district_code,
      district_name: selected?.district_name,
      provice_code: selected?.province_code,
      provice_name: selected?.province_name,
      ward_code: selected?.ward_code,
      ward_name: selected?.ward_name,
      location: selected?.location,
      imageIds: selected?.images || [],
      thumbId: selected?.thumb || "",
    };
  }, [selected]);

  return (
    <PageLayoutAddEdit
      title={`${isAddMode ? "Thêm" : "Cập nhật"} Địa điểm`}
      backLink="/manager/place"
    >
      {isAddMode || (!isAddMode && selected) ? (
        <FormAddEditPlace initialValues={initialValues} onSubmit={handleSubmit} />
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </PageLayoutAddEdit>
  );
};

export default PlaceAddEdit;
