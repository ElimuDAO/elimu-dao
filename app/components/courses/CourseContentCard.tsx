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

interface Props {
  data: {
    id: string;
    title: string;
    content: string;
    fileUrl: string;
  };
}

export default function CourseContentCard(props: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = props;
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
      </CardContent>
    </Card>
  );
}
