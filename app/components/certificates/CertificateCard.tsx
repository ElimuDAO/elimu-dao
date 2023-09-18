import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TollIcon from "@mui/icons-material/Toll";

interface Props {
  data: {
    id: string;
    course_id: string;
    course_name: string;
    course_image: string;
    owner_id: string;
    owner_name: string;
    description: string;
  };
}

export default function CertificateCard(props: Props) {
  const router = useRouter();

  const { data } = props;

  console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(
      `/certificates/${data.course_name.toLowerCase()}-certificate-${data.id}`
    );
  };
  return (
    <Grid item xs={12} lg={12}>
      <Card
        elevation={0}
        sx={{
          m: 1,
          border: 1,
          borderRadius: 6,
          borderColor: "#3949ab",
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardContent sx={{ m: 0.5 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "block" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 70,
                    height: 70,
                    backgroundColor: "#c5cae9",
                    borderRadius: 4,
                  }}
                  alt={data.course_name}
                  src={data.course_image ? data.course_image : ""}
                >
                  {!data.course_image ? <SummarizeOutlinedIcon /> : null}
                </Avatar>
                <BeenhereIcon
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    mt: -2,
                    mr: -2,
                    color: "#fff176",
                  }}
                />
              </Box>

              <Box sx={{ display: "block", m: 1 }}>
                <Typography variant="body1" component="div" gutterBottom noWrap>
                  {data.course_name}
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="body1" noWrap>
                      {data.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
