import { createContext, useState } from "react";

//create a context, with createContext api
export const globalStateContext = createContext();

const UserDetailsProvider = (props) => {
	// this state will be shared with all components
	const [userId, setUserId] = useState();
	const [cityId, setCityId] = useState();
	const [zoneId, setZoneId] = useState();
	const [plate, setPlate] = useState();
	const [coord, setCoord] = useState();
	const [rateType, setRateType] = useState();
	const [email, setEmail] = useState();

	return (
		// this is the provider providing state
		<globalStateContext.Provider
			value={{
				user: [userId, setUserId],
				city: [cityId, setCityId],
				zone: [zoneId, setZoneId],
				plateName: [plate, setPlate],
				currCoord: [coord, setCoord],
				rateTypes: [rateType, setRateType],
				emailU: [email, setEmail],
			}}
		>
			{props.children}

			{console.log(
				"Global State:",
				"\nuserId:",
				userId,
				"\ncityId:",
				cityId,
				"\nzoneId:",
				zoneId,
				"\nplateName:",
				plate,
				"\ncoord:",
				coord,
				"\nrateTypes:",
				rateType,
				"\nemail:",
				email
			)}
		</globalStateContext.Provider>
	);
};

export default UserDetailsProvider;
