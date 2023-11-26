import React, {ErrorInfo} from 'react';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

abstract class AbstractErrorBoundary<Props, State> extends React.Component<Props, IWithErrorState<State>> {
	static getDerivedStateFromError(error: Error) {
		return {hasError: error};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {}
}

export type IWithErrorState<T = any> = T & {
	hasError?: Error;
};

export default AbstractErrorBoundary;
