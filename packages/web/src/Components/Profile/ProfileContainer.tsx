import React from 'react';
import _ from 'lodash';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';

import Profile from './Profile';

const ProfileContainer = () => {
	// const chatTime = useStoreSelector(selectRunningChatsVideoTimeById, {chatId: chatId ?? ''});

	const onLogout = () => console.log('log');

	return <Profile login={'admin@mail.ru'} onLogout={onLogout} />;
};

export default ProfileContainer;
