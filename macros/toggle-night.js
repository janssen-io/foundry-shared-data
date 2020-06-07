const darknessThreshold = 0.3;

var scene = game.scenes.entities.find(({data}) => data.active);
var isDay = scene.data.darkness < darknessThreshold;

var night = { darkness: darknessThreshold, globalLight: false };
var day = { darkness: 0, globalLight: true };

scene.update(isDay ? night : day);

var message = isDay
  ? `The night is dark and full of terrors.`
  : `Wakey Wakey, day breaky!`;

ui.notifications.notify(message);

