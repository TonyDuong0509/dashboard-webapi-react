import { Typography, Grid } from "@mui/material";
import AppTextInput from "../../components/appTextInput/AppTextInput";
import { useFormContext } from "react-hook-form";

const AddressForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Thông tin chuyến đi
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput control={control} name="fullName" label="Full name" />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput
            control={control}
            name="descriptionAddress"
            label="Description address"
            rows={5}
            multiline={true}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
