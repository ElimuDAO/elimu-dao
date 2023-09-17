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

export default function CreateUser() {
  const [open, setOpen] = React.useState(false);
  const [loadingAuth, setLoadingAuth] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [submited, setSubmited] = React.useState(false);
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleWalletConnect = async () => {
    setLoadingAuth(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const recoveredaddress = await signer.getAddress();
    console.log("Wallet connect: ", recoveredaddress);

    setAddress(recoveredaddress);
    //setOpen(true);
    const user = await db.collection("User").record(recoveredaddress).get();
    console.log("User: ", user.data);
    if (!user.data) {
      setOpen(true);
    }
    if (user) {
      setAuthenticated(true);
      setLoadingAuth(false);
    }
  };

  async function handleSubmitUserData() {
    try {
      const user = await db.collection("User").create([address, name, address]);
      console.log(user.data.id);
      setAuthenticated(true);
      setLoadingAuth(false);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setLoadingAuth(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{ textTransform: "none", borderRadius: 1, width: 150 }}
        onClick={handleWalletConnect}
      >
        {!authenticated ? (
          loadingAuth ? (
            <CircularProgress size={20} />
          ) : (
            "Connect wallet"
          )
        ) : (
          "Connected"
        )}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Welcome to elimu DAO</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="yourname"
            label="Enter your name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ textTransform: "none" }} onClick={handleSubmitUserData}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
