import _ from 'lodash';

type ValidatorType = (delay: number) => void;

const provideDelay =
	(validator?: ValidatorType) =>
	({fn, args}: any, next: () => void) => {
		if (fn.name === 'delayP') {
			if (!_.isUndefined(validator) && args.length > 0) {
				validator(args[0]);
			}

			return null;
		}

		return next();
	};

export default provideDelay;
