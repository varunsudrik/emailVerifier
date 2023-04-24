// Import required packages
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve API token from environment variables
let token = process.env.API_TOKEN;
let PORT = process.env.PORT || 4500;

// Declare variables for storing email verification results
let email, reachable, disposable;

// Create a new instance of the Express application
let app = express();

// Middleware configuration
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Set up view engine and view directory
app.set("view engine", "ejs");
app.set("views", "./src/views");

// Serve static files from public directory
app.use(express.static(path.join(path.resolve() + "/public")));

// Route for the home page
app.get("/", (req, res) => {
  res.render("index");
});

// Route for handling form submission and email verification
app.post("/sign_up", async (req, res) => {
  email = req.body.email;

  // Call the email verification API and wait for the response
  const response = await apiCall();

  // Store the email verification results in variables
  reachable = response.reachable;
  disposable = response.disposable;
  email = response.email;

  // Render the output page with the email verification results
  res.render("output", {
    title: "Verification",
    email: email,
    reachable,
    disposable,
  });
});

// Function for making API call to email verification service
const apiCall = () => {
  return axios({
    method: "get",
    url: `https://app.xemailverify.com/api/domain/api-verify/${token}/${email}`,
  })
    .then(function (response) {
      // Extract the relevant data from the API response
      return response.data.response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

// Start the server and listen on port 4000
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
