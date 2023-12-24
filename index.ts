// src/index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import nodemailerHandlebars from 'nodemailer-express-handlebars';
import expressHandlebars from 'express-handlebars';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Replace these credentials with your own email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nishantulhare0210@gmail.com',
    pass: 'vwlf pdvq zlgc vztd'
  }
});

transporter.use('compile', nodemailerHandlebars({
    viewEngine: {
      extname: '.hbs',
      layoutsDir: './templates', // Specify the path to your templates folder
      defaultLayout: 'email-template',
      partialsDir: './templates', // Optional: Specify the path to partials
    },
    viewPath: './templates', // Specify the path to your templates folder
    extName: '.hbs',
  }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
  });

app.post('/send-email', (req: Request, res: Response) => {
//   const { name, email, message } = req.body;

  const mailOptions = {
    from: 'nishantulhare0210@gmail.com',
    to: 'nishantulhare0210@gmail.com',
    subject: 'test mail',
    // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    template: 'email-template',
    context: {
    name: 'Nishant Ulhare',
    message: 'This is a sample message.',
  },
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



