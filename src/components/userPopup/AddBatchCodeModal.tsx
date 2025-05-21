import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  TextField,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { setIsRefreshed } from "../../store/slices/userSlice";
import { showToast } from "../../lib/utils";
import API from "../../api";
import { useGlobalLoaderContext } from "../../helpers/GlobalLoader";
import "./AddBatchCode.scss";

interface AddBatchCodeModalProps {
  open: boolean;
  onClose: () => void;
  userId: number; // Not used, but kept in case needed for future
}

const AddBatchCodeModal: React.FC<AddBatchCodeModalProps> = ({
  open,
  onClose,
}) => {
  const [batchCode, setBatchCode] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useGlobalLoaderContext();

  const isValidBatchCode = /^[a-zA-Z0-9]{7}$/.test(batchCode);

const handleSubmit = async () => {
  if (!isValidBatchCode) return;

  showLoader("Submitting batch code...");

  try {
    // Make the API call to add the batch code
    await API.userAction("addCode",  { code: batchCode });

    // Update the Redux state to trigger data refresh
    dispatch(setIsRefreshed(true));

    // Show success message
    showToast("success", "Batch code added successfully!");

    // Reset and close the modal
    handleClose();
  } catch (error: any) {
    // Handle errors with fallback messaging
    showToast(
      "error",
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    // Always hide loader
    hideLoader();
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 7 && /^[a-zA-Z0-9]*$/.test(value)) {
      setBatchCode(value);
    }
  };

  const handleClose = () => {
    setBatchCode("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ position: "relative", pt: 6 }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography
          sx={{
            mt: 2,
            padding: "10px",
            borderRadius: "8px",
            width: "100%",
            color: "#000",
            fontSize: "20px",
          }}
          
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Britannia Breads – Batch Code Entry
        </Typography>

        <Typography mt={5} fontWeight="bold" textAlign="start" gutterBottom>
          Batch Code
        </Typography>

        <Box mt={0} display="flex" flexDirection="column" gap={2}>
          <TextField
            value={batchCode}
            onChange={handleChange}
            fullWidth
            placeholder="Enter 7-character code"
            inputProps={{ maxLength: 7 }}
            autoFocus
          />

          <Button
            sx={{
              mb: 3,
              backgroundColor: "blue",
              padding: "10px",
              borderRadius: "8px",
              width: "100%",
              color: "#fff",
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
            variant="contained"
            disabled={!isValidBatchCode}
            fullWidth
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddBatchCodeModal;
