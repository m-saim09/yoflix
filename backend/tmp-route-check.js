const { createApp } = require('./app');
const app = createApp();
const routes = [];
app._router.stack.forEach((mw) => {
  if (mw.route) {
    routes.push({ path: mw.route.path, methods: Object.keys(mw.route.methods).join(',') });
  } else if (mw.name === 'router' && mw.handle && mw.handle.stack) {
    mw.handle.stack.forEach((handler) => {
      if (handler.route) {
        routes.push({ prefix: mw.regexp && mw.regexp.source, path: handler.route.path, methods: Object.keys(handler.route.methods).join(',') });
      }
    });
  }
});
console.log(JSON.stringify(routes, null, 2));
