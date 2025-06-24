'use client';
import {IcnMail} from "@assets/icons";
import IcnGradientLock from "@assets/images/icn-gradient-lock.svg";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Button, ButtonLink, Input, AuthSectionForm} from "@/components";

interface ResetPasswordFormData {
  email: string;
}

const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
});

export const ResetPasswordForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      console.log('Reset data:', data);
      // TODO: Implement actual login logic here

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Reset successful! (This is just a demo)');
      reset();
    } catch (error) {
      console.error('Reset error:', error);
      alert('Reset failed. Please try again.');
    }
  };

  return (
    <AuthSectionForm
      extraClassName="reset-password"
      icon={<IcnGradientLock/>}
      title="Reset Your Password"
      text="Enter your email, and we’ll send you instructions to create a new password."
      footNote={
        <>
          Remember your password? <ButtonLink href="/login" btnText="Back to Login" btnVariant="link"/>
        </>
      }
    >

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              name={field.name}
              labelText="Email"
              placeholder="Enter your registered email"
              inputGroupIcon={<IcnMail/>}
              hasErrors={!!errors.email}
              errorText={errors.email?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Button
          type="submit"
          btnText={isSubmitting ? "Sending..." : "Send Reset Instructions"}
          disabled={isSubmitting}
        />
      </form>

    </AuthSectionForm>
  );
};
