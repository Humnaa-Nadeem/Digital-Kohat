import * as Yup from "yup";

export const foodStep1Schema = Yup.object({
  ownerName: Yup.string().required("Owner name required"),
  email: Yup.string().email("Invalid email").required("Email required")
});

export const foodStep2Schema = Yup.object({
  foodCategory: Yup.string().required("Food category required"),
  ownershipType: Yup.string().required("Ownership type required"),
  licenseNumber: Yup.string().notRequired(),
  issueDate: Yup.date().notRequired()
});

export const foodStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Membership required"),
  terms: Yup.boolean().oneOf([true], "Accept terms & conditions")
});
