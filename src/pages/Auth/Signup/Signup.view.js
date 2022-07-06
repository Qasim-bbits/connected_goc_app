import React, { Fragment } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
const themeLight = createTheme({
  palette: {
    background: {
      default: "#D3D3D3"
    }
  }
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

export default function SignupView(props) {
  

  return (
    <ThemeProvider theme={themeLight}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

         <img src= {require("../../../assets/logo/logo_blue.svg").default} alt="Blinkay Logo." style={{margin : 50, maxWidth : 250 }}/>
          <Typography variant="h6" component="h6">
            What is your email address?
         </Typography>
          <Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 6 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Type your email address"
              name="email"
              autoComplete="email"
              autoFocus
              variant='standard'
              
            />
              
            <Grid 
                container 
                alignItems="center"
                justifyContent="center">
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 7, mb: 5, borderRadius: 30, padding: 2, width: 200, display:'block',}}  
                    >
                   Continue
                    </Button>
            </Grid>
            <Grid container>
              <Grid item>
                  I already have an account
                <Link href="#" variant="body2">
                    {"   Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
