import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {ActionCreatorWithPreparedPayload} from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useActionDispatcher = <T, M, E, A extends any[]>(
	actionCreator: ActionCreatorWithPreparedPayload<A, T, string, E, M>,
) => {
	const dispatch = useDispatch();

	return useCallback((...params: A) => dispatch(actionCreator(...params)), [actionCreator, dispatch]);
};

export default useActionDispatcher;
