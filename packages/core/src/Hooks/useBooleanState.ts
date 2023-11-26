import {useCallback, useState} from 'react';

export const useBooleanState = (defaultValue = false): [boolean, () => void, () => void, () => void] => {
	const [state, setState] = useState(defaultValue);
	const setTrue = useCallback(() => setState(true), []);
	const setFalse = useCallback(() => setState(false), []);
	const toggle = useCallback(() => setState((previous) => !previous), []);

	return [state, setTrue, setFalse, toggle];
};
