// Data Models
import { PlayerData } from "./PlayerData.mjs";

Hooks.on(`applyActiveEffect`, (...args) => {
	console.log(`DiceField | applyActiveEffect hook`, args)
})

Hooks.once(`init`, async () => {
	CONFIG.ActiveEffect.legacyTransferral = false;
	CONFIG.Actor.dataModels.player = PlayerData;
});
