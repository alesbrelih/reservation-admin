import { Utils } from "./utils"

describe('Utils isDefined', () => {
	it('should return false on null', () => {
		expect(Utils.isDefined(null)).toEqual(false);
	});
	it('should return false on undefined', () => {
		expect(Utils.isDefined(undefined)).toEqual(false);
	});
	it('should return true on 0', () => {
		expect(Utils.isDefined(0)).toEqual(true);
	});
	it('should return true on empty string', () => {
		expect(Utils.isDefined('')).toEqual(true);
	});
})
