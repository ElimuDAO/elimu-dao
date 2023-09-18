import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/polybase_init";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";

import AddBoxIcon from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";

import ImageUpload from "../util/ImageUpload";
import { CardMedia, Paper } from "@mui/material";
import { generateUniqueId } from "@/app/components/util/GenerateUniqueId";
import FileUpload from "../util/FileUpload";

interface Props {
  courseId: string;
}

export default function AddCourseContent(props: Props) {
  const { courseId } = props;

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [fileUrl, setFileUrl] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function SubmitCourseContent() {
    setLoading(true);
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.BrowserProvider(connection);
    // const signer = await provider.getSigner();
    // const recoveredaddress = await signer.getAddress();
    const collectionReference = db.collection("Content");
    //  let contract = new ethers.Contract(
    //    CitizenScienceRewardsAddress,
    //    CitizenScienceRewards.abi,
    //    signer
    //  );
    try {
      const courseDetails = await collectionReference.create([
        generateUniqueId(),
        courseId,
        title,
        content,
        fileUrl,
      ]);
      console.log(courseDetails.data.id);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{
          textTransform: "none",

          m: 2,
        }}
      >
        Add Course Content
      </Button>
      <Dialog maxWidth="lg" open={open} onClose={handleClose}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Container maxWidth="sm" sx={{ mt: -6 }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              sx={{ ml: 2, flex: 1, fontWeight: 600 }}
              variant="h5"
              component="div"
            >
              Add Course Content
            </Typography>

            <Grid container>
              <TextField
                variant="outlined"
                label="Title"
                fullWidth
                sx={{ mt: 2 }}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                variant="outlined"
                label="Content"
                fullWidth
                multiline
                rows={8}
                sx={{ mt: 2 }}
                onChange={(e) => setContent(e.target.value)}
              />
              <Box sx={{ width: "100%" }}>
                <FileUpload setFileUri={setFileUrl} />
              </Box>
              <Button
                fullWidth
                variant="contained"
                component="label"
                sx={{ textTransform: "none", mt: 2, mb: 3 }}
                onClick={SubmitCourseContent}
                disabled={!title || !content}
              >
                {loading ? (
                  <CircularProgress size={25} sx={{ color: "#fff" }} />
                ) : (
                  "Add Content"
                )}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </div>
  );
}
