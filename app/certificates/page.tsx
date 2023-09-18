"use client";
import axios from "axios";
import Web3Modal from "web3modal";
import { db } from "@/lib/polybase_init";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import CertificateList from "../components/certificates/CertificateList";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function OwnedCertificates() {
  const [certificates, setCertificates] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  const [ownedCertificates, setOwnedCertificates] = useState<any>([]);
  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    setLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const recoveredaddress = await signer.getAddress();

    const recordsOwned = await db
      .collection("Certificate")
      .where("owner_id", "==", recoveredaddress)
      .sort("id", "desc")
      .get();
    const ownedCertificates: any = recordsOwned.data;
    setOwnedCertificates(ownedCertificates);
    console.log("ownedCertificates", ownedCertificates);

    //setCertificates(ownedCertificates);
    //ownedCertificates.sort((a, b) => b.id - a.id);
    setLoading(false);
    setLoadingState("loaded");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ m: 1, fontWeight: 700 }}>
            My Certificates
          </Typography>
          <Box sx={{ display: "flex" }}>
            <InfoOutlinedIcon sx={{ m: 1, mr: -0.5, mt: 0.5, fontSize: 20 }} />
            <Typography variant="body2" sx={{ m: 1 }}>
              These are the certificates you have earned from completing
              courses.
            </Typography>
          </Box>
        </Box>

        {loading ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
        <CertificateList certificates={ownedCertificates} />
        {loadingState === "loaded" && !ownedCertificates.length ? (
          <Box sx={{ m: 3 }}>
            <Typography variant="h6">No certificates yet</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
