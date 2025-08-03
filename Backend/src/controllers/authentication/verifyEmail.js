const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../../models/users"); 

// to send verification link to the user's email Id
const sendVerificationEmail = async (req, res) => {
    try{

        if (req.user.emailVerified) 
            return res.status(200).send('Email already verified.');

        // creating verification token
        const token = jwt.sign(
            { 
                _id: req.user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: 600 }
        );

        // creating verification link   
        const verificationLink = `${process.env.FRONTEND_ORIGIN}/profile/account/verify-email?token=${token}`; 

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.EMAIL_USER,     // email
            pass: process.env.EMAIL_PASS      // app password 
            }
        });

        await transporter.sendMail({
            from: '"HackForge" <your_email@gmail.com>',
            to: req.user.emailId,
            subject: "Verify Your Email",
            html: `<h3>Hello ${req.user.username},</h3>
                <p>Click the link below to verify your email:</p>
                <a href="${verificationLink}">${verificationLink}</a>`
        });

        res.status(200).send("Email send successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Email Verification failed")
    }
};

// to verify email
const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const { user } = req;
  
  try {

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded._id);

    if(!user)
      return res.status(400).send("Account does not exist");

    if (user.emailVerified) {
      return res.send('Email already verified.');
    }

    user.emailVerified = true;
    await user.save();

    res.status(200).send('Email verified successfully!');
  } catch (err) {
    console.log(err.message);
    res.status(400).send('Invalid or expired token.');
  }
};


module.exports = { sendVerificationEmail, verifyEmail };