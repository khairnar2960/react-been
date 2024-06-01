class Store {
	constructor(reducer, initialState) {
		this.reducer = reducer;
		this.state = initialState;
		this.listeners = [];
	}

	getState() {
		return this.state;
	}

	dispatch(action) {
		this.state = this.reducer(this.state, action);
		this.listeners.forEach((listener) => listener());
	}

	subscribe(listener) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== listener);
		};
	}
}

function combineReducers(reducers) {
	return function(state = {}, action) {
		const newState = {};
		for (const key in reducers) {
			newState[key] = reducers[key](state[key], action);
		}
		return newState;
	};
};

export function configureStore({ reducer }) {
	const rootReducer = combineReducers(reducer);
	const initialState = Object.keys(reducer).reduce((acc, key) => {
		acc[key] = reducer[key](undefined, { type: '__INIT__' });
		return acc;
	}, {});
	return new Store(rootReducer, initialState);
};