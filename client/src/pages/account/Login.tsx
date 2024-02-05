import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Paper, Avatar, Typography, TextField, Grid } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { signInUser } from "../../app/slice/accountSlice";
import { useAppDispatch } from "../../app/store/configureStore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || "/");
    } catch (error) {
      console.log(error);
    }
  }

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "77vh",
    },
    formContainer: {
      width: "100%",
      maxWidth: "600px",
      p: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <Container component="main" maxWidth="sm" sx={styles.container}>
      <Paper sx={styles.formContainer}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(submitForm)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="username"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="gray">
                  Đăng nhập chỉ được phân quyền bởi admin, bạn không thể đăng
                  nhập vì tính chất quản trị. Click vào đây để quay trở lại
                  trang chủ. Xin cảm ơn !
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
