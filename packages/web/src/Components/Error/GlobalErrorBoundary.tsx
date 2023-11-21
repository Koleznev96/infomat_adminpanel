import _ from 'lodash';
import React, {PropsWithChildren} from 'react';

import AbstractErrorBoundary, {IWithErrorState} from '@infomat/core/src/Components/AbstractErrorBoundary';

import GlobalError from './GlobalError';

export default class GlobalErrorBoundary extends AbstractErrorBoundary<PropsWithChildren<any>, IWithErrorState> {
	constructor(props: PropsWithChildren<any>) {
		super(props);

		this.state = {
			hasError: undefined,
		};
	}

	render() {
		if (!_.isUndefined(this.state.hasError)) {
			return <GlobalError message={this.state.hasError.message} />;
		}

		return <>{this.props.children}</>;
	}
}
