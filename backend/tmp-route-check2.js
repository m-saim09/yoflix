const { createApp } = require('./app');
const app = createApp();
console.log('hasUse', typeof app.use);
console.log('router', app._router);
console.log('keys', Object.keys(app));
console.log('prototype', Object.getPrototypeOf(app));
if (app._router) {
  console.log('stack length', app._router.stack && app._router.stack.length);
}
