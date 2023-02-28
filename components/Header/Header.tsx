import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';

const Header = () => {
  let title = 'Sample System';

  return (
    <AppBar position='static' sx={{ height: { xs: '3rem', md: 'auto' } }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '2rem' },
            }}
            fontWeight='bold'
          >
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
