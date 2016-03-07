module.exports = function reload(assets) {
  try {
    delete require.cache[require.resolve('../build/webpack-assets')];
  } catch (e) {
    // Skip
  }

  return JSON.stringify(assets);
};
