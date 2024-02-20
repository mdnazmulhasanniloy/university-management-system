import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'
import { IGenericErrorResponse } from '../interfaces/common'

const HandleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )

  const statusCode = 400
  // Create an IGenericErrorResponse with an array of error messages
  const response: IGenericErrorResponse = {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }

  // Do something with the response object, or return it if needed
  return response
}

export default HandleValidationError
