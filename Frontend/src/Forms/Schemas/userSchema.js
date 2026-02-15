import * as Yup from "yup";

export const userSchema = Yup.object({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  country: Yup.string().required("Country required"),
  city: Yup.string().required("City required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  phone: Yup.string().notRequired()
});
