import {getContext} from 'typed-redux-saga';

export enum EnumSagaContext {
	ROUTER = 'router',
}

export type TNavigateOptions = {replace?: boolean};

export type TSagaContext = {
	[EnumSagaContext.ROUTER]: {
		goEvent: (id: number, options?: TNavigateOptions) => void;
		goTouristRout: (id: number, options?: TNavigateOptions) => void;
		goSubcategoryObject: (id: number, options?: TNavigateOptions) => void;
		goCategoryObject: (id: number, options?: TNavigateOptions) => void;
		goTouristObject: (id: number, options?: TNavigateOptions) => void;

		goInformation: (options?: TNavigateOptions) => void;
		goEvents: (options?: TNavigateOptions) => void;
		goRecommend: (options?: TNavigateOptions) => void;
		goTouristRoutes: (options?: TNavigateOptions) => void;
		goSubcategoriesObjects: (options?: TNavigateOptions) => void;
		goCategoriesObjects: (options?: TNavigateOptions) => void;
		goTouristObjects: (options?: TNavigateOptions) => void;
		goHome: (options?: TNavigateOptions) => void;
	};
};

export const getNavigationContext = function* () {
	return yield* getContext<TSagaContext[EnumSagaContext.ROUTER]>(EnumSagaContext.ROUTER);
};
