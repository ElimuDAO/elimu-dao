"use client";
import axios from "axios";
import { useCollection } from "@polybase/react";
import { ethers } from "ethers";
import { db } from "@/lib/polybase_init";
import { useEffect, useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TollIcon from "@mui/icons-material/Toll";

export default function CertificateDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  console.log("slug: ", slug);
  const id = slug.toString().split("-certificate-")[1];
  console.log("id: ", id);

  const [certificate, setCertificate] = useState<any>({});
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCertificate();
  }, []);

  async function loadCertificate() {
    setLoading(true);
    //get item by id
    const certificateRes = await db
      .collection("Certificate")
      .where("id", "==", id)
      .get();
    console.log("certficateRes: ", certificateRes);
    const certificateDetails: any = certificateRes.data[0]?.data;
    console.log("certificateDetails", certificateDetails);

    setCertificate(certificateDetails);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            m: 3,
            p: 2,
            border: 1,
            borderRadius: 4,
            borderColor: "#c5cae9",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2}>
              <Box>
                <Box sx={{ display: "block", m: 1 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 140,
                      height: 140,
                      backgroundColor: "#c5cae9",
                      borderRadius: 4,
                    }}
                    alt={certificate.course_name}
                    src={
                      certificate.course_image ? certificate.course_image : ""
                    }
                  >
                    {!certificate.course_image ? (
                      <SummarizeOutlinedIcon />
                    ) : null}
                  </Avatar>
                  <BeenhereIcon
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      mt: -3,
                      mr: -3,
                      color: "#fff176",
                      fontSize: 40,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h5" sx={{ m: 1, fontWeight: 700 }}>
                  Certificate for {certificate.course_name}
                </Typography>
                <Typography variant="body1" sx={{ m: 1 }}>
                  Certificate ID: {certificate.id}
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Certificate Owner
                  </Typography>
                  <Typography variant="body1">
                    Name: {certificate.owner_name}
                  </Typography>
                  <Typography variant="body1">
                    Address: {certificate.owner_id}
                  </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body1">
                      {certificate.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
