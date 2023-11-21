import _ from 'lodash';

import {createUseDebouncedHook} from '@infomat/core/src/Hooks/createUseDebouncedHook';

export const useDebounced = createUseDebouncedHook(_.debounce);
