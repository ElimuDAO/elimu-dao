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
  Grid,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

import CourseBanner from "@/app/components/courses/CourseBanner";
import AboutCourse from "@/app/components/courses/AboutCourse";
import MembersList from "@/app/components/courses/MembersList";
import AddCourseContent from "@/app/components/courses/AddCourseContent";
import CourseContentList from "@/app/components/courses/CourseContentList";

//import "@ututrust/web-components";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [value, setValue] = useState("1");
  const [userAddress, setUserAddress] = useState("");
  const [courseMembers, setCourseMembers] = useState<any>([]);

  const { slug } = params;
  const id = slug.split("-course")[1];
  console.log("id: ", id);

  //Course metadata
  const courseDetailsQuery = db.collection("Course").where("id", "==", id);
  const courseDetails = useCollection(courseDetailsQuery);
  const course: any = courseDetails.data?.data[0]?.data;

  //Course content
  const contentQuery = db.collection("Content").where("course_id", "==", id);
  const contentCollection = useCollection(contentQuery);
  const postedContent: any = contentCollection.data?.data;
  console.log("Course Content : ", postedContent);

  //get all members in db then filter out those who are not in course member array
  async function getCourseMembers() {
    const allMembers = await db.collection("User").get();
    console.log("allMembers: ", allMembers);
    const allMembersData = allMembers.data;
    console.log("allMembersData: ", allMembersData);
    const courseMembersData = course?.members;
    console.log("courseMembersData: ", courseMembersData);

    const filteredMembers: any =
      allMembersData &&
      allMembersData.filter(
        (member: any) =>
          courseMembersData && courseMembersData.includes(member.data.address)
      );
    const filteredMembersData: any = filteredMembers.map(
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

                <Tab
                  label="Members"
                  value="3"
                  sx={{ textTransform: "none", mr: 2, ml: 2 }}
                />
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
                        courseContent={postedContent}
                      />
                    </Box>
                    {/* <x-utu-root api-key="<place your utu api key here>">
                      <ul>
                        {offerIds.map((offerId) => (
                          <li key={offerId}>
                            <x-utu-recommendation target-uuid={offerId} />
                          </li>
                        ))}
                      </ul>
                    </x-utu-root> */}
                  </Box>
                )}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              {myCoursesButton}
              <Container maxWidth="md">
                {course && userAddress && course.owner === userAddress ? (
                  <Box sx={{ m: 3 }}>
                    <AddCourseContent courseId={course.id} />
                  </Box>
                ) : null}
                {postedContent && postedContent.length > 0 ? (
                  <CourseContentList contents={postedContent} />
                ) : (
                  <Grid alignItems="center">
                    <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
                      This course has no content yet
                    </Typography>
                  </Grid>
                )}
              </Container>
            </TabPanel>
            <TabPanel value="3">
              {myCoursesButton}
              <Container maxWidth="md" sx={{ display: "flex" }}>
                {!course || !userAddress ? null : courseMembers.length > 0 ? (
                  <MembersList
                    members={courseMembers}
                    userAddress={userAddress}
                    courseOwner={course.owner}
                    courseId={course.id}
                    courseImage={course.feature_image}
                    courseName={course.name}
                  />
                ) : (
                  <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
                    This course has no members yet
                  </Typography>
                )}
              </Container>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Box>
  );
}
