import _ from 'lodash';

import {createUseDebouncedHook} from '@infomat/core/src/Hooks/createUseDebouncedHook';

export const useThrottled = createUseDebouncedHook(_.throttle);
