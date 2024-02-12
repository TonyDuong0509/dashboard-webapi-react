import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required(),
  brand: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  COD: yup.string().required(),
  quantity: yup.string().required(),
  weight: yup.string().required(),
  file: yup.mixed().when("pictureUrl", {
    is: (value: string) => !value,
    then: (schema) => schema.required("Cung cấp ảnh ở đây !"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
