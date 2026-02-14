export const ensureSuperAdmin = async (db) => {
    try {
        const ADMINS = db.collection(process.env.A_C);
        const email = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();

        if (!email) {
            console.error("CRITICAL: SUPER_ADMIN_EMAIL not set in .env");
            return;
        }

        const superAdmin = await ADMINS.findOne({ role: "SUPER_ADMIN" });

        if (superAdmin) {
            // Keep the email in sync with .env, but DO NOT store any password hash
            await ADMINS.updateOne(
                { _id: superAdmin._id },
                {
                    $set: { email: email },
                    $unset: { passwordHash: "" } // Ensure no legacy password remains in DB
                }
            );
        } else {
            const newAdmin = {
                name: "Super Admin",
                email: email,
                role: "SUPER_ADMIN",
                status: "Active",
                createdAt: new Date()
                // No passwordHash field created
            };
            await ADMINS.insertOne(newAdmin);
            console.log("Super Admin shell verified.");
        }
    } catch (err) {
        console.error("Error ensuring Super Admin shell:", err);
    }
};
