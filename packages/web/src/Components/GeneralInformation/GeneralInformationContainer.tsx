import React from 'react';
import {isUndefined} from 'lodash';

import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {informationClientToServerActions} from '@infomat/core/src/Redux/Information/Actions/informationClientToServerActions';
import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectInformationData} from '@infomat/core/src/Redux/Information/Selectors/selectInformationData';
import {selectInformationIsLoading} from '@infomat/core/src/Redux/Information/Selectors/selectInformationIsLoading';
import {selectErrorInformation} from '@infomat/core/src/Redux/Information/Selectors/selectErrorInformation';
import Page from '@infomat/uikit/src/Page/Page';

import GeneralInformation from './GeneralInformation';

const GeneralInformationContainer = () => {
	const data = useStoreSelector(selectInformationData);
	const isLoading = useStoreSelector(selectInformationIsLoading);
	const error = useStoreSelector(selectErrorInformation);
	const onSubmit = useActionDispatcher(informationClientToServerActions.updateDetails);

	return (
		<Page isLoading={isLoading || isUndefined(data)}>
			<GeneralInformation data={data} error={error} onSubmit={onSubmit} />
		</Page>
	);
};

export default GeneralInformationContainer;
