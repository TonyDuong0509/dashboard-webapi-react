import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../components/appTextInput/AppTextInput";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import { Customer } from "../../app/models/customer";
import { setCustomer } from "../../app/slice/customerSlice";
import { validationSchema } from "./customerValidation";

interface Props {
  customer?: Customer;
  cancelEdit: () => void;
}

const CustomerForm = ({ customer, cancelEdit }: Props) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    resolver: yupResolver<any>(validationSchema),
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (customer && !isDirty) reset(customer);
  }, [customer, reset]);

  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Customer;
      if (customer) {
        response = await agent.Admin.updateCustomer(data);
      } else {
        response = await agent.Admin.createCustomer(data);
      }
      dispatch(setCustomer(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Chi tiết khách hàng
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput
              control={control}
              name="fullName"
              label="Tên khách hàng"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name="phoneNumber" label="Phone" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput
              control={control}
              name="address"
              label="Địa chỉ"
              multiline={true}
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput
              multiline={true}
              rows={5}
              control={control}
              name="description"
              label="Mô tả"
            />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button onClick={cancelEdit} variant="contained" color="error">
            Huỷ bỏ
          </Button>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="success"
          >
            Thêm
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default CustomerForm;
