import {createUseDebouncedMemoHook} from './createUseDebouncedMemoHook';
import {useThrottled} from './useThrottled';

export const useThrottledMemo = createUseDebouncedMemoHook(useThrottled);
