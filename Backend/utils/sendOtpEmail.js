import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (userEmail, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "DSCH <onboarding@resend.dev>",
            to: ["awaisanwarktk@gmail.com"],
            subject: "Your OTP for Account Registration",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #222;">
          <h2 style="color: #0d6efd;">DSCH Email Verification</h2>

          <p>Hello 👋</p>

          <p>Your OTP for account registration is:</p>

          <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; padding: 12px 18px; background: #f4f4f4; display: inline-block; border-radius: 8px;">
            ${otp}
          </div>

          <p style="margin-top: 15px;">
            This OTP will expire in <b>10 minutes</b>.
          </p>

          <p style="color: #888;">
            If you didn’t request this, ignore this email.
          </p>

          <hr style="margin: 20px 0;" />

          <p style="font-size: 12px; color: #999;">
            DSCH System Auto Email - Do not reply.
          </p>
        </div>
      `,
        });

        if (error) {
            console.log("Resend Email Error:", error);
            return false;
        }

        return true;
    } catch (err) {
        console.log("sendOtpEmail Error:", err.message);
        return false;
    }
};
