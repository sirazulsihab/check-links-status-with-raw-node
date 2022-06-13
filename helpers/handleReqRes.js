// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFound } = require("../handlers/routeHandlers/notFound");



const handler = {};

handler.handleReqRes = (req, res) => {
  // get url and parse
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const querySringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimedPath,
    method,
    querySringObject,
    headerObject,
  };
  // Receive Body\
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  const chosenHandler = routes[trimedPath] ? routes[trimedPath] : notFound;

  chosenHandler(requestProperties, (statusCode, payload) => {
    statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
    payload = typeof(payload) === 'object' ? payload : {};

    const payloadString = JSON.stringify(payload);

    res.writeHead(statusCode)
    res.end(payloadString)
  });

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    // console.log(realData);
    // res.end("Hello Programmers");
  });



  
};

module.exports = handler;
