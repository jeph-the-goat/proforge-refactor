import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';

import {Button, Input, InputTextarea} from "@/components";

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

type ContactFormData = yup.InferType<typeof contactSchema>;

export const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: async (data) => {
      try {
        const validatedData = await contactSchema.validate(data, { abortEarly: false });
        return { values: validatedData, errors: {} };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const fieldErrors: Record<string, any> = {};
          error.inner.forEach((err) => {
            if (err.path) {
              fieldErrors[err.path] = { type: 'validation', message: err.message };
            }
          });
          return { values: {}, errors: fieldErrors };
        }
        return { values: {}, errors: {} };
      }
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // In development mode, display data in alert
    alert(JSON.stringify(data, null, 2));
    // Reset form after submission
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">

        <Controller
          name="fullName"
          control={control}
          render={({ field: { name, ...fieldProps } }) => (
            <Input
              type="text"
              name="fullName"
              labelText="Full Name"
              placeholder="Enter your full name"
              hasErrors={!!errors.fullName}
              errorText={errors.fullName?.message}
              {...fieldProps}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { name, ...fieldProps } }) => (
            <Input
              type="email"
              name="email"
              labelText="Email"
              placeholder="Enter you email address"
              hasErrors={!!errors.email}
              errorText={errors.email?.message}
              {...fieldProps}
            />
          )}
        />
        

      <Controller
        name="message"
        control={control}
        render={({ field: { name, ...fieldProps } }) => (
          <InputTextarea
            name="message"
            labelText="Message"
            placeholder="How can we help you?"
            rows={6}
            hasErrors={!!errors.message}
            errorText={errors.message?.message}
            {...fieldProps}
          />
        )}
      />

      <Button
        type="submit"
        btnText="Send Message"
      />

    </form>
  );
};
