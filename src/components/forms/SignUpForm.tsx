'use client';
import {IcnLock, IcnMail} from "@assets/icons";
import IcnGradientUserPlus from "@assets/images/icn-gradient-user-plus.svg";

import React from 'react';
import Link from "next/link";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AuthSocialButtons } from "@/utils";

import { Button, ButtonLink, Input, Separator, AuthSectionForm, InputRadioCheckbox } from "@/components";
import {useRouter, useSearchParams} from "next/navigation";
import {signIn} from "next-auth/react";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

const signupSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 character'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), ""], 'Passwords must match'),
  terms: yup
    .boolean()
    .required('You must accept the terms and policies to continue')
});

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: '',
      terms: false
    }
  });

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const onSubmit = async (data: SignUpFormData) => {
    try {
      // Clear any previous login errors
      clearErrors("root")

      if (data.password !== data.passwordConfirmation) {
        console.error('Passwords do not match');
        setError("passwordConfirmation", {
          type: "manual",
          message: 'Passwords do not match'
        });
        return;
      }

      // First register the user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (!res?.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Registration failed:', errorData);

          // Set a root-level error for login failures
          setError("root", {
            message: errorData.error
          });
          return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl,
      });

      console.log('SignIn result:', result); // Debug log

      // Check if login was successful
      if (!result?.ok || result?.error) {
        // Handle different error types
        let errorMessage = 'Invalid email or password';

        if (result?.error === 'CredentialsSignin') {
          errorMessage = 'Invalid email or password';
        } else if (result?.error) {
          errorMessage = result.error;
        }

        // Set a root-level error for login failures
        setError("root", {
          type: "manual",
          message: errorMessage
        });

        return;
      }

      // Only redirect if login was successful
      console.log('Login successful, redirecting to:', callbackUrl);
      router.replace(callbackUrl)

    } catch (error) {
      console.error('Sign Up error:', error);
    }
  };

  const handleOAuthSignUp = async (provider: string) => {
    try {
      await signIn(provider, {
        callbackUrl,
        redirect: true
      })
    } catch (error) {
      console.error("OAuth sign in error:", error)
    }
  }

  return (
    <AuthSectionForm
      extraClassName="signup"
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
        {/* Display login error if exists */}
        {errors.root && (
          <div className="error-message" style={{
            color: 'red',
            marginBottom: '1rem',
            padding: '0.5rem',
            backgroundColor: '#fee',
            border: '1px solid #fcc',
            borderRadius: '4px'
          }}>
            {errors.root.message}
          </div>
        )}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              type="text"
              name={field.name}
              labelText="Name"
              placeholder="Enter your full name"
              hasErrors={!!errors.name}
              errorText={errors.name?.message}
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
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              type={"password"}
              name={field.name}
              labelText="Password"
              placeholder="Enter your password"
              inputGroupIcon={<IcnLock/>}
              hasErrors={!!errors.password}
              errorText={errors.password?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="passwordConfirmation"
          control={control}
          render={({ field }) => (
            <Input
              type="password"
              name={field.name}
              labelText="Confirm Password"
              placeholder="Confirm your password"
              inputGroupIcon={<IcnLock/>}
              hasErrors={!!errors.passwordConfirmation}
              errorText={errors.passwordConfirmation?.message}
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
            onClick={() => handleOAuthSignUp(social.label.toLowerCase())}
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