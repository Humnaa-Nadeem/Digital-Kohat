import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function updateRequests() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("DSCH");
        const col = db.collection("NewServiceProviderRequests");

        // Update all Education requests to Food
        const result = await col.updateMany(
            { catagory: "Education" },
            { $set: { catagory: "Food", type: "RESTAURANT" } }
        );

        console.log(`Updated ${result.modifiedCount} requests from Education to Food`);
        console.log("Done!");

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await client.close();
    }
}

updateRequests();
