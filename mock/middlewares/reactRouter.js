const fs = require('fs')

module.exports = () => {
  return async (ctx, next) => {
    await next();
    const request = ctx.request.url.split('/');
    if(
        request.indexOf('api') == -1 && 
        request.indexOf('css') == -1 && 
        request.indexOf('js') == -1 && 
        request.indexOf('img') == -1 && 
        request.indexOf('fonts') == -1
    ){
        ctx.status = 200;
        ctx.type = 'html';
        ctx.body = fs.readFileSync('./dist/index.html', 'utf8');
    }
    
  };
}
