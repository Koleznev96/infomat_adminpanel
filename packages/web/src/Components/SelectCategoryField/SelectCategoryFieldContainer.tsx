import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectCategoryObjectIsLoading} from '@infomat/core/src/Redux/CategoryObject/Selectors/selectCategoryObjectIsLoading';
import {selectCategoryObjectVMs} from '@infomat/core/src/Redux/CategoryObject/Selectors/defaultSelectors';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';

import SelectField from './SelectField';
import {selectSubcategoryObjectVMs} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/defaultSelectors';

const SelectCategoryFieldContainer = ({
	onChange,
	label,
	placeholder,
	value,
	isShowSubcategory,
}: TSelectCategoryFieldContainerProps) => {
	const categoryObjectVMs = useStoreSelector(selectCategoryObjectVMs);
	const subcategoryObjectVMs = useStoreSelector(selectSubcategoryObjectVMs);
	const isLoading = useStoreSelector(selectCategoryObjectIsLoading);

	return (
		<SelectField
			items={isShowSubcategory ? subcategoryObjectVMs : categoryObjectVMs}
			onChange={onChange}
			label={label}
			placeholder={placeholder}
			value={value}
			isLoading={isLoading}
		/>
	);
};

type TSelectCategoryFieldContainerProps = {
	onChange: PropertyHandler<number>;
	label?: string;
	placeholder?: string;
	value?: number;
	isShowSubcategory?: boolean;
};

export default SelectCategoryFieldContainer;
