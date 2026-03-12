import * as Yup from "yup";

export const businessStep1Schema = Yup.object({
  ownerName: Yup.string().required("Owner name required"),
  email: Yup.string().email("Invalid email").required("Email required")
});

export const businessStep2Schema = Yup.object({
  businessName: Yup.string().required("Business name required"),
  businessType: Yup.string().required("Business type required"),
  address: Yup.string().required("Address required")
});

export const businessStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Membership required")
});
