import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IonRouterLink } from "@ionic/react";

export default function SignupView(props) {
	return (
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
					src={require("../../../assets/logo/goc_logo_variant.svg").default}
					alt="Blinkay Logo."
					style={{ margin: 50, maxWidth: 250 }}
				/>
				<Typography variant="h6" component="h6">
					What is your email address?
				</Typography>
				<Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 6 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="fName"
						label="Type your first name"
						name="fName"
						autoComplete="fName"
						autoFocus
						variant="standard"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="lName"
						label="Type your last name"
						name="lName"
						autoComplete="lName"
						variant="standard"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Type your email address"
						name="email"
						autoComplete="email"
						variant="standard"
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						id="password"
						label="Type your password"
						name="password"
						autoComplete="password"
						variant="standard"
					/>

					<Grid container alignItems="center" justifyContent="center">
						<Button
							type="submit"
							variant="contained"
							sx={{
								mt: 7,
								mb: 5,
								borderRadius: 30,
								padding: 2,
								width: 200,
								display: "block",
							}}
							onClick={() => {}}
							routerLink={"login"}
						>
							Continue
						</Button>
					</Grid>
					<Grid container>
						<Grid item>
							I already have an account
							<IonRouterLink routerLink={"login"}> Login</IonRouterLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
