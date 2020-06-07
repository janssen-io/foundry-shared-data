// Example: Enlarge token

const partOfName = "Blight";
const updates = canvas.tokens.placeables
    .filter(t => t.name.includes(partOfName))
    .map(t => {
        return {
              _id: t.id,
              width: t.data.width * 2,
              height: t.data.height * 2
        }
    });

canvas.tokens.updateMany(updates);
