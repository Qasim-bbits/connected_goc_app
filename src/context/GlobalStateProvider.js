import { createContext, useState } from "react";

//create a context, with createContext api
export const globalStateContext = createContext();

const UserDetailsProvider = (props) => {
	// this state will be shared with all components
	const [userId, setUserId] = useState();
	const [cityId, setCityId] = useState();
	const [zoneData, setZoneData] = useState();
	const [plate, setPlate] = useState();
	const [coord, setCoord] = useState();
	const [rateData, setRateData] = useState();
	const [selectedRateData, setSelectedRateData] = useState();
	const [stepsData, setStepsData] = useState();
	const [paymentData, setPaymentData] = useState();
	const [email, setEmail] = useState();
	const [remember, setRemember] = useState(false);

	return (
		// this is the provider providing state
		<globalStateContext.Provider
			value={{
				user: [userId, setUserId],
				city: [cityId, setCityId],
				zone: [zoneData, setZoneData],
				plateName: [plate, setPlate],
				currCoord: [coord, setCoord],
				rate: [rateData, setRateData],
				selectedRate: [selectedRateData, setSelectedRateData],
				payment: [paymentData, setPaymentData],
				steps: [stepsData, setStepsData],
				emailU: [email, setEmail],
				rememberMe: [remember, setRemember],
			}}
		>
			{props.children}

			{console.log(
				"Global State:",
				"\nuserId:",
				userId,
				"\ncityId:",
				cityId,
				"\nzone:",
				zoneData,
				"\nplateName:",
				plate,
				"\ncoord:",
				coord,
				"\nrateData:",
				rateData,
				"\nselectedRate",
				selectedRateData,
				"\nemail:",
				email,
				"\npaymentData:",
				paymentData,
				"\nrememberMe:",
				remember,
				"\nsteps",
				stepsData,
			)}
		</globalStateContext.Provider>
	);
};

export default UserDetailsProvider;
