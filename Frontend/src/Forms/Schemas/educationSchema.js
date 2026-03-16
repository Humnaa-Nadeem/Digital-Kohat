import * as Yup from "yup";

export const educationStep1Schema = Yup.object({
  accountHolder: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required")
});

export const educationStep2Schema = Yup.object({
  role: Yup.string().required("Role required"),
  instituteType: Yup.string().required("Institute type required"),
  instituteName: Yup.string().required("Institute name required"),
  address: Yup.string().required("Address required"),
  authority: Yup.string().required("Authority required")
});

export const educationStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Membership required"),
  paymentMethod: Yup.string().required("Payment method required")
});
