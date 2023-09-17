import { Grid } from "@mui/material";
import CourseContentCard from "./CourseContentCard";

interface Props {
  contents: any[];
}

export default function CourseContentList(props: Props) {
  const { contents } = props;
  return (
    <Grid container spacing={1}>
      {contents &&
        contents.map((content, i) => (
          <CourseContentCard data={content.data} key={i} />
        ))}
    </Grid>
  );
}
