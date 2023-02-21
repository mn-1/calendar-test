import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Container } from '@mui/material';

const Home: NextPage = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          width: '100%',
          height: '100%',
          mt: '4rem',
        }}
      >
        <Link href='/sample/client4' passHref>
          <Button variant='outlined'>顧客ページ</Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
