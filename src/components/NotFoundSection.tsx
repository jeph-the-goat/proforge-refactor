"use client";

import React from 'react';

import {ButtonLink, Footer, Header, NotFoundSectionContent} from "@/components";

export const NotFoundSection = () => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    return (
      <>
        <Header/>
        <main>
          <NotFoundSectionContent>
            <ButtonLink
              href="/"
              btnText="Return to Homepage"
            />

            <ButtonLink
              href="#"
              btnText="Explore Features"
              btnColor="dark"
            />
          </NotFoundSectionContent>
        </main>
        <Footer/>
      </>
    )
  }

  return (
    <NotFoundSectionContent>
      <ButtonLink
        href="/Login"
        btnText="Return to Login"
      />

      <ButtonLink
        href="/signup"
        btnText="Sign up"
        btnColor="dark"
      />
    </NotFoundSectionContent>
  );
};
