import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface Props {
  open: boolean;
  onClose: () => void;
  rowData?: any; // expected to include status or isActive flag
  onConfirm: (isActivating: boolean, rowData: any) => void;
}

const ActiveInactivePopup: React.FC<Props> = ({
  open,
  onClose,
  rowData,
  onConfirm,
  
}) => {
  const [loading, setLoading] = useState(false);

  const isActive = rowData?.isActive ?? true;
  const typeLabel = rowData?.type || "item";


  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(!isActive, rowData);
      onClose();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>
        <WarningAmberRoundedIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Warning
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="body1" textAlign="center">
            Are you sure you want to{" "}
            <strong>{isActive ? "Deactivate" : "Activate"}</strong> this{" "}
            <strong>{typeLabel}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Once confirmed, this action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color={isActive ? "error" : "success"}
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Processing..." : isActive ? "Deactivate" : "Activate"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActiveInactivePopup;
