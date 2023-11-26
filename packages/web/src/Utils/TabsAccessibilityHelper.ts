import EnumSettingsTabs from '@infomat/core/src/BusinessLogic/EnumSettingsTabs';

import {EnumCatalogTabs} from 'src/Components/Modal/ContentCatalogModal/ContentCatalogModal';

export const tabA11yProps = (tab: EnumSettingsTabs | EnumCatalogTabs, prefix = 'settings-') => ({
	id: `${prefix}-tab-${tab}`,
	'aria-controls': `${prefix}-tabpanel-${tab}`,
	value: tab,
});
