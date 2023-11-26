import {createUseDebouncedMemoHook} from './createUseDebouncedMemoHook';
import {useDebounced} from './useDebounced';

export const useDebouncedMemo = createUseDebouncedMemoHook(useDebounced);
