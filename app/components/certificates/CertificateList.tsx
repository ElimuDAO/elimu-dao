import { Grid, Box } from "@mui/material";
import CertificateCard from "./CertificateCard";

interface Props {
  certificates: any[];
}

export default function CertificateList(props: Props) {
  const { certificates } = props;
  return (
    <Grid container spacing={1}>
      <Box
        sx={{
          width: "100%",
          m: 3,
          p: 2,
          border: 1,
          borderRadius: 4,
          borderColor: "#c5cae9",
        }}
      >
        {certificates.map((certificate, i) => (
          <CertificateCard data={certificate.data} key={i} />
        ))}
      </Box>
    </Grid>
  );
}
