"use client";
import { IcnMail } from "@assets/icons";

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button, Input } from "@/components";

interface SubscribeFormData {
  email: string;
}

const subscribeSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
});

export const SubscribeForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SubscribeFormData>({
    resolver: yupResolver(subscribeSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data: SubscribeFormData) => {
    alert(JSON.stringify(data, null, 2));
    reset(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="c-form" noValidate>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            type="email"
            name={field.name}
            labelText="Email"
            labelIsHidden
            placeholder="Enter your email"
            hasErrors={!!errors.email}
            errorText={errors.email?.message}
            value={field.value}
            onChange={field.onChange}
            inputGroupIcon={<IcnMail />}
            inputGroupText={
              <Button type="submit" btnText="Subscribe" />
            }
          />
        )}
      />
    </form>
  );
};