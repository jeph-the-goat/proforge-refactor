'use client';
import {IcnLock, IcnMail} from "@assets/icons";
import IcnGradientLogin from "@assets/images/icn-gradient-login.svg";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {AuthSocialButtons} from "@/utils";

import {Button, ButtonLink, Input, Separator, AuthSectionForm} from "@/components";
import { signIn } from "next-auth/react"
import {useSearchParams, useRouter} from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const LoginForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Clear any previous login errors
      clearErrors("root")
      
      console.log('Login data:', data);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
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
      reset();
      router.replace(callbackUrl);
    } catch (error) {
      console.error('Login error:', error);
      setError("root", {
        type: "manual",
        message: 'An unexpected error occurred. Please try again.'
      });
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    try {
      console.log('OAuth sign in:', provider);
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
      extraClassName="login"
      icon={<IcnGradientLogin/>}
      title="Login to Continue"
      text="Log in to your dashboard and keep building the future of Web3."
      footNote={
        <>
        {"Don't have an account?"} <ButtonLink href="/sign-up" btnText="Sign Up" btnVariant="link"/>
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
              type="password"
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

        <small>
          <ButtonLink href="/reset-password" btnText="Forgot password?" btnVariant="link"/>
        </small>

        <Button
          type="submit"
          btnText={isSubmitting ? "Signing in..." : "Continue"}
          disabled={isSubmitting}
        />
      </form>

      <Separator text="Or login with"/>

      <div className="c-button-container">
        {AuthSocialButtons.map((social, socialIdx) => (
          <Button
            key={socialIdx}
            onClick={() => handleOAuthSignIn(social.label.toLowerCase())}
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
