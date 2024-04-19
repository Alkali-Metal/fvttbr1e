import { DiceField } from "./DiceField.mjs";

export class PlayerData extends foundry.abstract.TypeDataModel {
	static defineSchema() {
		return {
			dice: new DiceField(),
		};
	};
};
