import { Container, Typography, Button, Grid, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <img
            src="/vietphilimg.jpeg"
            alt="Warehouse"
            className="warehouse-image"
          />
        </Grid>
        <Grid item xs={12} md={8} lg={6}>
          <Container maxWidth="md">
            <Typography variant="h2" gutterBottom color="violet">
              Welcome to VietPhil247
            </Typography>
            <Typography variant="body1" paragraph>
              Chào mừng bạn đến với VietPhil247 - Nơi kết nối dòng chảy của hàng
              hóa từ Việt Nam đến Philippines, Malaysia, và Đài Loan. Tại
              VietPhil247, chúng tôi không chỉ cung cấp dịch vụ vận chuyển đa
              dạng và linh hoạt mà còn mang lại trải nghiệm khách hàng đặc biệt.
              Đội ngũ chuyên gia của chúng tôi cam kết đồng hành với bạn trong
              mọi hành trình vận chuyển. Quý khách có thể dễ dàng liên hệ thông
              qua website{" "}
              <a
                href="https://vietphil247.vn/"
                style={{ fontSize: 24, fontWeight: "bold", color: "red" }}
              >
                VietPhil247.vn
              </a>{" "}
              hoặc{" "}
              <span
                style={{ fontSize: 22, fontWeight: "bold", color: "green" }}
              >
                Hotline/Zalo:0986.518.949
              </span>{" "}
              để nhận được sự hỗ trợ tận tâm và thông tin chi tiết. Với
              VietPhil247, chúng tôi không chỉ là đối tác vận chuyển, mà còn là
              ngôi nhà tin cậy của sự thuận tiện và chất lượng. Hãy kết nối với
              chúng tôi ngay hôm nay để đưa doanh nghiệp của bạn đến một tầm cao
              mới!
            </Typography>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              sx={{ borderColor: "gray", marginBottom: 4 }}
            />
            <Link to="/products">
              <Button variant="contained" color="primary">
                Xem hàng ở kho !
              </Button>
            </Link>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
