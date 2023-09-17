import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import JoinCourse from "./JoinCourse";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";

interface Props {
  courseData: {
    id: string;
    owner: string;
    members: string[];
    about: string;
    name: string;
  };
  userAddress: string;
}
export default function AboutCourse(props: Props) {
  const { courseData, userAddress } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={8}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          About this course
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {courseData.about}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          elevation={0}
          sx={{
            m: 1,
            border: 1,
            borderRadius: 2,
            borderColor: "#3949ab",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", m: 1 }}>
              <GroupsOutlinedIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {courseData.members.length} members
                {courseData.members.length > 1 ? "s" : ""}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", m: 1 }}>
              <AddchartOutlinedIcon />
              <Typography variant="body1" sx={{ ml: 1 }}>
                something
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <JoinCourse courseData={courseData} userAddress={userAddress} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
