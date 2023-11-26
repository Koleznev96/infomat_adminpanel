import React from 'react';

export const mockComponent = (displayName: string) => {
	const MockedComponent = displayName as unknown as React.ComponentType<any>;

	return Object.assign((props: any) => <MockedComponent {...props} />, {displayName});
};
