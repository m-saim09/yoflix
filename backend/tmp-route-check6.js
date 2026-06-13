const { createApp } = require('./app');
const app = createApp();
const routeLayers = app.router.stack;
routeLayers.forEach((layer, idx) => {
  console.log('LAYER', idx, 'name', layer.name, 'path', layer.path, 'mountpath', layer.mountpath, 'regexp', layer.regexp && layer.regexp.toString());
  if (layer.route) {
    console.log('  route', layer.route.path, Object.keys(layer.route.methods).join(','));
  }
  if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    layer.handle.stack.forEach((sub, sidx) => {
      console.log('   sub', sidx, 'name', sub.name, 'path', sub.path, 'mountpath', sub.mountpath, 'regexp', sub.regexp && sub.regexp.toString());
      if (sub.route) {
        console.log('    route', sub.route.path, Object.keys(sub.route.methods).join(','));
      }
    });
  }
});
