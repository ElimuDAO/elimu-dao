import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

import { ethers } from "ethers";

interface Props {
  data: {
    id: string;
    title: string;
    content: string;
    fileUrl: string;
  };
  userAddress: string;
}

export default function CourseContentCard(props: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const getId = (assetIdentifier: string) => {
    // The reason we are creating ether addresses is they are required for endorsements on the
    // chain.
    return ethers
      .id(assetIdentifier)
      .slice(0, 40 + 2)
      .toLowerCase();
  };


  const { data, userAddress } = props;
  //console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    //router.push(`/courses/${data.name}-course${data.id}`);
  };
  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
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
      <CardContent sx={{ m: 0.5 }}>
        <Typography variant="h5" component="div" gutterBottom noWrap>
          {data.title}
        </Typography>

        {data.fileUrl ? (
          <CardActionArea onClick={handleClick}>
            <CardMedia
              component="img"
              height={expanded ? "90" : "200"}
              image={data.fileUrl}
              alt={data.title}
            />
          </CardActionArea>
        ) : null}
        <Box sx={{}}>
          <Typography variant="body1" component="div" sx={{ m: 0.5 }}>
            {data.content}
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={7}>
            <Box sx={{ display: "flex" }}></Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                component="div"
                noWrap
                sx={{ m: 0.5 }}
              ></Typography>
            </Box>
          </Grid>
        </Grid>
        <x-utu-root source-uuid={userAddress} target-type="provider" target-uuids={getId(data.id)}>
          <div className="flex gap-1 justify-between text-sm">
            <x-utu-feedback-form-popup styles={{ marginTop: '100px' }} source-uuid={userAddress} target-uuid={getId(data.id)}/>
          </div>
          <x-utu-recommendation target-uuid={getId(data.id)} />
        </x-utu-root>
      </CardContent>
    </Card>
  );
}
