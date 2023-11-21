import React, {Ref} from 'react';
import {
	Virtuoso,
	GroupedVirtuoso,
	VirtuosoProps,
	GroupedVirtuosoProps,
	VirtuosoHandle,
	GroupedVirtuosoHandle,
} from 'react-virtuoso';
import classNames from 'classnames';

import style from './VirtuosoWrapper.module.scss';

export const VirtuosoWrapper = <D, C>({
	className,
	virtuosoRef,
	...props
}: Omit<VirtuosoProps<D, C>, 'ref'> & {virtuosoRef?: Ref<VirtuosoHandle>}) => (
	<Virtuoso className={classNames(style.scroller, className)} ref={virtuosoRef} {...props} />
);

export const GroupedVirtuosoWrapper = <D, C>({
	className,
	virtuosoRef,
	...props
}: Omit<GroupedVirtuosoProps<D, C>, 'ref'> & {virtuosoRef?: Ref<GroupedVirtuosoHandle>}) => (
	<GroupedVirtuoso className={classNames(style.scroller, className)} ref={virtuosoRef} {...props} />
);

export default VirtuosoWrapper;
