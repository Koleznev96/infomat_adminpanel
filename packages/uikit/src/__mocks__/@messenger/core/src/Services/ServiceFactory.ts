const ServiceFactory = {
	voiceMessage: {},
	env: {
		getDeviceGiftIds: () => [],
	},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	uiContainer: {isNotDesktop: () => false, addEventListener: () => {}},
};
export default ServiceFactory;
