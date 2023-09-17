import { Box, Divider, Grid, Typography } from "@mui/material";

interface Props {
  text: string;
  icon: any;
  value: number;
  bgcolor: string;
}

export default function StatBox(props: Props) {
  //const router = useRouter();

  const { text, icon, value, bgcolor } = props;

  return (
    <Grid item xs={12} md={4}>
      <Box sx={{ m: 2, border: 1, borderRadius: 5, borderColor: "#2979ff" }}>
        <Box
          sx={{
            m: 1,
            border: 1,
            borderRadius: 4,
            borderColor: "#2979ff",
            backgroundColor: bgcolor,
            p: 2,
          }}
        >
          <Box sx={{ display: "flex" }}>
            {icon}
            <Typography
              variant="body1"
              sx={{ color: "#1a237", fontWeight: 700, ml: 1 }}
            >
              {text}
            </Typography>
          </Box>

          <Typography variant="h3" sx={{ color: "#1a237", fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
