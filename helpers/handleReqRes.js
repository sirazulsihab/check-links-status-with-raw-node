const url = require('url');
const {StringDecoder} = require('string_decoder');

const handler = {};

handler.handleReqRes = (req, res) => {
  // get url and parse
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const querySringObject = parsedUrl.query;
  const headerObject = req.headers;
  // Receive Body\
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
  });

  console.log(headerObject);

  res.end("Hello Programmers");
};

module.exports = handler;
