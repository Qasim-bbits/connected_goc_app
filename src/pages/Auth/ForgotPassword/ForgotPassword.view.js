// import React, { Fragment} from 'react';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
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

export default function ForgotPassword(props) {
  
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
        
            
         
         {/* <img src= {require("../../../assets/logo/logo_blue.svg").default} alt="Blinkay Logo." style={{margin : 100, maxWidth : 250 }}/> */}
          <Box component="form" onSubmit={props.handleSubmit}  sx={{ mt: 1 }}>
            
            <Typography  component="p">
                    Please write your username and we will send your password to the associated email address:
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant='standard'
              
            />
            <Typography  component="p">
                    Don't forget to check your spam folder in case you do not find our message.
            </Typography>
              
            <Grid 
                container 
                alignItems="center"
                justifyContent="center">

            <Box
                m={1}
                //margin
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
               
            >
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 30, padding: 2, width: 200, display:'block',}}
              
            >
              Request
            </Button>

            </Box>        
            
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
