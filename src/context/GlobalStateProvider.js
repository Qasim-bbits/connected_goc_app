import { createContext, useState } from "react";

//create a context, with createContext api
export const globalStateContext = createContext();

const UserDetailsProvider = (props) => {
	// this state will be shared with all components
	const [userId, setUserId] = useState();
	const [cityId, setCityId] = useState();
	const [zoneId, setZoneId] = useState();
	const [plateId, setPlateId] = useState();
	const [coord, setCoord] = useState();

	return (
		// this is the provider providing state
		<globalStateContext.Provider
			value={{
				user: [userId, setUserId],
				city: [cityId, setCityId],
				zone: [zoneId, setZoneId],
				plate: [plateId, setPlateId],
				currCoord: [coord, setCoord],
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
				"\nplateId:",
				plateId,
				"\ncoord:",
				coord
			)}
		</globalStateContext.Provider>
	);
};

export default UserDetailsProvider;
