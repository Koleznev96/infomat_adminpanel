const path = require('path');
const fs = require('fs');
const glob = require('glob');
const packageJson = require('./../package.json');

if (process.env.REACT_APP_ENV === 'development') {
	console.log('Skip in dev mode ...');
	return;
}

const manifestTpl = 'self.__precacheManifest = (self.__precacheManifest || []).concat(%%JSON%%);\n';
const manifestPattern = path.resolve('./build') + '/precache-manifest.*.js';

// append to precache manifest for offline use
global.self = {};

glob(manifestPattern, {}, function (er, files) {
	const manifest = files[0];
	require(manifest);

	const toAppend = [];

	['en', 'de', 'es'].forEach((lang) => {
		const langConfig = {
			revision: `infomat-${packageJson.version}`,
			url: `/static/locale/${lang}.json?v=${packageJson.version}`,
		};

		if (!global.self.__precacheManifest.includes(langConfig)) {
			toAppend.push({
				revision: `infomat-${packageJson.version}`,
				url: `/static/locale/${lang}.json?v=${packageJson.version}`,
			});
		}
	});

	// append locale files
	const all = global.self.__precacheManifest.concat(toAppend);
	fs.writeFileSync(manifest, manifestTpl.replace('%%JSON%%', JSON.stringify(all, null, 2)));
});
