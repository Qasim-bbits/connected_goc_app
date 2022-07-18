import React, { createContext, useReducer } from "react";

let AppContext = createContext();

const initialState = {
	count: 0,
};

let reducer = (state, action) => {
	switch (action.type) {
		case "setCount": {
			return { ...state, count: action.user };
		}
	}
	return state;
};

const logger = (reducer) => {
	const reducerWithLogger = (state, action) => {
		console.log(
			"%cPrevious State:",
			"color: #9E9E9E; font-weight: 700;",
			state
		);
		console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
		console.log(
			"%cNext State:",
			"color: #47B04B; font-weight: 700;",
			reducer(state, action)
		);
		return reducer(state, action);
	};
	return reducerWithLogger;
};

const loggerReducer = logger(reducer);

function AppContextProvider(props) {
	const fullInitialState = {
		...initialState,
	};

	let [state, dispatch] = useReducer(loggerReducer, fullInitialState);
	let value = { state, dispatch };
	// const [state,dispatch] = React.useState();

	return (
		<AppContext.Provider value={value}>{props.children}</AppContext.Provider>
	);
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
