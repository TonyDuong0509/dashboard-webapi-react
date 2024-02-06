import { Container, Grid, Typography, Link } from "@mui/material";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Địa chỉ kho tại TPHCM
            </Typography>
            <Typography
              variant="body2"
              color="black"
              sx={{ fontWeight: "bold" }}
            >
              Address: 203 đường số 11 - phường Bình Hưng Hoà - quận Bình Tân -
              TPHCM
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Liên hệ
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="tel:+123456789">Hotline/Zalo: 0986.518.949</Link>
              <br />
              <Link href="https://vietphil247.vn" target="_blank">
                Website: vietphil247.vn
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Theo dõi chúng tôi
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <Link href="https://www.facebook.com/VietPhilvn" target="_blank">
                Facebook
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
