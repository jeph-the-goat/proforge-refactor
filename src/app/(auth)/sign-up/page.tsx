import type { Metadata } from 'next';
import {SignUpForm} from "@/components";

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
    <SignUpForm/>
  );
}

export default SignUp