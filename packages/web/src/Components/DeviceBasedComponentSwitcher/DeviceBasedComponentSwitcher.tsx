import {ReactNode, createElement, FunctionComponent, Attributes} from 'react';
import {isMobile} from 'react-device-detect';

import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const DeviceBasedComponentSwitcher = <P extends {}>({
	desktop,
	// mobile,
	children,
	props,
}: TDeviceBasedComponentSwitcherProps<P>) => createElement(desktop, props, children);

type TDeviceBasedComponentSwitcherProps<P> = {
	desktop: FunctionComponent<P>;
	// mobile: FunctionComponent<P>;
	children?: ReactNode;
	props?: (Attributes & P) | null;
};

export default DeviceBasedComponentSwitcher;
