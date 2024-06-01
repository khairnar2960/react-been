export function createSlice({ name, initialState, reducers }) {
	const slice = {
		name,
		reducer: (state = initialState, action) => {
		if (reducers[action.type]) {
			reducers[action.type](state, action);
		}
		return state;
		},
		actions: {},
	};

	for (const [key, reducer] of Object.entries(reducers)) {
		const type = `${name}.${key}`;
		slice.actions[key] = (payload) => ({ type, payload });
		reducers[type] = reducer;
	}

	return slice;
}