"use client";
import { useEffect, useState } from "react";
import { useCollection } from "@polybase/react";
import { db } from "@/lib/polybase_init";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Fab,
  LinearProgress,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import CourseBanner from "@/app/components/courses/CourseBanner";
import AboutCourse from "@/app/components/courses/AboutCourse";
import MembersList from "@/app/components/courses/MembersList";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [value, setValue] = useState("1");
  const [userAddress, setUserAddress] = useState("");
  const [courseMembers, setCourseMembers] = useState([]);

  const { slug } = params;
  const id = slug.split("-course")[1];
  console.log("id: ", id);

  //Course metadata
  const courseDetailsQuery = db.collection("Course").where("id", "==", id);
  const courseDetails = useCollection(courseDetailsQuery);
  const course: any = courseDetails.data?.data[0]?.data;

  //get all members in db then filter out those who are not in course member array
  async function getCourseMembers() {
    const allMembers = await db.collection("User").get();
    console.log("allMembers: ", allMembers);
    const allMembersData = allMembers.data;
    console.log("allMembersData: ", allMembersData);
    const courseMembersData = course?.members;
    console.log("courseMembersData: ", courseMembersData);

    const filteredMembers =
      allMembersData &&
      allMembersData.filter(
        (member: any) =>
          courseMembersData && courseMembersData.includes(member.data.address)
      );
    const filteredMembersData = filteredMembers.map(
      (member: any) => member.data
    );
    console.log("filteredMembers: ", filteredMembersData);

    setCourseMembers(filteredMembersData);
  }
  //const allMembersQuery = db.collection("User");
  //const allMembers = db.collection("User").get();
  //const allMembersData = allMembers.data?.data;
  //console.log("allMembersData: ", allMembers);
  //const courseMembersData = course?.members;
  //console.log("courseMembersData: ", courseMembersData);
  // const courseMembersDataAddresses =
  //   courseMembersData && courseMembersData.map((member: any) => member.address);
  // const filteredMembers =
  //   allMembers &&
  //   allMembersData.filter((member: any) =>
  //     courseMembersDataAddresses.includes(member.address)
  //   );
  // console.log("filteredMembers: ", filteredMembers);

  useEffect(() => {
    if (!userAddress) {
      getUserAddress();
    }

    getCourseMembers();
  }, [course]);

  async function getUserAddress() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setUserAddress(address);
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  const router = useRouter();

  const handleBacktoProjects = (e: any) => {
    e.preventDefault();
    router.push(`/courses`);
  };
  const myCoursesButton = (
    <Box sx={{ position: "fixed" }}>
      <Tooltip title="back to courses">
        <Fab
          onClick={handleBacktoProjects}
          color="primary"
          sx={{ mt: 3, mb: -10 }}
        >
          <SchoolOutlinedIcon />
        </Fab>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          typography: "body1",
        }}
      >
        {!course ? <LinearProgress /> : null}
        <TabContext value={value}>
          <Box sx={{ borderColor: "divider", mr: 3, ml: 3 }}>
            <AppBar position="fixed" sx={{ bgcolor: "#fff" }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: 4, mt: 2, mb: -4, color: "#263238" }}
              >
                {course?.name}
              </Typography>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab
                  label="About"
                  value="1"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
                <Tab
                  label="Course Content"
                  value="2"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
                {!course || !userAddress ? null : userAddress ===
                  course?.owner ? (
                  <Tab
                    label="Members"
                    value="3"
                    sx={{ textTransform: "none", mr: 2, ml: 2 }}
                  />
                ) : null}
              </TabList>
            </AppBar>
          </Box>
          <Box sx={{ mt: 6 }}>
            <TabPanel value="1">
              {myCoursesButton}
              <Container maxWidth="lg">
                {course && (
                  <Box>
                    <CourseBanner
                      courseData={course}
                      userAddress={userAddress}
                    />
                    <Box sx={{ m: 3 }}>
                      <AboutCourse
                        courseData={course}
                        userAddress={userAddress}
                      />
                    </Box>
                  </Box>
                )}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              {myCoursesButton}
              <Container maxWidth="md">Something should be here</Container>
            </TabPanel>
            <TabPanel value="3">
              {myCoursesButton}
              <Container maxWidth="md" sx={{ display: "flex" }}>
                <MembersList members={courseMembers} />
              </Container>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
