// import { NextFunction, Request, Response } from 'express'
// import config from '../config'

// // ErrorHandler.js
// const ErrorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
//   const errStatus = err.statusCode || 500
//   const errMsg = err.message || 'Something went wrong'
//   res.status(errStatus).json({
//     success: false,
//     status: errStatus,
//     message: errMsg,
//     stack: config.nod_env === 'development' ? err.stack : undefined,
//   })
// }

// module.exports = ErrorHandler
