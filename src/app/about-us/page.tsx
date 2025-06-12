import type { Metadata } from 'next';
import {clsx} from "clsx";

export const metadata: Metadata = {
  title: 'About Us',
  description: '',
  openGraph: {
    title: 'About Us',
    description: '',
  },
};
function About() {
  return (
    <div className={clsx("c-about")}>
      <h1>About Us</h1>
      <p>Learn more about our company.</p>
    </div>
  );
}

export default About