import MobileClientCalendar from '../../components/FullCalendar/Client/MobileClient';
import useMediaQuery from '@mui/material/useMediaQuery';

const Client = () => {
  const matches: boolean = useMediaQuery('(min-width:576px)');
  return (
    <>
      {matches ? (
        <></>
      ) : (
        <>
          <MobileClientCalendar />{' '}
        </>
      )}
    </>
  );
};

export default Client;
