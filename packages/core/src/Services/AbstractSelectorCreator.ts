import {createSelector} from '@reduxjs/toolkit';

abstract class AbstractSelectorCreator {
	abstract create(args: any): ReturnType<typeof createSelector>;
}

export default AbstractSelectorCreator;
