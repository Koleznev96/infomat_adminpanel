import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';

import EnumStore from '@infomat/core/src/BusinessLogic/EnumStore';
import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';
import {userClientToServerActions} from './Actions/userClientToServerActions';

function getWithExpiry(key: string, toParse?: boolean) {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return undefined;
	}
	let item = itemStr;
	if (toParse) {
		item = JSON.parse(itemStr);
	}

	return item;
}

export const initialUserState = {
	login: getWithExpiry('login', false),
	isNetworkAvailable: navigator.onLine,
	isLoggedIn: !!getWithExpiry('isLogin', true),
	isLoading: false,
	errorLogin: undefined,
};

const getDefaultState = (currentState: TUserSlice) => ({
	...initialUserState,
	isLoggedIn: false,
	isNetworkAvailable: currentState.isNetworkAvailable,
});

const userSlice = createSlice<TUserSlice, SliceCaseReducers<TUserSlice>, EnumStore>({
	name: EnumStore.USER,
	initialState: initialUserState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(userClientOnlyActions.resetStore, (state) => getDefaultState(state));
		builder.addCase(userClientOnlyActions.updateNetworkStatus, (state, action) => {
			state.isNetworkAvailable = action.payload;
		});
		builder.addCase(userClientToServerActions.login, (state, action) => {
			state.login = action.payload.login;
			localStorage.setItem('login', action.payload.login);
			state.isLoading = true;
		});
		builder.addCase(userClientOnlyActions.login, (state, action) => {
			localStorage.setItem('isLogin', 'true');
			state.isLoggedIn = true;
			state.isLoading = false;
			state.errorLogin = undefined;
		});
		builder.addCase(userClientOnlyActions.upsetDetailes, (state, action) => {
			state.login = action.payload.login || '';
			state.isLoading = false;
			state.errorLogin = action.payload.error;
		});
		builder.addCase(userClientOnlyActions.logout, (state) => {
			localStorage.setItem('isLogin', 'false');
			localStorage.removeItem('login');
			state.isLoggedIn = false;
			state.isLoading = false;
			state.login = undefined;
			// return getDefaultState(state);
		});
	},
});

export type TUserSlice = {
	login?: string;
	isNetworkAvailable: boolean;
	isLoggedIn?: boolean;
	isLoading: boolean;
	errorLogin?: string;
};

export default userSlice;
