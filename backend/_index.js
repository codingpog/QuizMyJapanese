import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = 5000;
dotenv.config();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .insert({ username: username, password: password });
  if (error) {
    res.status(500).send("Error registering user");
    console.error(error);
  } else {
    res.status(201).send("User registered successfully");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase
    .from("users")
    .select("id, username")
    .eq("username", username)
    .eq("password", password);
  if (error) {
    res.status(500).send("Error logging in");
    console.error(error);
  } else {
    if (data.length > 0) {
      res.status(200).send("Login successful");
    } else {
      res.status(400).send("Invalid credentials");
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
