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
    name: string;
    about: string;
    owner: string;
    headline: string;
    feature_image: string;
  };
}

export default function CourseCard(props: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const { data } = props;
  //console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/courses/${data.name}-course${data.id}`);
  };
  const handleExpand = (e: any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={12} lg={3}>
      <Card
        elevation={0}
        onMouseEnter={handleExpand}
        onMouseLeave={handleExpand}
        sx={{
          m: 1,
          border: 1,
          borderRadius: 6,
          borderColor: "#3949ab",
        }}
      >
        <CardActionArea onClick={handleClick}>
          {data.feature_image ? (
            <CardMedia
              component="img"
              height={expanded ? "90" : "200"}
              image={data.feature_image}
              alt={data.name}
            />
          ) : (
            <Box
              sx={{ height: expanded ? 90 : 200, backgroundColor: "#c5cae9" }}
            />
          )}

          <CardContent sx={{ m: 0.5 }}>
            <Typography variant="body1" component="div" gutterBottom noWrap>
              {data.name}
            </Typography>
            <Box sx={{ display: expanded ? "block" : "none", height: 110 }}>
              <Typography variant="caption" component="div" sx={{ m: 0.5 }}>
                {data.headline}
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
        </CardActionArea>
      </Card>
    </Grid>
  );
}
