import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';

type Props = {
  userType: 'client' | 'operator';
};

const Header = ({ userType, ...otherProps }: Props) => {
  let title: string = '';
  if (userType === 'client') {
    title = 'Sample Client System';
  }
  if (userType === 'operator') {
    title = 'Sample Operator System';
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography variant='h5' fontWeight='bold'>
            {title}
          </Typography>
          <Box component='div' display='flex' flexGrow={1}></Box>
          <Button color='inherit'>マイページ</Button>
          <Button color='inherit'>ログアウト</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
