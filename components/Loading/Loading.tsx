import { CircularProgress, Backdrop } from '@mui/material';

type Props = {
  isLoadingOpen: boolean;
};

export const Loading = (props: Props) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1, //drawer: 1200
      }}
      open={props.isLoadingOpen}
    >
      <CircularProgress color='secondary' />
    </Backdrop>
  );
};
