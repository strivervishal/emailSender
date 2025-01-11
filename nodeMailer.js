require("dotenv").config({ path: "./user.env" }); // Load environment variables from .env file
const http = require("http");
const nodemailer = require("nodemailer");

// Create the server
const server = http.createServer((req, res) => {
  // Check the requested endpoint and method
  if (req.url === "/send-email" && req.method === "GET") {
    // Create transporter
    const auth = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER, // Use environment variable
        pass: process.env.EMAIL_PASS, // Use environment variable
      },
    });

    // Define email details
    const receiver = {
      from: process.env.EMAIL_USER,
      to: "vp564141@gmail.com", // Recipient email
      subject: "Node.js Server Test",
      text: "This is a test email sent from Node.js server.",
    };

    // Send email
    auth.sendMail(receiver, (err, emailRes) => {
      if (err) {
        console.error("Error sending email:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Failed to send email. Check the server logs for details.");
      } else {
        console.log("Email sent successfully!");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Email sent successfully!");
      }
    });
  } else if (req.url === "/" && req.method === "GET") {
    // Handle root URL request
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "Welcome to the email sender server! Use /send-email to send an email."
    );
  } else {
    // Handle other endpoints
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found.");
  }
});

// Listen on port 8080
server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
  console.log("To send an email, visit http://localhost:8080/send-email");
});
