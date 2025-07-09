import type { Metadata } from 'next';
import {SignUpForm} from "@/components";
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: '',
  openGraph: {
    title: 'Sign Up',
    description: '',
  },
};

function SignUp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpForm/>
    </Suspense>

  );
}

export default SignUp