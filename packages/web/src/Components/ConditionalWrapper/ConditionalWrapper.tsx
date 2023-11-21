import React, {ComponentClass, FunctionComponent, PropsWithChildren, createElement} from 'react';

const ConditionalWrapper = <P extends {}>({
	condition,
	children,
	wrapper,
	wrapperParams,
}: PropsWithChildren<TConditionalWrapperProps<P>>) =>
	createElement(condition ? wrapper : React.Fragment, condition ? wrapperParams : null, children);

type TConditionalWrapperProps<P extends {}> = {
	condition: boolean;
	wrapper: FunctionComponent<P> | ComponentClass<P> | string;
} & ({[K in keyof P]: undefined} extends P ? {wrapperParams?: P} : {wrapperParams: P});

export default ConditionalWrapper;
