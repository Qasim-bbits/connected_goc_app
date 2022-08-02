import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IonRouterLink } from "@ionic/react";

export default function ChangePasswordView(props) {
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
					alt="GOC Logo."
					style={{ margin: 50, maxWidth: 250 }}
				/>
				<Typography variant="h6" component="h6">
					Create your new password
				</Typography>
				<Box component="form" onSubmit={props.handleSubmit} sx={{ mt: 6 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						type="password"
						id="password1"
						label="Type your new password"
						name="password1"
						autoComplete="password"
						autoFocus
						variant="standard"
						onChange={(e) => props.handlePasswordChange(e.target.value)}
					/>
					<TextField
						margin="normal"
						required
						type="password"
						fullWidth
						id="password2"
						label={
							props.wrongPassword ? "Error" : "Type your new password again"
						}
						name="password2"
						autoComplete="password"
						variant="standard"
						helperText={props.wrongPassword && "Passwords do not match"}
						onChange={(e) => props.handleConfirmPassword(e.target.value)}
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
							// routerLink={"login"}
						>
							Change Password
						</Button>
					</Grid>
					<Grid container>
						<Grid item>
							Go to
							<IonRouterLink routerLink={"login"}> login</IonRouterLink>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
