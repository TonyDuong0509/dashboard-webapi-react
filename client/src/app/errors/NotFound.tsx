import { Container, Paper, Typography, Divider, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography gutterBottom variant={"h2"} color="black">
        Oops - we couldn't find what your are looking for!
      </Typography>
      <Divider />
      <Button component={Link} to="/" fullWidth sx={{ color: "grey" }}>
        Go back to dashboard
      </Button>
    </Container>
  );
};

export default NotFound;
