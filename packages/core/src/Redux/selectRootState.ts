import {Selector} from '@reduxjs/toolkit';

import IRootState from '@infomat/core/src/Redux/IRootState';

export const selectRootState: Selector<IRootState, IRootState> = (state: IRootState) => state;

export default selectRootState;
