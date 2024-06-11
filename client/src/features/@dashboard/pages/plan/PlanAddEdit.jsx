import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { tripAPI } from "~/apis";
import { PageLayoutAddEdit } from "~/features/@dashboard/components";
import FormAddEditPlan from "~/features/@dashboard/pages/plan/components/FormAddEditPlan";
import { appActions } from "~/features/app/appSlice";
import { hotelActions } from "~/features/hotels/hotelSlice";
import { placeActions } from "~/features/place/placeSlice";
import { subPlaceActions } from "~/features/subPlace/subPlaceSlice";
import { tripActions } from "~/features/trip/tripSlice";
import { sleep } from "~/utils";

const PlanAddEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const isAddMode = !Boolean(id);

  useEffect(() => {
    dispatch(placeActions.getAllStart({ limit: 9999999 }));
  }, []);

  useEffect(() => {
    if (!id) return;

    tripAPI.getById(id).then(async ({ data }) => {
      dispatch(
        hotelActions.findHotelsStart({
          destination: data.destination?.province_name,
          total_people: 1,
        })
      );

      await sleep();

      dispatch(subPlaceActions.getAllStart({ where: `area_id,${data.destination_id}` }));
      setSelected(data);
    });
  }, [id]);

  const handleSubmit = (values) => {
    dispatch(appActions.setOpenOverlay(true));

    if (!values.id) {
      dispatch(tripActions.createStart(values));
    } else {
      dispatch(tripActions.updateStart({ id: values.id, data: values }));
    }
  };

  const initialValues = useMemo(() => {
    if (!selected)
      return {
        name: "",
        total_day: "",
        destination_id: "",
        description: "",
        trip_fee: "",
        user_id: "",
        hotel_id: "",
        hotel_fee: "",
        trip_details: [],
      };

    return {
      id: selected?.id,
      name: selected?.name,
      total_day: selected?.total_day,
      destination_id: selected?.destination_id,
      description: selected?.description,
      trip_fee: selected?.trip_fee,
      user_id: selected?.user_id ?? null,
      hotel_id: selected?.hotel_id ?? "",
      hotel_fee: selected?.hotel_fee || "",
      trip_details: selected?.trip_details,
    };
  }, [selected]);

  return (
    <PageLayoutAddEdit
      title={`${isAddMode ? "Thêm" : "Cập nhật"} lịch trình`}
      backLink="/manager/plan"
    >
      {isAddMode || (!isAddMode && selected) ? (
        <FormAddEditPlan initialValues={initialValues} onSubmit={handleSubmit} />
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </PageLayoutAddEdit>
  );
};

export default PlanAddEdit;
