import { Box } from '@mui/material';

const Footer = () => {
  return (
    <>
      <Box
        component='footer'
        sx={{
          textAlign: 'center',
          paddingY: 2,
        }}
      >
        &copy; company.inc
      </Box>
    </>
  );
};

export default Footer;
