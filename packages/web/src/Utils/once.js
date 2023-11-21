/**
 * Create a promise which resolves once a particular event is dispatched by the given DOM EventTarget.
 * @param  {EventTarget}  target An EventTarget
 * @param  {string}       type   The type of event
 * @return {Promise<any>}        Resolves with the event once it's dispatched
 * @link https://github.com/EventMobi/redux-saga-network-status/blob/master/src/utils.js
 */
export function once(target, type) {
	return new Promise((resolve) => {
		const listener = (e) => {
			target.removeEventListener(type, listener);
			resolve(e);
		};
		target.addEventListener(type, listener);
	});
}
