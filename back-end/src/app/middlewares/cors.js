module.exports = (request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Max-Age', '10');
  next();
};

/*
  wildcard to allow any origin to access the API: '*' on the second argument of setHeader

  headers are case insensitive

  SOP -> Same Origin Policy
  (https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)

  CORS -> Cross Origin Resource Sharing
  (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

  Origin: protocol://domain:port

  Valid SOP -> ORIGIN and DESTINY: http://localhost:3000;

  The CORS happen every time we "hurt" the SOP,
  for example, an origin http://localhost:3000
  requesting to the destiny http://localhost:3001.

  To fix that, we need to create a middleware to handle with this CORS errors
  and pass a Header. (see file middlewares/cors.js)

  Preflight -> A CORS preflight request is a CORS request that checks to see if the CORS
  protocol is understood and a server is aware using specific methods and headers.
  (https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

  Access-Control-Max-Age -> header that indicates how long the results of preflight
  requests can be cached
*/
