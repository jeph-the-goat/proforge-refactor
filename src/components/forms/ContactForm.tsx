'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Button, Input, InputSelect, InputTextarea} from "@/components";

import {DummyOptions} from "@/utils";

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = yup.object({
  fullName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  subject: yup
    .string()
    .required('Subject is required'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters'),
});

export const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: ContactFormData) => {
    alert(JSON.stringify(data, null, 2));
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <Input
            type="text"
            name={field.name}
            labelText="Full Name"
            placeholder="Enter your full name"
            hasErrors={!!errors.fullName}
            errorText={errors.fullName?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            name={field.name}
            labelText="Email"
            placeholder="Enter your email address"
            hasErrors={!!errors.email}
            errorText={errors.email?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="subject"
        control={control}
        render={({ field }) => {
          console.log('Passing to InputSelect - value:', field.value);
          console.log('Passing to InputSelect - onChange:', field.onChange);
          return (
            <InputSelect
              name={field.name}
              options={DummyOptions}
              labelText="Subject"
              placeholder="What’s your message about?"
              value={field.value}
              onValueChange={field.onChange}
              hasErrors={!!errors.subject}
              errorText={errors.subject?.message}
            />
          );
        }}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <InputTextarea
            name={field.name}
            labelText="Message"
            placeholder="How can we help you?"
            rows={6}
            hasErrors={!!errors.message}
            errorText={errors.message?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <Button type="submit" btnText="Send Message" />
    </form>
  );
};