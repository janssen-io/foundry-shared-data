// Requires CUB (Combat Utility Belt)
// Requires Token Mold (for sticky templates)

const key = "sticky-templates";
const namespace = "token-mold";
const templateName = "darkness";
const owningPlayerName = "Player 1";

async function createSticky() {
    const gridSize = game.scenes.active.data.grid;
    const owner = game.users.getName(owningPlayerName);
    const template = await MeasuredTemplate.create({
        angle: null,
        distance: 15,
        direction: 0,
        borderColor: "#000000",
        fillColor: "#000000",
        rotate: false,
        user: owner._id,
        t: "circle",
        texture: "",
        x: token.data.x + gridSize / 2,
        y: token.data.y + gridSize / 2
    });

    template.setFlag(namespace, key, {
        tokenId: token.id,
        rotate: false,
        name: templateName
    });

    token.setFlag(namespace, key, {
        templateIds: [template.id]
    });
}

function getStickyTemplates(token, name) {
    const sticky = token.getFlag(namespace, key);
    if (!sticky || !sticky.templateIds)
        return [];

    return canvas.templates.objects.children.filter(template => {
        let isSticky = sticky.templateIds.some(id => id === template.id)
        let stickyData = template.getFlag(namespace, key);

        return isSticky && stickyData && stickyData.name === name;
    });
}

const token = canvas.tokens.controlled[0];
if (!token) {
  ui.notifications.error("Please select your token!");
}
else {
  let relatedStickies = getStickyTemplates(token, templateName);
  if (relatedStickies.length === 0) {
      let actor = token.actor;
      let darkness = actor.items.find(item => item.name === "Darkness" && item.type === "spell");
      actor.useSpell(darkness).then(createSticky);
  } else {
      relatedStickies.map(s => s.delete());
      game.cub.removeCondition("Concentrating", canvas.tokens.controlled);
  }
}
