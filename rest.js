module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        console.log('restify applyyed')
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                    ctx.response.status = 200
                }
                try {
                    await next();
                } catch (e) {
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {
                await next();
            }
        };
    }
};
