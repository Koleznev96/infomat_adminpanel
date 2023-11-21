import React, {useCallback, ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

import {Icon, IconSize, IconType} from '@infomat/uikit/src/Icon';
import ActionIconButton from '@infomat/uikit/src/IconButton/ActionIconButton/ActionIconButton';
import {useDebounced} from '@infomat/core/src/Hooks/useDebounced';

import style from './LiveSearch.module.scss';

const LiveSearchField = ({defaultValue, onChange, isFocused = true}: TLiveSearchFieldProps) => {
	const [value, setValue] = useState(defaultValue);
	const onChangeDebounced = useDebounced((value: string) => onChange(value), 400);
	const onClear = useCallback(() => {
		setValue('');
		onChange('');
	}, [onChange]);

	return (
		<TextField
			className={style.liveSearch}
			variant="outlined"
			autoFocus={isFocused}
			onChange={useCallback(
				({target: {value}}: ChangeEvent<HTMLInputElement>) => {
					setValue(value);
					onChangeDebounced(value);
				},
				[onChangeDebounced],
			)}
			value={value}
			InputProps={{
				startAdornment: <Icon type={IconType.search} size={IconSize.small} />,
				endAdornment: defaultValue ? (
					<ActionIconButton
						iconType={IconType.close}
						iconSize={IconSize.small}
						onClick={onClear}
						className={style.clearButton}
					/>
				) : undefined,
			}}
		/>
	);
};

type TLiveSearchFieldProps = {
	defaultValue?: string;
	isFocused?: boolean;
	onChange: (value: string) => void;
};

export default LiveSearchField;
