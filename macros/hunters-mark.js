// Requires Dynamic Effects

if (canvas.tokens.controlled.length === 0){
  ui.notifications.error("Hunter's Mark can only be toggled when a token is selected.");
}
else {
  DynamicEffects.togglePassive("Hunter's Mark", "spell");
}
