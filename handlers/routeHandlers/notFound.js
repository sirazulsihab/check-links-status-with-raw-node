const handler = {};

handler.notFound = (requestProperties, callback) => {
    
    callback(404, {
        message:'Page Not Found'
    })
}

module.exports = handler