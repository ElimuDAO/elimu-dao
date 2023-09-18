import * as React from "react";
import { db } from "@/lib/polybase_init";
import { CircularProgress } from "@mui/material";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";

interface Props {
  courseId: string;
  courseName: string;
  courseImage: string;
  owner_id: string;
  owner_name: string;
}

export default function AwardCertificate(props: Props) {
  const { courseId, courseName, courseImage, owner_id, owner_name } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [description, setDescription] = React.useState(
    `This certitficte is awarded to ${owner_name} for completing  the ${courseName} course`
  );

  const handleOpen = () => {
    setOpen(true);
  };

  async function handleSubmit() {
    setLoading(true);
    try {
      const user = await db
        .collection("Certificate")
        .create([
          generateUniqueId(),
          courseId,
          courseName,
          courseImage,
          owner_id,
          owner_name,
          description,
        ]);
      console.log(user.data.id);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ textTransform: "none", borderRadius: 1, width: 150 }}
        onClick={handleOpen}
      >
        Award Certificate
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Award Certificate to {owner_name}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="yourname"
            label="Certificate description"
            type="name"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={handleSubmit}>
            {loading ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
