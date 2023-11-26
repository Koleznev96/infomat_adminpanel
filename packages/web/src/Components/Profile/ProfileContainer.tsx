import React from 'react';

import {useStoreSelector} from '@infomat/core/src/Hooks/useStoreSelector';
import {selectLogin} from '@infomat/core/src/Redux/User/Selectors/selectLogin';
import useActionDispatcher from '@infomat/core/src/Hooks/useActionDispatcher';
import {userClientOnlyActions} from '@infomat/core/src/Redux/User/Actions/userClientOnlyActions';

import Profile from './Profile';

const ProfileContainer = () => (
	<Profile login={useStoreSelector(selectLogin)} onLogout={useActionDispatcher(userClientOnlyActions.logout)} />
);

export default ProfileContainer;
