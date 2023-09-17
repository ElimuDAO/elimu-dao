import { Grid } from "@mui/material";
import CourseCard from "./CourseCard";

interface Props {
  courses: any[];
}

export default function CoursesList(props: Props) {
  const { courses } = props;
  return (
    <Grid container spacing={1}>
      {courses &&
        courses.map((course, i) => <CourseCard data={course.data} key={i} />)}
    </Grid>
  );
}
