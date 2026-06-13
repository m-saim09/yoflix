const { createApp } = require('./app');
const app = createApp();
console.log('hasUse', typeof app.use);
console.log('router exists', app.router ? true : false);
console.log('router keys', app.router ? Object.keys(app.router) : null);
if (app.router && app.router.stack) {
  console.log('stack len', app.router.stack.length);
  app.router.stack.forEach((mw, idx) => {
    console.log(idx, mw.route ? mw.route.path : mw.name, mw.route ? Object.keys(mw.route.methods).join(',') : '');
  });
}
