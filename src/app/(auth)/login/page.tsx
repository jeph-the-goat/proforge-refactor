import type { Metadata } from 'next';
import {LoginForm} from "@/components";
import {getServerSession} from "next-auth";
import {authOptions} from "@lib/auth";
import { Suspense } from 'react';


export const metadata: Metadata = {
  title: 'Login',
  description: '',
  openGraph: {
    title: 'Login',
    description: '',
  },
};

async function Login() {
  const session = await getServerSession(authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}

export default Login 