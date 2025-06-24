import type { Metadata } from 'next';
import {ResetPasswordForm} from "@/components";


export const metadata: Metadata = {
  title: 'Reset Password',
  description: '',
  openGraph: {
    title: 'Reset Password',
    description: '',
  },
};

function ResetPassword() {
  return (
    <ResetPasswordForm/>
  );
}

export default ResetPassword