import * as Yup from "yup";

export const tourismStep1Schema = Yup.object({
  ownerName: Yup.string().required("Owner name required"),
  email: Yup.string().email("Invalid email").required("Email required")
});

export const tourismStep2Schema = Yup.object({
  serviceType: Yup.string().required("Service type required"),
  location: Yup.string().required("Location required")
});

export const tourismStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Membership required")
});
