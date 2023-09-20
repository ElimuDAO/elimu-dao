import React, { useEffect } from "react";
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
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";

import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

import {
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import "@ututrust/web-components";

interface Props {
  userAddress: string;
  courseData: {
    id: string;
    owner: string;
    name: string;
    members: string[];
  };
}


export default function JoinCourse(props: Props) {
  const { userAddress, courseData } = props;
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [dataValues, setDataValues] = React.useState({});
  const [dataAdded, setDataAdded] = React.useState(false);

  useEffect(() => {}, []);

  // let _window: any = window;
  // let provider = _window.ethereum;
  // let walletAddress = provider.selectedAddress;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getId = (assetIdentifier: string) => {
    // The reason we are creating ether addresses is they are required for endorsements on the
    // chain.
    return ethers
      .id(assetIdentifier)
      .slice(0, 40 + 2)
      .toLowerCase();
  };

  async function addMember() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const recoveredaddress = await signer.getAddress();
    console.log("recovered address", recoveredaddress);
    const newMembersList = [...courseData.members, recoveredaddress];
    console.log("new members list", newMembersList);
    const collectionReference = db.collection("Course");

    try {
      const editData = await collectionReference
        .record(courseData.id)
        .call("updateMembers", [newMembersList]);
      console.log(editData);
      //const projectBlockId = await contract.getProjectBlockId(projectData.id);
      //await contract.addContributor(projectBlockId.toNumber());
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Box>
        {courseData.members.includes(userAddress) ? (
          <Box>
            <x-utu-root source-uuid={userAddress} target-type="provider" target-uuids={getId(courseData.id)}>
              <div className="flex gap-1 justify-between text-sm">
                <x-utu-feedback-form-popup styles={{ marginTop: '100px' }} source-uuid={userAddress} target-uuid={getId(courseData.id)}/>
                <x-utu-feedback-details-popup target-uuid={getId(courseData.id)} source-uuid={userAddress} />
              </div>
              <x-utu-recommendation target-uuid={getId(courseData.id)} />
            </x-utu-root>
          </Box>
        ) : (
          <Box>
          <Button
            fullWidth
            variant="contained"
            onClick={handleClickOpen}
            startIcon={<AddIcon />}
            sx={{
              textTransform: "none",
            }}
          >
            {!loading ? (
              "Join the Course"
            ) : (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            )}
          </Button>
          <x-utu-root source-uuid={userAddress} target-type="provider" target-uuids={getId(courseData.id)}>
            <div className="flex gap-1 justify-between text-sm">
              <x-utu-feedback-details-popup target-uuid={getId(courseData.id)} source-uuid={userAddress} />
            </div>
            <x-utu-recommendation target-uuid={getId(courseData.id)} />
          </x-utu-root>
        </Box>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Join Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Click on the confirm button to join the {courseData.name} course.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={addMember}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
