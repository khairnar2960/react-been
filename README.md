# ReactBeen
![npm](https://img.shields.io/npm/v/react-been) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/react-been/1.0.0) ![GitHub release (by tag)](https://img.shields.io/github/downloads/khairnar2960/react-been/stable/total) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/react-been) ![npm](https://img.shields.io/npm/dy/react-been) ![GitHub issues](https://img.shields.io/github/issues-raw/khairnar2960/react-been) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/khairnar2960/react-been)

A Redux-like state management toolkit for React with slice-based state handling.

## Installation

You can install the package via npm:

```sh
npm install react-been
```

## Usage

### Define a Slice

```javascript
// rolesSlice.js
import { createSlice } from 'react-been';

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRoles(state, action) {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setRoles, setLoading, setError } = rolesSlice.actions;
export default rolesSlice.reducer;
```

### Configure the Store

```javascript
// store.js
import { configureStore } from 'react-been';
import rolesReducer from './rolesSlice';

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
  },
});
```

### Create Async Actions

```javascript
// rolesAPI.js
export const fetchRoles = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: [{ id: 1, name: 'Admin' }] }), 1000);
  });
};

// rolesActions.js
import { fetchRoles } from './rolesAPI';
import { setRoles, setLoading, setError } from './rolesSlice';
import { createAsyncAction } from 'react-been';

export const getRoles = createAsyncAction(fetchRoles, {
  startAction: () => setLoading(true),
  successAction: (data) => setRoles(data),
  failureAction: (error) => setError(error),
});
```

### Use the Store in a React Application

```javascript
// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider, useSelector, useDispatch } from 'react-been';
import { store } from './store';
import { getRoles } from './rolesActions';

const RolesComponent = () => {
  const { list, loading, error } = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {list.map((role) => (
          <li key={role.id}>{role.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => (
  <StoreProvider store={store}>
    <RolesComponent />
  </StoreProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Harshal Khairnar

- GitHub: [Harshal Khairnar](https://github.com/khairnar2960)