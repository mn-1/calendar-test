import type { NextPage } from 'next';

const sitekey = `${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;

const Home: NextPage = () => {
  return (
    <>
      <h4>Test Page</h4>
    </>
  );
};

export default Home;
