import type { NextPage } from 'next';
import Link from 'next/link';
import { Button, Container, Grid } from '@mui/material';

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
        <Grid
          container
          direction='column'
          justifyContent='flex-start'
          alignItems='flex-start'
        >
          <Link href='/sample/client4' passHref>
            <Button variant='outlined'>顧客ページver1</Button>
          </Link>
          <Link href='/sample/client1' passHref>
            <Button variant='outlined'>顧客ページver2</Button>
          </Link>
          <Link href='/sample/operator2' passHref>
            <Button variant='outlined'>オペレーターページver1</Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
