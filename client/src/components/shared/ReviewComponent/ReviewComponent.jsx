import {
  Avatar,
  Box,
  Button,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import account from "~/_mock/account";
import { fToNow } from "~/utils/formatTime";
import DeleteIcon from "@mui/icons-material/Delete";

const ReviewComponent = ({
  id = 0,
  email = "",
  score = 5,
  comment = "",
  createdAt = new Date(),
  isAdmin = false,
  isActive = true,
  isShowDelete = false,
  onToggleIsActive = (id, isActive) => {},
  onDelete = (id) => {},
}) => {
  return (
    <Stack
      flexDirection={"row"}
      gap={2}
      sx={{
        py: 2,
        px: 1,
        cursor: "pointer",
        transition: "all 0.25s ease-in-out 0s",
        "&:hover": {
          background: ({ palette }) => palette.action.hover,
        },
      }}
    >
      <Box>
        <Avatar sx={{ width: 56, height: 56 }} src={account.photoURL} />
      </Box>

      <Box flex={2}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Typography variant="subtitle2" fontWeight={700}>
            {`${email} `}

            <Typography
              component={"span"}
              fontSize={12}
              color={({ palette }) => palette.grey[700]}
            >
              {fToNow(createdAt)}
            </Typography>
          </Typography>

          {isAdmin ? (
            <Button
              size="small"
              variant="contained"
              color={isActive ? "error" : "success"}
              onClick={() => onToggleIsActive?.(id, isActive)}
              ml={2}
            >
              {isActive ? "Ẩn" : "Hiện"}
            </Button>
          ) : null}

          {isShowDelete ? (
            <IconButton onClick={() => onDelete?.(id)} color="error">
              <DeleteIcon />
            </IconButton>
          ) : null}
        </Stack>

        <Box>
          <Typography variant="subtitle2">
            <Rating
              name="simple-controlled"
              value={score}
              precision={0.5}
              readOnly
            />
          </Typography>
          <Typography variant="subtitle2">{comment}</Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default ReviewComponent;
