import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}

const LoadingComponent = (props: Props) => {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress size={100} color="success" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {props.message}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingComponent;
