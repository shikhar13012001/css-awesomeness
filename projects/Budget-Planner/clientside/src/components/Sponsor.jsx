import { Button } from '@mui/material';
import { SiGithubsponsors } from 'react-icons/si';

function Demo() {
  return (
    <Button 
      sx={{ width: '20em', marginTop: 20, backgroundColor: 'black',padding:2,color: 'white' }}
      leftIcon={<SiGithubsponsors size={24} color="pink" />}
    >
      Sponsor
    </Button>
  );
}

export default Demo;
