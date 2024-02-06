import * as yup from "yup";

export const validationSchema = [
  yup.object({
    fullName: yup.string().required("Full name is required"),
    descriptionAddress: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    nameOnCard: yup.string().required(),
  }),
];
