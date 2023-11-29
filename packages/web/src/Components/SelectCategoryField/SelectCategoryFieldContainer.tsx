import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectCategoryObjectIsLoading} from '@infomat/core/src/Redux/CategoryObject/Selectors/selectCategoryObjectIsLoading';
import {selectCategoryObjectVMs} from '@infomat/core/src/Redux/CategoryObject/Selectors/defaultSelectors';
import PropertyHandler from '@infomat/core/src/Types/PropertyHandler';
import {selectSubcategoryObjectVMs} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/defaultSelectors';
import {selectSubcategoryObjectIsLoading} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectIsLoading';

import SelectField from './SelectField';

const SelectCategoryFieldContainer = ({
	onChange,
	label,
	placeholder,
	value,
	isShowSubcategory,
}: TSelectCategoryFieldContainerProps) => {
	const categoryObjectVMs = useStoreSelector(selectCategoryObjectVMs);
	const subcategoryObjectVMs = useStoreSelector(selectSubcategoryObjectVMs);
	const isLoadingCategory = useStoreSelector(selectCategoryObjectIsLoading);
	const isLoadingSubcategory = useStoreSelector(selectSubcategoryObjectIsLoading);

	return (
		<SelectField
			items={isShowSubcategory ? subcategoryObjectVMs : categoryObjectVMs}
			onChange={onChange}
			label={label}
			placeholder={placeholder}
			value={value}
			isLoading={isShowSubcategory ? isLoadingSubcategory : isLoadingCategory}
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
