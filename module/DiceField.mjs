const statDice = [`d4`, `d6`, `d8`, `d10`, `d12`, `d20`];

/**
 * A subclass of StringField that allows ActiveEffects to integrate with dice
 * values and increase/decrease the value step-wise according to the dice ladder.
 */
export class DiceField extends foundry.data.fields.DataField {
	static get _defaults() {
		return foundry.utils.mergeObject(super._defaults, {
			trim: true,
			blank: true,
			initial: ``,
			choices: [``, ...statDice],
		});
	};

	constructor(options = {}, context = {}) {
		super(options, context);

		this.blank = true;
		console.log(`DiceField | `, this.choices)
	};


	// Does get called
	_cast(value) {
		return String(value);
	}


	// Never gets called
	_castChangeDelta(delta) {
		console.log(`DiceField | _castChangeDelta(${delta})`)
		return parseInt(delta) ?? 0;
	};


	/*
	Even with overriding applyChange, it doesn't seem to get called on this class
	and just uses the base DataField methods
	*/
	/*
	applyChange(value, model, change) {
		console.log(`DiceField | applyChange`)
		const delta = this._castChangeDelta(change.value);
		switch ( change.mode ) {
			case CONST.ACTIVE_EFFECT_MODES.ADD:
				return this._applyChangeAdd(value, delta, model, change);
			case CONST.ACTIVE_EFFECT_MODES.MULTIPLY:
				return this._applyChangeMultiply(value, delta, model, change);
			case CONST.ACTIVE_EFFECT_MODES.OVERRIDE:
				return this._applyChangeOverride(value, delta, model, change);
			case CONST.ACTIVE_EFFECT_MODES.UPGRADE:
				return this._applyChangeUpgrade(value, delta, model, change);
			case CONST.ACTIVE_EFFECT_MODES.DOWNGRADE:
				return this._applyChangeDowngrade(value, delta, model, change);
		}
		return this._applyChangeCustom(value, delta, model, change);
	}
	// */


	// Doesn't get called
	_applyChangeOverride(value, delta, model, change) {
		console.log(`DiceField | Applying override value`)
		return delta;
	};


	// Doesn't get called
	_applyChangeUpgrade(value, delta, model, change) {
		console.log(`DiceField | upgrade Pre: value=${value}; delta=${delta}`);
		if (value === "") return value;
		const dieIndex = statDice.findIndex(value);
		const newIndex = Math.min(Math.max(0, dieIndex - delta), statDice.length - 1);
		value = statDice[newIndex];
		console.log(`DiceField | upgrade Post: value=${value}; delta=${delta}`);
		return value;
	};


	// Doesn't get called
	_applyChangeDowngrade(value, delta, model, change) {
		console.log(`DiceField | downgrade Pre: value=${value}; delta=${delta}`);
		if (value === "") return value;
		const dieIndex = statDice.findIndex(value);
		const newIndex = Math.min(Math.max(0, dieIndex + delta), statDice.length - 1);
		value = statDice[newIndex];
		console.log(`DiceField | downgrade Post: value=${value}; delta=${delta}`);
		return value
	};


	// Doesn't get called
	_applyChangeCustom(...args) {
		console.log(`DiceField | Applying custom`)
		return super._applyChangeCustom(...args);
	}
};
