import type { Metadata } from 'next';
import {LoginForm} from "@/components";


export const metadata: Metadata = {
  title: 'Login',
  description: '',
  openGraph: {
    title: 'Login',
    description: '',
  },
};

function Login() {
  return (
    <LoginForm/>
  );
}

export default Login 