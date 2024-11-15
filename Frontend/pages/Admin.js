import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const defaultTheme = createTheme();

const AdminLogin = () => {
const [open, setOpen] = useState(false);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [emailError, setEmailError] = useState(false);
const [passwordError, setPasswordError] = useState(false);

const handleOpen = () => {
setOpen(true);
};

const handleClose = () => {
setOpen(false);
};

const handleSubmit = (event) => {
event.preventDefault();
// Perform validation
if (!validateEmail(email)) {
  setEmailError(true);
  return;
}
if (!validatePassword(password)) {
  setPasswordError(true);
  return;
}

// Validation passed, continue with form submission
console.log({
  email,
  password,
});

if (email === 'prakashparaak@gmail.com' && password === '@Smartcliff123') {
  // Redirect to /dashboard/coursespage
  window.location.href = '/dashboard';
}
};

const handleEmailChange = (event) => {
const emailValue = event.target.value;
setEmail(emailValue);
setEmailError(!validateEmail(emailValue));
};

const handlePasswordChange = (event) => {
const passwordValue = event.target.value;
setPassword(passwordValue);
setPasswordError(!validatePassword(passwordValue));
};

const validateEmail = (email) => {
// Email pattern validation
const emailPattern = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
return emailPattern.test(email);
};

const validatePassword = (password) => {
  // Password validation
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return passwordPattern.test(password);
};


return (
<ThemeProvider theme={defaultTheme}>
<Container component="main" maxWidth="xs">
<CssBaseline />
<Typography variant="button" onClick={handleOpen} style={{ cursor: 'pointer' }}>
      Login
    </Typography>

    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin
        </Typography>
        <Button onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          Close
        </Button>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError && !email ? 'Please enter an email' : emailError ? 'Please enter a valid email' : ''}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordError ? 'Please enter a valid password' : ''}
          />

          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </Container>
</ThemeProvider>
);
};

export default AdminLogin;