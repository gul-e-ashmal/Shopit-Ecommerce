const CatchAsyncAwait = (resolveFunction) => {
    return (req, res, next) => {
        Promise.resolve(resolveFunction(req, res, next))
            .catch((error) => { console.log(error); next(error) })
    }

}

module.exports = CatchAsyncAwait;