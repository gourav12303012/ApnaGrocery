import dotenv from 'dotenv';
import { Resend } from 'resend';

// console.log(process.cwd());


// Load environment variables from .env file
dotenv.config();

// Debugging: Check if the RESEND_API key is loaded correctly
console.log("RESEND_API Key:", process.env.RESEND_API || "Not Found");

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: sendTo,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data;

    } catch (error) {
        console.log(error);
    }
}

export default sendEmail;