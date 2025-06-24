'use client';
import { IcnLock, IcnMail} from "@assets/icons";
import IcnGradientUserPlus from "@assets/images/icn-gradient-user-plus.svg";

import React from 'react';
import Link from "next/link";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthSocialButtons } from "@/utils";

import { Button, ButtonLink, Input, Separator, AuthSectionForm, InputRadioCheckbox } from "@/components";

interface SignUpFormData {
  email: string;
  terms: boolean;
}

const signupSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  terms: yup
    .boolean()
    .required('You must accept the terms')
    .oneOf([true], 'You must accept the terms and privacy policy')
});

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      terms: false
    }
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log('SignUp data:', data);
      // TODO: Implement actual signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Sign Up successful! (This is just a demo)');
      reset();
    } catch (error) {
      console.error('Sign Up error:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} signup clicked - implement with chosen auth solution`);
    // TODO: Implement social signup
  };

  return (
    <AuthSectionForm
      icon={<IcnGradientUserPlus/>}
      title="Ready to Build?"
      text="Sign up and start building today."
      footNote={
        <>
          Already have an account? <ButtonLink href="/login" btnText="Login" btnVariant="link"/>
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
              placeholder="Enter your email"
              inputGroupIcon={<IcnMail/>}
              hasErrors={!!errors.email}
              errorText={errors.email?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <InputRadioCheckbox
              id="terms_agree"
              name={field.name}
              hasErrors={!!errors.terms}
              errorText={errors.terms?.message}
              checked={field.value}
              onChange={field.onChange}
            >
              <span>I agree to the </span> <Link href="#">Terms and Privacy Policy</Link>
            </InputRadioCheckbox>
          )}
        />

        <Button
          type="submit"
          btnText={isSubmitting ? "Signing up..." : "Continue with Email"}
          disabled={isSubmitting}
        />
      </form>

      <Separator text="Or sign up with"/>

      <div className="c-button-container">
        {AuthSocialButtons.map((social, socialIdx) => (
          <Button
            key={socialIdx}
            btnText={social.label}
            title={social.ariaLabel}
            btnColor="white"
            icon={social.icon}
            iconPlacement="left"
          />
        ))}
      </div>
    </AuthSectionForm>
  );
};