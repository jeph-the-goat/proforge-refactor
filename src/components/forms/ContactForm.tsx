'use client';

import React, { useState } from 'react';
import * as yup from 'yup';

import {Button, Input, InputTextarea} from "@/components";

// Interface for form data
interface ContactFormData {
  fullName: string;
  email: string;
  message: string;
}

// Validation schema with yup
const contactSchema = yup.object({
  fullName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters'),
});

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleTextareaChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await contactSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const fieldErrors: Partial<ContactFormData> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isValid = await validateForm();
    
    if (isValid) {
      // In development mode, display data in alert
      alert(JSON.stringify(formData, null, 2));
      
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form" noValidate>
      <Input
        type="text"
        name="fullName"
        labelText="Full Name"
        placeholder="Enter your full name"
        hasErrors={!!errors.fullName}
        errorText={errors.fullName}
        value={formData.fullName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('fullName', e.target.value)}
      />

      <Input
        type="email"
        name="email"
        labelText="Email"
        placeholder="Enter your email address"
        hasErrors={!!errors.email}
        errorText={errors.email}
        value={formData.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('email', e.target.value)}
      />

      <InputTextarea
        name="message"
        labelText="Message"
        placeholder="How can we help you?"
        rows={6}
        hasErrors={!!errors.message}
        errorText={errors.message}
        value={formData.message}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextareaChange('message', e.target.value)}
      />

      <Button
        type="submit"
        btnText="Send Message"
      />
    </form>
  );
};
