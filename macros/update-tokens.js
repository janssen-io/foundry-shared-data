const not = f => token => !f(token);
const and = function() {
  let args = [...arguments];
	return token => args.every(f => f(token));
}

const or = function() {
  let args = [...arguments];
  return token => args.any(f => f(token));
}

const isNpc = token => token.actor.data.type == "npc";
const hasName = name => token => token.data.name.toLowerCase()
	.includes(name.toLowerCase());

const isHidden = token => token.data.hidden;

const updates = canvas.tokens.placeables
    .filter(and(isNpc, not(isHidden)))
    .map(token => {
      return {
        _id: token.id,
        displayName: CONST.TOKEN_DISPLAY_MODES.HOVER,
        displayBars: CONST.TOKEN_DISPLAY_MODES.HOVER
      }
    });

canvas.tokens.updateMany(updates);
