import * as React from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TollIcon from "@mui/icons-material/Toll";
import Typography from "@mui/material/Typography";

import HowToVoteIcon from "@mui/icons-material/HowToVote";

interface Props {
  data: {
    id: string;
    name: string;
    bio: string;
    imageUrl: string;
    address: string;
  };
}

export default function MemberCard(props: Props) {
  const { data } = props;
  console.log("user data:", data);
  async function generateCertificate() {
    //generate certificate
  }

  return (
    <Card sx={{ m: 2, p: 1, borderRadius: 2, width: "100%" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={1} lg={1}>
            <Avatar aria-label="validator" sx={{ bgcolor: "#37474f" }}>
              {data.name.substring(0, 1)}
            </Avatar>
          </Grid>
          <Grid item sm={11} lg={11}>
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body1">{data.bio}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ ml: 1 }}>
        <Button variant="outlined" sx={{ textTransform: "none" }}>
          Award Certificate
        </Button>
      </CardActions>
    </Card>
  );
}
