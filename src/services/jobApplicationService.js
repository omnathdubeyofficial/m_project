import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { setUserDate, setUserTime } from './dateTimeService.js';
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
const prisma = new PrismaClient();

// ✅ Apply for a job (Create)
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email template with Tailwind CSS-inspired inline styles
const generateEmailTemplate = (full_name, position_applied_for) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Your Application</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <table role="presentation" style="width: 100%; max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 40px 32px; text-align: center;">
        <img src="https://via.placeholder.com/150x50?text=Your+Logo" alt="Company Logo" style="max-width: 150px; height: auto;" />
        <h1 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 16px 0 8px;">Thank You, ${full_name}!</h1>
        <p style="color: #e0e7ff; font-size: 16px; margin: 0;">Your application for <strong>${position_applied_for}</strong> has been successfully received.</p>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 32px;">
        <h2 style="color: #1f2937; font-size: 22px; font-weight: 600; margin: 0 0 16px;">We Appreciate Your Interest!</h2>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Dear ${full_name},<br /><br />
          We are thrilled to confirm that your application for the role of <strong>${position_applied_for}</strong> has been successfully submitted. Our team is excited to review your qualifications and experience.
        </p>
        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
          Our hiring team will carefully evaluate your application, and we will reach out to you soon with the next steps. In the meantime, feel free to explore our website or reach out to us if you have any questions.
        </p>
        <a href="https://yourcompanywebsite.com" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px; margin: 16px 0;">Visit Our Website</a>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f8fafc; padding: 24px 32px; text-align: center;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px;">Thank you for choosing to grow with us!</p>
        <p style="color: #6b7280; font-size: 14px; margin: 0;">
          Best regards,<br /><strong>The Hiring Team</strong><br />Your Company Name
        </p>
        <div style="margin-top: 16px;">
          <a href="https://facebook.com" style="text-decoration: none;"><img src="https://img.icons8.com/color/24/000000/facebook-new.png" alt="Facebook" style="display: inline-block; margin: 0 8px;" /></a>
          <a href="https://linkedin.com" style="text-decoration: none;"><img src="https://img.icons8.com/color/24/000000/linkedin.png" alt="LinkedIn" style="display: inline-block; margin: 0 8px;" /></a>
          <a href="https://twitter.com" style="text-decoration: none;"><img src="https://img.icons8.com/color/24/000000/twitter.png" alt="Twitter" style="display: inline-block; margin: 0 8px;" /></a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ✅ Apply for a job (Create)
 const applyForJob = async ({
  full_name,
  email,
  phone_number,
  whatsapp_number,
  position_applied_for,
  cover_letter,
  resume_pdf,
}) => {
  try {
    // Check if an application with the same email or phone number already exists
    const existingApplication = await prisma.job_applications.findFirst({
      where: {
        OR: [{ email }, { phone_number }],
      },
    });

    // If an existing application is found, return an error message
    if (existingApplication) {
      const error_msg = "You have already applied for a job. Please try again after 3 months.";
      console.log(error_msg);
      return { error_msg };
    }

    // If no existing application found, create a new application
    const newApplication = await prisma.job_applications.create({
      data: {
        z_id: uuidv4(),
        full_name,
        email,
        phone_number,
        whatsapp_number,
        position_applied_for,
        cover_letter,
        resume_pdf,
        cdate: setUserDate(),
        ctime: setUserTime(),
      },
    });

    // Send thank-you email
    const mailOptions = {
      from: `"VaeKon InfoTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank You for Applying to ${position_applied_for}`,
      html: generateEmailTemplate(full_name, position_applied_for),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Thank-you email sent to ${email}`);

    const success_msg = "Application submitted successfully.";
    return { ...newApplication, success_msg };
  } catch (error) {
    const error_msg = `Error while applying: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    await prisma.$disconnect();
  }
};

// 📥 Get all job applications
const getAllApplications = async () => {
  try {
    const applications = await prisma.job_applications.findMany({
      orderBy: { cdate: 'desc' },
    });
    return applications;
  } catch (error) {
    const error_msg = `Error fetching applications: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ✏️ Update a job application
const updateApplication = async ({
  z_id,
  full_name,
  email,
  phone_number,
  whatsapp_number,
  position_applied_for,
  cover_letter,
  resume_pdf,
}) => {
  try {
    const updatedApp = await prisma.job_applications.update({
      where: { z_id },
      data: {
        full_name,
        email,
        phone_number,
        whatsapp_number,
        position_applied_for,
        cover_letter,
        resume_pdf,
        udate: setUserDate(),
        utime: setUserTime(),
      },
    });
    const success_msg = 'Application updated successfully.';
    return { ...updatedApp, success_msg };
  } catch (error) {
    const error_msg = `Error while updating application: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

// ❌ Delete a job application
const deleteApplication = async ({ z_id }) => {
  try {
    const deleted = await prisma.job_applications.delete({
      where: { z_id },
    });
    const success_msg = 'Application deleted successfully.';
    return { ...deleted, success_msg };
  } catch (error) {
    const error_msg = `Error while deleting application: ${error}`;
    console.error(error_msg);
    return { error_msg };
  } finally {
    prisma.$disconnect();
  }
};

export {
  applyForJob,
  getAllApplications,
  updateApplication,
  deleteApplication,
};
