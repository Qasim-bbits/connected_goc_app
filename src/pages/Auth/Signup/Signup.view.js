import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IonRouterLink } from "@ionic/react";
import Toast from "../../../components/toast";

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
					style={{ margin: 10, maxWidth: 250 }}
				/>
				{/* <Typography variant="h6" component="h6">
					What is your email address?
				</Typography> */}
				<Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 6 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="fName"
						label="First Name"
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
						label="Last Name"
						name="lName"
						autoComplete="lName"
						variant="standard"
					/>
					<TextField
						margin="normal"
						// required
						fullWidth
						id="address"
						label="Address.(Optional)"
						name="address"
						autoComplete="address"
						autoFocus
						variant="standard"
					/>
					<TextField
						margin="normal"
						// required
						fullWidth
						id="mobileNo"
						label="Mobile No.(Optional)"
						name="mobileNo"
						autoComplete="mobileNo"
						autoFocus
						variant="standard"
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						variant="standard"
					/>

					<TextField
						margin="normal"
						required
						fullWidth
						id="password"
						label="Password"
						name="password"
						autoComplete="password"
						variant="standard"
						type="password"
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
			<Toast
				message={props.message}
				toastOpen={props.toastOpen}
				setToastOpen={props.setToastOpen}
			/>
		</Container>
	);
}
