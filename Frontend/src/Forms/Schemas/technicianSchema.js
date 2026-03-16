import * as Yup from "yup";

export const technicianStep1Schema = Yup.object({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  mobile: Yup.string().required("Mobile required"),
  country: Yup.string().required("Country required"),
  cnic: Yup.string().required("CNIC required"),
  password: Yup.string().min(6).required("Password required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password")
});

export const technicianStep2Schema = Yup.object({
  technicianType: Yup.string().required("Type required"),
  serviceMode: Yup.string().required("Service mode required"),
  experience: Yup.string().required("Experience required")
});

export const technicianStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Membership required"),
  paymentMethod: Yup.string().required("Payment method required")
});
