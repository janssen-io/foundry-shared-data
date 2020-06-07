if (token.data.brightLight > 0) {
  token.update({brightLight: 0, dimLight: 0})
    .then(() => ui.notifications.info("Torch toggled off."));
}
else {
  token.update({brightLight: 20, dimLight: 40})
    .then(() => ui.notifications.info("Torch toggled on."));
}

