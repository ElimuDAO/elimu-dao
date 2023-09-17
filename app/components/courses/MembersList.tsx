import { Grid } from "@mui/material";
import MemberCard from "./MemberCard";

interface Props {
  members: any[];
}

export default function MembersList(props: Props) {
  const { members } = props;
  console.log("members:", members);
  return (
    <Grid container spacing={1}>
      {members &&
        members.map((member, i) => <MemberCard data={member} key={i} />)}
    </Grid>
  );
}
