"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// Replace these credentials with your own email configuration
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'nishantulhare0210@gmail.com',
        pass: 'vwlf pdvq zlgc vztd'
    }
});
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.post('/send-email', (req, res) => {
    //   const { name, email, message } = req.body;
    const mailOptions = {
        from: 'nishantulhare0210@gmail.com',
        to: 'nishantulhare0210@gmail.com',
        subject: 'test mail',
        // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        text: 'Name: snapholic subject test-mail'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
