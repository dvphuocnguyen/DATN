import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReviewComponent from "~/components/shared/ReviewComponent";
import DialogConfirm from "~/features/@dashboard/components/DialogConfim";
import { reviewActions, useReviewSlice } from "~/features/reviews/reviewSlice";

const DialogSeeReview = ({ open, onClose, selected }) => {
  const dispatch = useDispatch();
  const { isLoading, data: reviews } = useReviewSlice();
  const [selectedToggleActiveReview, setSelectedToggleActiveReview] = useState(null);

  useLayoutEffect(() => {
    if (!selected.id) return;

    dispatch(
      reviewActions.getAllStart({ where: "trip_id," + selected.id, order: "created_at,desc" })
    );
  }, [selected.id]);

  const handleSelectedToggleActive = (id, isActive) => {
    setSelectedToggleActiveReview({ id, is_active: isActive });
  };

  const handleClose = () => {
    setSelectedToggleActiveReview(null);
  };

  const handleToggleReview = (data) => {
    const payload = {
      ...data,
      trip_id: selected.id,
    };

    dispatch(reviewActions.updateStart(payload));
    setSelectedToggleActiveReview(null);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Đánh giá của khách hàng</DialogTitle>

      {selectedToggleActiveReview ? (
        <DialogConfirm
          data={selectedToggleActiveReview}
          name={
            selectedToggleActiveReview.is_active
              ? "Bạn có chắc chắn muốn ẩn đánh giá"
              : "Bạn có chắc chắn muốn hiện thị đánh giá"
          }
          text={`Vui lòng xác nhận`}
          title={
            selectedToggleActiveReview.is_active
              ? "Xác nhận ẩn đánh giá"
              : "Xác nhận hiện thị đánh giá"
          }
          open
          onClose={handleClose}
          onConfirm={handleToggleReview}
        />
      ) : null}

      <DialogContent>
        {isLoading ? (
          <Stack justifyContent={"center"} py={2}>
            <CircularProgress />
          </Stack>
        ) : (
          <>
            {reviews?.length ? (
              reviews.map((row, index) => (
                <ReviewComponent
                  id={row.id}
                  isActive={row.is_active}
                  isAdmin
                  key={index}
                  email={`${row?.user?.last_name} ${row?.user?.first_name}`}
                  comment={row.comment}
                  score={row.score}
                  createdAt={new Date(row.created_at)}
                  onToggleIsActive={handleSelectedToggleActive}
                />
              ))
            ) : (
              <Typography variant="body2">Chưa có đánh giá của khách hàng</Typography>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogSeeReview;
