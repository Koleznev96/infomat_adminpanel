import {EntitySelectors} from '@reduxjs/toolkit/src/entities/models';

import IRootState from '@infomat/core/src/Redux/IRootState';

export type TDefaultSelectors<E, I> = Omit<EntitySelectors<E, IRootState>, 'selectIds' | 'selectById'> & {
	selectIds: (state: IRootState) => number[];
	selectById: (state: IRootState, id: I) => E | undefined;
};
