import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import GeneralInformation from './GeneralInformation';

const GeneralInformationContainer = () => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onLogout = () => console.log('log');

	return <GeneralInformation onSubmit={onLogout} />;
};

export default GeneralInformationContainer;
