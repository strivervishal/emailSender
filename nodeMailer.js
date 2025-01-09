const http = require("http");
const nodemailer = require("nodemailer");

// create a brand new server
const server = http.createServer((req, res) => {
  // create trasporter
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 475,
    auth: {
      user: "strivervishal@gmail.com",
      pass: "hxzl knri alcs mzep",
    },
  });

  // create receiver
  const receiver = {
    from: "strivervishal@gmail.com",
    to: "vp564141@gmail.com",
    subject: "node js server test",
    text: "this is a test mail",
  };
  auth.sendMail(receiver, (err, emailRes) => {
    if (err) console.log(err);
    else console.log("success!");
    respose.end();
  });
});
// server listening on port

server.listen(8080);
