import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import FormNewTrip from "~/components/shared/FormNewTrip";

const DialogNewTrip = ({ open, onClose = () => {}, onSubmit = (payload) => {} }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight={"bold"} textAlign={"center"} mb={2} textTransform={"uppercase"}>
        Tạo chuyến đi cho riêng bạn
      </DialogTitle>

      <DialogContent>
        <FormNewTrip onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogNewTrip;
