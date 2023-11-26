import _ from 'lodash';
import React from 'react';

const FormattedErrorMessage = (props: IFormattedErrorMessageProps) =>
	!_.isUndefined(props.message) ? (
		<small style={{display: 'block', color: 'red'}}>
			<code>{props.message}</code>
			<br />
			<br />
		</small>
	) : null;

interface IFormattedErrorMessageProps {
	message?: string;
}

export default FormattedErrorMessage;
