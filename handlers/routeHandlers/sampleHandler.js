const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties)
    callback(200, {
        message:'This is Sample Route'
    })
};

module.exports = handler;