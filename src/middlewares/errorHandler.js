
const notFound = (req, res, next) => {
    const err = new Error(`Không tìm thấy đường dẫn : ${req.originalUrl}`)
    res.status(404)
    next(err)
}

const errHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        mess: err?.message,
        status: false
    })
    console.log(err?.stack, 15)
}
export { notFound, errHandler }
