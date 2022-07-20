import { Storage } from "@capacitor/storage";

const storeLocal = async (...args) => {
	await Storage.set({
		key: args[0],
		value: args[1],
	});

	console.log("Stored Locally");
};
const retrieveLocal = async (keyProp) => {
	const { value } = await Storage.get({ key: keyProp });
	return value;
};

const deleteLocal = async (keyProp) => {
	await Storage.remove({ key: keyProp });
};

export { storeLocal, retrieveLocal, deleteLocal };
