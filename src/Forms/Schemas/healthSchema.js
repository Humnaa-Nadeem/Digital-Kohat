import * as Yup from "yup";

export const healthStep1Schema = Yup.object({
  fullName: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  mobile: Yup.string().required("Mobile required")
});

export const healthStep2Schema = Yup.object({
  accountRole: Yup.string().required("Account role required"),
  entityType: Yup.string().required("Entity type required"),
  ownershipType: Yup.string().required("Ownership type required"),
  licenseNumber: Yup.string().required("License number required"),
  issuingAuthority: Yup.string().required("Issuing authority required"),
  issueDate: Yup.date().required("Issue date required"),
  expiryDate: Yup.date().required("Expiry date required")
});

export const healthStep3Schema = Yup.object({
  membershipPlan: Yup.string().required("Select membership"),
  paymentMethod: Yup.string().required("Select payment method")
});
