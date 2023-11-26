import ServiceFactory from '@infomat/core/src/Services/ServiceFactory';

const riseEmptyStorageError = (key: string): string => {
	const errorMessage = `Value for key: ${key} cannot be undefined.`;

	if (ServiceFactory.env.isProduction()) {
		// ServiceFactory.logService.error(errorMessage);
	} else {
		throw Error(errorMessage);
	}

	return errorMessage;
};

export default riseEmptyStorageError;
