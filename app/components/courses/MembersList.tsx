import { Grid } from "@mui/material";
import MemberCard from "./MemberCard";

interface Props {
  members: any[];
  userAddress: string;
  courseOwner: string;
  courseId: string;
  courseName: string;
  courseImage: string;
}

export default function MembersList(props: Props) {
  const {
    members,
    userAddress,
    courseOwner,
    courseId,
    courseImage,
    courseName,
  } = props;
  console.log("members:", members);
  return (
    <Grid container spacing={1}>
      {members &&
        members.map((member, i) => (
          <MemberCard
            data={member}
            key={i}
            userAddress={userAddress}
            courseOwner={courseOwner}
            courseId={courseId}
            courseImage={courseImage}
            courseName={courseName}
          />
        ))}
    </Grid>
  );
}
