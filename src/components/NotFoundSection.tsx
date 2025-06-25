"use client";
import React from 'react';

import {ButtonLink, Footer, Header, NotFoundSectionContent} from "@/components";

export const NotFoundSection = () => {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return (
      <>
        <Header/>
        <main>
          <NotFoundSectionContent extraClassName="is-authenticated">
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
    <NotFoundSectionContent extraClassName="not-authenticated">
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
