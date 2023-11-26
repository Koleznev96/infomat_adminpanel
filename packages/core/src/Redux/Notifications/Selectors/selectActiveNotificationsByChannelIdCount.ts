import _ from 'lodash';

import {createSelector} from '@infomat/core/src/Utils/Redux/createSelector';
import {selectAllNotifications} from '@infomat/core/src/Redux/Notifications/Selectors/defaultSelectors';

const getProps = (_: any, props: {key: string}) => props;

export const selectActiveNotificationsByChannelIdCount = createSelector(
	[selectAllNotifications, getProps],
	(notifications, props) => _.size(_.filter(notifications, {key: props.key})),
);
