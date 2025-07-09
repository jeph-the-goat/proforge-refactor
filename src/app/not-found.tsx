import type { Metadata } from 'next';
import React from "react";
import {NotFoundSection} from "@/components";

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: '',
  openGraph: {
    title: 'Page Not Found',
    description: '',
  },
};

function NotFound() {
  return (
    <NotFoundSection/>
  );
}

export default NotFound 