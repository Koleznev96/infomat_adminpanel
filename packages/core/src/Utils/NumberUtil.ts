export default class NumberUtil {
	static random(min = 1, max = 10000) {
		return Math.random() * (max - min) + min;
	}
}
