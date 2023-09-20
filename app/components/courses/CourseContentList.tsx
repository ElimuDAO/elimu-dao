import { Grid } from "@mui/material";
import CourseContentCard from "./CourseContentCard";

interface Props {
  contents: any[];
  userAddress: string;
}

export default function CourseContentList(props: Props) {
  const { contents, userAddress } = props;
  return (
    <Grid container spacing={1}>
      {contents &&
        contents.map((content, i) => (
          <CourseContentCard data={content.data} userAddress={userAddress} key={i} />
        ))}
    </Grid>
  );
}
