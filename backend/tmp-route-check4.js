const { createApp } = require('./app');
const app = createApp();
const routeLayers = app.router.stack;
routeLayers.forEach((layer, idx) => {
  console.log('LAYER', idx, 'name', layer.name, 'regexp', layer.regexp && layer.regexp.source);
  if (layer.route) {
    console.log('  route', layer.route.path, Object.keys(layer.route.methods).join(','));
  }
  if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    layer.handle.stack.forEach((sub, sidx) => {
      if (sub.route) {
        console.log('   sub', sidx, sub.route.path, Object.keys(sub.route.methods).join(','));
      } else {
        console.log('   sub', sidx, sub.name, sub.regexp && sub.regexp.source);
      }
    });
  }
});
