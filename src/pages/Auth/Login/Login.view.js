import React, { Fragment } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const themeLight = createTheme({
	palette: {
		background: {
			default: "#D3D3D3",
		},
	},
});

const themeDark = createTheme({
	palette: {
		background: {
			default: "#222222",
		},
		text: {
			primary: "#ffffff",
		},
	},
});

export default function LoginView(props) {
	return (
		<ThemeProvider theme={themeLight}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<img
						src={require("../../../assets/logo/logo_blue.svg").default}
						alt="Blinkay Logo."
						style={{ margin: 100, maxWidth: 250 }}
					/>
					<Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label={<PersonOutlineIcon />}
							name="email"
							autoComplete="email"
							autoFocus
							variant="standard"
						/>

						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label={<LockOutlinedIcon />}
							type="password"
							id="password"
							autoComplete="current-password"
							variant="standard"
						/>
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
						/>
						<Grid container alignItems="center" justifyContent="center">
							<Button
								type="submit"
								variant="contained"
								sx={{
									mt: 3,
									mb: 2,
									borderRadius: 30,
									padding: 2,
									width: 200,
									display: "block",
								}}
							>
								Login
							</Button>
						</Grid>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot your password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2">
									{"Still not have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
