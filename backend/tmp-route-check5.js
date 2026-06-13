const { createApp } = require('./app');
const app = createApp();
const routeLayers = app.router.stack;
routeLayers.forEach((layer, idx) => {
  console.log('LAYER', idx, 'name', layer.name);
  if (layer.regexp) {
    console.log('  regexp', layer.regexp.toString());
    console.log('  fast_star', layer.regexp.fast_star, 'fast_slash', layer.regexp.fast_slash);
  }
  if (layer.route) {
    console.log('  route', layer.route.path, Object.keys(layer.route.methods).join(','));
  }
  if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    layer.handle.stack.forEach((sub, sidx) => {
      console.log('   sub', sidx, 'name', sub.name, 'regexp', sub.regexp && sub.regexp.toString());
      if (sub.route) {
        console.log('    route', sub.route.path, Object.keys(sub.route.methods).join(','));
      }
    });
  }
});
