'use client';
import {IcnLock, IcnMail} from "@assets/icons";
import IcnGradientLogin from "@assets/images/icn-gradient-login.svg";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {AuthSocialButtons} from "@/utils";

import {Button, ButtonLink, Input, InputPassword, Separator, AuthSectionForm} from "@/components";

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
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('Login data:', data);
      // TODO: Implement actual login logic here

      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Login successful! (This is just a demo)');
      reset();
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  // const handleSocialLogin = (provider: string) => {
  //   console.log(`${provider} login clicked - implement with chosen auth solution`);
  //   // TODO: Implement social login
  // };

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
            <InputPassword
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
