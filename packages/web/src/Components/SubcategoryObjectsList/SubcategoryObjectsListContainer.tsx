import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';

import SubcategoryObjectsList from './SubcategoryObjectsList';
import {subcategoryObjectClientToServerActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientToServerActions';
import {selectSubcategoryObjectCurrentPage} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectCurrentPage';
import {selectSubcategoryObjectIsLoading} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectIsLoading';
import {selectSubcategoryObjectIds} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/defaultSelectors';
import {selectSubcategoryObjectTotalPages} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectTotalPages';
import {selectSubcategoryObjectSearch} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectSearch';
import {selectSubcategoryObjectSizePage} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectSizePage';
import {selectSubcategoryObjectFiler} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectFiler';
import {subcategoryObjectClientOnlyActions} from '@infomat/core/src/Redux/SubcategoryObject/Actions/subcategoryObjectClientOnlyActions';
import {selectSubcategoryObjectGroupedIds} from '@infomat/core/src/Redux/SubcategoryObject/Selectors/selectSubcategoryObjectGroupedIds';

const SubcategoryObjectsListContainer = () => {
	const totalPage = useStoreSelector(selectSubcategoryObjectTotalPages);
	const size = useStoreSelector(selectSubcategoryObjectSizePage);
	const search = useStoreSelector(selectSubcategoryObjectSearch);
	const isLoading = useStoreSelector(selectSubcategoryObjectIsLoading);
	const currentPage = useStoreSelector(selectSubcategoryObjectCurrentPage);
	const subcategoryObjectIds = useStoreSelector(selectSubcategoryObjectIds);
	const subcategoryGroupedVMs = useStoreSelector(selectSubcategoryObjectGroupedIds);
	const filter = useStoreSelector(selectSubcategoryObjectFiler);
	const getData = useActionDispatcher(subcategoryObjectClientToServerActions.getList);
	const setFilter = useActionDispatcher(subcategoryObjectClientOnlyActions.setFilter);

	return (
		<SubcategoryObjectsList
			subcategoryGroupedVMs={subcategoryGroupedVMs}
			subcategoryObjectIds={subcategoryObjectIds}
			currentPage={currentPage}
			isLoading={isLoading}
			search={search}
			size={size}
			totalPage={totalPage}
			getData={getData}
			indexFilter={filter}
			setIndexFilter={setFilter}
		/>
	);
};

export default SubcategoryObjectsListContainer;
