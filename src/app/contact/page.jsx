"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import CustomButton from '@/components/CustomButton';

const ContactUs = () => {
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
        'service_twta0we',  
        'template_w3rjvcm',   
        templateParams,
        'GI8w2Je_e5M6iqUT8' 
      );

      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });

      setIsSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsError(true);
      setIsSubmitting(false);
    }
};

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img
                  src="cover-image.jpg"
                  alt="ContactUs tailwind section"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl bg-blend-multiply bg-indigo-800 object-cover"
                />
                <h1 className="font-manrope text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                  Contact us
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-indigo-600 font-manrope text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>

            <form onSubmit={sendEmail}>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                type="text"
                className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600 text-base font-normal leading-6 outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                type="email"
                className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600 text-base font-normal leading-6 outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Phone Number"
                type="text"
                className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600 text-base font-normal leading-6 outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="py-5 pl-6 rounded-lg mb-5 block bg-transparent border border-gray-200 w-full placeholder:text-gray-600 text-base font-normal leading-6 outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 h-52 resize-none"
              ></textarea>

              <CustomButton text={isSubmitting ? "Sending..." : "Send Message"} padding="0.8rem 3.5rem" />

              {isSuccess && <p className="text-green-500 mt-5">Message sent successfully!</p>}
              {isError && <p className="text-red-500 mt-5">Failed to send message. Please try again later.</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
