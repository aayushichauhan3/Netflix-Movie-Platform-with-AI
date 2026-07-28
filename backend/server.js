import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectToDB } from "./config/db.js";
import User from "./models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("")
});

app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            throw new Error("All Fields are required");
        }

        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res
                .status(400)
                .json({ message: "User already exists." });
        }

        const usernameExists = await User.findOne({ username });

        if (usernameExists) {
            return res
                .status(400)
                .json({ message: "Username is taken, try another name." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const userDoc = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // JSON WEB TOKEN

        if (userDoc) {

            // jwt.sign(payload, secret, options)
            const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "10d", });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
        }

        return res.status(200).json({ user: userDoc, message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });
        if (!userDoc) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isPasswordValid = await bcryptjs.compareSync(
            password,
            userDoc.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // JWT
        if (userDoc) {

            // jwt.sign(payload, secret, options)
            const token = jwt.sign({ id: userDoc._id }, process.env.JWT_SECRET, { expiresIn: "10d", });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
            });
        }

        return res.status(200).json({ user: userDoc, message: "Logged in successfully" });

    } catch (error) {
        console.log("Error in logging in: ", error.message)
        res.status(400).json({ message: error.message });
    }
})

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is runing on http://localhost:${PORT}`)
});