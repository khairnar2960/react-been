import { useContext, useReducer, createContext } from "react";

const StoreContext = createContext();

export const StoreProvider = ({ store, children }) => {
	const [state, dispatch] = useReducer(store.reducer, store.state);

	store.subscribe(() => {
		dispatch({ type: "__UPDATE__" }); // Dummy action to trigger re-render
	});

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

export const useSelector = (selector) => {
	const { state } = useContext(StoreContext);
	return selector(state);
};

export const useDispatch = () => {
	const { dispatch } = useContext(StoreContext);
	return dispatch;
};

export const createAsyncAction = (asyncFn, { startAction, successAction, failureAction }) => {
	return () => async (dispatch) => {
		try {
			dispatch(startAction());
			const response = await asyncFn();
			dispatch(successAction(response));
		} catch (error) {
			dispatch(failureAction(error));
		}
	};
};