"use client";
import { useCollection } from "@polybase/react";
import { db } from "@/lib/polybase_init";

import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import CoursesList from "./components/courses/CoursesList";

export default function Home() {
  const query = db.collection("Course").sort("id", "desc");
  const { data } = useCollection(query);

  const courses: any = data?.data;

  console.log(courses);
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        <Box
          sx={{
            p: 1.7,
            backgroundColor: "#fff",
            background:
              "linear-gradient(135deg, #63f7c955 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #63f7c9 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #63f7c955 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #63f7c9 25%, #ffffff 25%) 0px 0/ 20px 20px",
            backgroundSize: "44px 44px",
          }}
        />

        <Box>
          <Grid
            container
            height="62vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Typography
              variant="h2"
              sx={{
                backgroundImage: "linear-gradient(200deg, #00e5ff,#1b5e20)",
                backgroundClip: "text",
                textFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Decentralized
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 600,
              }}
            >
              People-Powered Science
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 3 }}>
              Discover, teach, learn and and get rewarded for
            </Typography>
            <Typography variant="h6" color="text.secondary">
              contributing to research projects
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ p: 5 }}>
          <Grid
            container
            height="12vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ mt: 2 }}
          >
            <Typography variant="h5">Explore Courses</Typography>
            <Divider
              sx={{
                width: "74px",
                height: "3px",
                mt: 1.5,
                backgroundColor: "#0097a7",
              }}
            />
          </Grid>
          <br />
          <br />
          <CoursesList courses={courses} />
        </Box>
        <Box
          sx={{
            p: 1.7,
            backgroundColor: "#fff",
            background:
              "linear-gradient(135deg, #63f7c955 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(225deg, #63f7c9 25%, transparent 25%) -10px 0/ 20px 20px, linear-gradient(315deg, #63f7c955 25%, transparent 25%) 0px 0/ 20px 20px, linear-gradient(45deg, #63f7c9 25%, #ffffff 25%) 0px 0/ 20px 20px",
            backgroundSize: "44px 44px",
            transform: "rotate(180deg)",
          }}
        />
      </Box>
    </Box>
  );
}
