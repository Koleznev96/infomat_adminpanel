import {useEffect} from 'react';

import {useBooleanState} from '@infomat/core/src/Hooks/useBooleanState';

const useDisabledUntilChanged = <T>(value: T): [isDisabled: boolean, disable: () => void] => {
	const [isDisabled, setDisabled, setEnabled] = useBooleanState(false);

	useEffect(() => {
		setEnabled();
		// eslint disabled because setEnabled is persistent
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	return [isDisabled, setDisabled];
};

export default useDisabledUntilChanged;
