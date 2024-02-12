import * as yup from "yup";

export const validationSchema = yup.object({
  fullName: yup.string().required(),
  phoneNumber: yup.string().required(),
  address: yup.string().required(),
  description: yup.string().required(),
});
