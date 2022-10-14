import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {LoadingButton} from "@mui/lab"
import {LoginHandler} from '../api/user'
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Backdrop from "../sections/@auth/Backdrop"
import { ToastContainer,toast} from 'react-toastify'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
       Budget Planner
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const {setAuth} = React.useContext(AuthContext);
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleOpen();
    const data = new FormData(event.currentTarget);
    const obj={
      email: data.get('email'),
      password: data.get('password'),
    }
   console.log(obj)
    if(obj.email===''||obj.password===''){
      toast.error("Please fill all the fields")
    handleClose();
      return;
    }

 const details=await LoginHandler({
      email: data.get("email"),
      password: data.get("password"),
      history,
      setAuth
    });
if(!details)
{
  toast.error("Invalid Credentials")
  handleClose();
  return;
}
    toast.success("Login Successful")
    handleClose();

  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Backdrop open={open} setOpen={setOpen} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://ouch-cdn2.icons8.com/z-6yjoD8ntEne6VU0r0Cz_qAivqVlQyYHpsE8foxUVs/rs:fit:627:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTk4/LzgxMTE0Y2E2LTBh/NjktNGZkOS04Y2U2/LWRjNzRhNDNjNDNi/ZS5zdmc.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <LoadingButton fullWidth size="large" type="submit" variant="contained" >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}