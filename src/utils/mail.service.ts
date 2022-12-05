import nodemailer from "nodemailer";

const newtransporter = () => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env["EMAIL_USERNAME"],
            pass: process.env["EMAIL_PASSWORD"],
        },
    });
    return transporter;
};

export const sendWelcomeEmail = async (to: string, name: string) => {
    const transporter = newtransporter();
    const options = {
        from: process.env["EMAIL_USERNAME"],
        to,
        subject: "Thanks for creating an account.",
        html: `Hello ${name}, <p> Thank you for making an account! Please log in to create reminders.</p><p>Thanks, <p>Arwa`,
    };
    await transporter.sendMail(options, (err) => {
        if (err) {
            console.log(err);
        }
    });

    //console.log("Message sent: ", info.response);
};

export const sendNewReminderEmail = async (
    to: string,
    name: string,
    reminder: any
) => {
    const transporter = newtransporter();
    const options = {
        from: process.env["EMAIL_USERNAME"],
        to,
        subject: "New reminder created for " + name,
        html: `Hello ${name}, <p> You have created a reminder! </p> <h4> Reminder Details </h4> <b>Title: </b>${reminder.title}
        <br><b>Description: </b>${reminder.description}<p>Thanks, <p>Arwa`,
    };
    await transporter.sendMail(options, (err) => {
        if (err) {
            console.log(err);
        }
    });
};

export const sendReminderEmail = async (reminder: any) => {
    const transporter = newtransporter();
    const alertDetail = reminder.alertQuantity >= 1 ? " day" : " days";
    const to = reminder.user.email;
    const name = reminder.user.firstName + " " + reminder.user.lastName;
    const options = {
        from: process.env["EMAIL_USERNAME"],
        to,
        subject: "REMINDER for: " + name,
        html: `Hello ${name}, <p> We are emailing you to let you know that you have <b>${reminder.alertQuantity} ${alertDetail}</b> to finish up task: ${reminder.title}. <br> Below are more details about your task.</p> 
        <h4> Reminder Details </h4> <b>Title: </b>${reminder.title}
        <br><b>Description: </b>${reminder.description} <br><b> Deadline Date</b>: ${reminder.deadline}<p>Thanks, <p>Arwa`,
    };
    await transporter.sendMail(options, (err) => {
        if (err) {
            console.log(err);
        }
    });
};
