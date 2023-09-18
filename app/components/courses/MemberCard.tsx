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
import AwardCertificate from "../certificates/AwardCertificate";

interface Props {
  data: {
    id: string;
    name: string;
    bio: string;
    imageUrl: string;
    address: string;
  };
  userAddress: string;
  courseOwner: string;
  courseId: string;
  courseName: string;
  courseImage: string;
}

export default function MemberCard(props: Props) {
  const { data, courseOwner, userAddress, courseId, courseImage, courseName } =
    props;
  console.log("user data:", data);
  async function generateCertificate() {
    //generate certificate
  }

  return (
    <Card
      elevation={0}
      sx={{
        m: 1,
        p: 1,
        width: "100%",
        border: 1,
        borderRadius: 3,
        borderColor: "#0097a7",
      }}
    >
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
        {userAddress === courseOwner ? (
          <AwardCertificate
            courseId={courseId}
            courseName={courseName}
            courseImage={courseImage}
            owner_id={data.id}
            owner_name={data.name}
          />
        ) : null}
      </CardActions>
    </Card>
  );
}
