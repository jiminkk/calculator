import operate from './operate';
import isNumber from './isNumber';

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 * 		total:String			the running total
 * 		current:String		the current number to be operated on with the total
 * 		operation:String	+, -, etc.
 */
export default function calculate(obj, buttonName) {
	if (buttonName === 'AC') {
		return {
			total: null,
			current: null,
			operation: null,
		};
	}

	if (isNumber(buttonName)) {
		if (buttonName === '0' && obj.current === '0') {
			return {};
		}
		if (obj.operation) {
			if (obj.current) {			// Update current by concatenating button # str.
				return { current: obj.current + buttonName };
			}
			return { current: buttonName };
		}
		// If no operation, update current. Clear total.
		if (obj.current) {
			return {
				current: obj.current + buttonName,
				total: null,
			};
		}
		return {
			current: buttonName,
			total: null,
		};
	}

	// Decimal point.
	if (buttonName === '.') {
		if (obj.current) {
			if (obj.current.includes('.')) {
				return {}
			}
			return { current: obj.current + '.' }
		}
		if (obj.operation) {
			return { current: '0.' }
		}
		if (obj.total) {
			// I think we don't need to do anything here.
		}
		return { total: '0.' };
	}

	if (buttonName === '=') {
		if (obj.current && obj.operation) {
			return {
				total: operate(obj.total, obj.current, obj.operation),
				current: null,
				operation: null,
			};
		} else {
			return {};
		}
	}

	if (buttonName === '+/-') {
		if (obj.current) {
			return { current: (-1 * parseFloat(obj.current)).toString() };
		}
		if (obj.total) {
			return { total: (-1 * parseFloat(obj.total)).toString() };
		}
		return {};
	}

	// From here, button must be an operation.
	// If user presses operation button & there exists already an operation,
	// 		calculate the previous operation & save the new operation.
	if (obj.operation) {
		return {
			total: operate(obj.total, obj.current, obj.operation),
			current: null,
			operation: buttonName,
		};
	}

	// If user hasn't typed a number yet, just save the operation.
	if (!obj.current) {
		return { operation: buttonName };
	}

	return {
		total: obj.current,
		current: null,
		operation: buttonName,
	};
}
