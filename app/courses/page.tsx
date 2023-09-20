"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/polybase_init";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { Box, Grid, LinearProgress, Tab, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import CoursesList from "../components/courses/CoursesList";
import StatBox from "../components/stats/StatBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

export default function Courses() {
  const [value, setValue] = useState("1");
  const [ownedCourses, setOwnedCourses] = useState<any>([]);
  const [joinedCourses, setJoinedCourses] = useState<any>([]);
  const [ownedCertificates, setOwnedCertificates] = useState<any>([]);
  const [contributions, setContributions] = useState<any>([]);
  const [loadingOwnedState, setLoadingOwnedState] = useState("not-loaded");
  const [loadingJoinedState, setLoadingJoinedState] = useState("not-loaded");
  const [loadingOwned, setLoadingOwned] = useState(false);
  const [loadingJoined, setLoadingJoined] = useState(false);

  useEffect(() => {
    loadCoursesData();
  }, []);

  async function loadCoursesData() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const recoveredaddress = await signer.getAddress();
    getOwnedCourses(recoveredaddress);
    getJoinedCourses(recoveredaddress);
    loadCertificates(recoveredaddress);
  }

  const getOwnedCourses = async (address: string) => {
    setLoadingOwned(true); //loading state
    const recordsOwned = await db
      .collection("Course")
      .where("owner", "==", address)
      .sort("id", "desc")
      .get();
    const ownedCourses: any = recordsOwned.data;
    setOwnedCourses(ownedCourses);
    setLoadingOwned(false); //loading state
    setLoadingOwnedState("loaded");
    console.log("ownedCourses", ownedCourses);
  };

  async function loadCertificates(address: string) {
    const recordsOwned = await db
      .collection("Certificate")
      .where("owner_id", "==", address)
      .sort("id", "desc")
      .get();
    const ownedCertificates: any = recordsOwned.data;
    setOwnedCertificates(ownedCertificates);
    console.log("ownedCertificates", ownedCertificates);
  }

  const getJoinedCourses = async (address: string) => {
    setLoadingJoined(true); // loading state
    const recordsAll = await db.collection("Course").sort("id", "desc").get();
    const allCoursed: any = recordsAll.data;
    const filterJoinedCourses = allCoursed.filter((course: any) => {
      return course.data.members?.includes(address);
    });
    setJoinedCourses(filterJoinedCourses);
    setLoadingJoined(false); //loading state
    setLoadingJoinedState("loaded");
  };

  //   const getDataContributions = async (address: string) => {
  //     const contributionRecords = await db
  //       .collection("DataContribution")
  //       .where("contributor", "==", address)
  //       .sort("id", "desc")
  //       .get();

  //     const myContributions: any = contributionRecords.data;
  //     console.log("myContributions", myContributions);
  //     setContributions(myContributions);
  //     setLoadingOwned(false); // loading state
  //     setLoadingOwnedState("loaded");
  //   };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <DrawerHeader />
        <Typography variant="h5" sx={{ mt: -2, mb: 1 }}>
          My Courses
        </Typography>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Grid container>
            <StatBox
              text="Owned courses"
              icon={<BadgeOutlinedIcon sx={{ fontSize: 24 }} />}
              value={ownedCourses.length}
              bgcolor="#e3f2fd"
            />

            <StatBox
              text="Joined courses"
              icon={<GroupsOutlinedIcon sx={{ fontSize: 24 }} />}
              value={joinedCourses.length}
              bgcolor="#c5cae9"
            />

            <StatBox
              text="Finished courses"
              icon={<AssignmentTurnedInOutlinedIcon sx={{ fontSize: 24 }} />}
              value={ownedCertificates.length}
              bgcolor="#dcedc8"
            />
          </Grid>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mr: 3, ml: 3 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab
                  label="Owned"
                  value="1"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
                <Tab
                  label="Joined"
                  value="2"
                  sx={{ textTransform: "none", mr: 4, ml: 4 }}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              {loadingOwned ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
              <CoursesList courses={ownedCourses} />
              {loadingOwnedState === "loaded" && !ownedCourses.length ? (
                <Box sx={{ m: 3 }}>
                  <Typography variant="h6">
                    You do not own any courses yet
                  </Typography>
                </Box>
              ) : null}
            </TabPanel>
            <TabPanel value="2">
              {loadingJoined ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
              <CoursesList courses={joinedCourses} />
              {loadingJoinedState === "loaded" && !joinedCourses.length ? (
                <Box sx={{ m: 3 }}>
                  <Typography variant="h6">
                    You have not joined any courses yet
                  </Typography>
                </Box>
              ) : null}
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Box>
  );
}
