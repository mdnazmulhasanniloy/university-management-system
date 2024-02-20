import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../interfaces/error'
import ApiError from '../errors/api.errors'
import config from '../config'
import HandleValidationError from './handelValidationError'
import { errorLogger } from '../shared/logger'

// ErrorHandler.js
const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.nod_env === 'development'
    ? console.error('global error handler ~ ', error)
    : errorLogger.error('global error handler ~ ', error)

  let statusCode: number | string = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (error instanceof ApiError) {
    statusCode = error.statusCode | 500
    message = error.message || 'Internal Server Error'
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  } else if (error.name === 'ValidationError') {
    const simplifiedError = HandleValidationError(error)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message || 'Validation Error'
    errorMessages = simplifiedError?.errorMessages || []
  } else if (error instanceof Error) {
    statusCode = error?.statusCode | 500
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }
  next()

  res.json({
    success: false,
    status: statusCode,
    message: message,
    errorMessages,
    stack: config?.nod_env !== 'production' ? error.stack : null,
  })
}

export default ErrorHandler
