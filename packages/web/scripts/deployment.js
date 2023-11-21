/**
 * @use node ./scripts/deployment.js {TARGET}, e.g. STAGE || LIVE
 * @example `node ./scripts/deployment.js STAGE`
 * @note `process.env` has to be set correctly to run this script
 */

const axios = require('axios');
const [target] = process.argv.slice(2);
const packageJson = require('./../package.json');
const {execSync} = require('child_process');

if (typeof target === 'undefined') {
	console.error(' ❌ Target env is not specified. Possible values: STAGE, LIVE.');
	process.exit();
}

try {
	execSync('git deploy ' + target);

	const deploymentDescription = {
		environment: target === 'STAGE' ? 'stage' : 'production',
		revision: packageJson.version,
		status: 'succeeded',
		comment: packageJson.name + ' v' + packageJson.version + ' deployed to ' + target,
	};

	const config = {
		headers: {
			'X-Rollbar-Access-Token': process.env.REACT_APP_ROLLBAR_SERVER_ACCESS_TOKEN,
		},
	};

	/**
	 * @link https://explorer.docs.rollbar.com/#operation/post-deploy
	 */
	axios
		.post('https://api.rollbar.com/api/1/deploy', deploymentDescription, config)
		.catch((error) => console.error(' ❌ Failed to report deployment: ' + error.response.body.message))
		.then(() => console.log(' [✓] OK'));
} catch (error) {
	console.error(' ❌ Failed to deploy: ' + error.message);
}
