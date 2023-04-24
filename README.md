                                                        Email Verifier

This is a Node.js application that uses the xemailverify API to verify email addresses.

Installation
Clone this repository to your local machine.
Run npm install to install the dependencies.

Usage
Start the server by running npm start.
Open your web browser and navigate to http://localhost:4000.
Enter an email address to verify and click the "Verify Email" button.
The verification results will be displayed on the page.

How it works
The application consists of two main files:

app.js: The main application file. This is an Express.js server that provides a simple HTML form for entering an email address to verify. When the form is submitted, the server calls the verifyEmail function from email.js to verify the email address and display the results on the page.
email.js: A module that exports a function called verifyEmail that takes an email address as a parameter and returns a Promise that resolves with an object containing the verification results. The verifyEmail function makes an API call to xemailverify.com to verify the email address and parses the response to extract the relevant verification results. The function uses the axios library to make the API call and the node-html-parser library to parse the API response.

Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request.
