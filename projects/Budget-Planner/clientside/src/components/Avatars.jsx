import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
export default function LetterAvatars() {
  const { auth } = React.useContext(AuthContext);
  return auth ? (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }} src={`https://avatars.dicebear.com/api/croodles/${auth.username}.svg`}>
        N
      </Avatar>{' '}
      <Chip label={auth.email} variant="outlined" />
    </Stack>
  ) : (
    <Link to="/login">
      <Button variant="contained" sx={{ backgroundColor: 'orange' }}>
        {' '}
        Login{' '}
      </Button>
    </Link>
  );
}
