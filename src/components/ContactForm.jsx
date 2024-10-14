"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import CustomButton from '@/components/CustomButton';
import Toast from '@/components/Toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { fullName, email, phoneNumber, message } = formData;

    if (!fullName || !email || !message) {
      setIsError(true);
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      from_name: fullName,
      email_id: email,
      phone_number: phoneNumber,
      message,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,  
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,   
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID 
      );

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <input
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        type="text"
        className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        type="email"
        className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600"
      />
      <input
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        type="text"
        className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600 h-52 resize-none"
      ></textarea>

      <CustomButton text={isSubmitting ? "Sending..." : "Send Message"} padding="0.8rem 3.5rem" />

      {isSuccess && <Toast type="success" message="Message sent successfully!" position="bottom-right" />}
      {isError && <Toast type="error" message="Failed to send message. Please try again later." position="bottom-right" />}
    </form>
  );
};

export default ContactForm;
