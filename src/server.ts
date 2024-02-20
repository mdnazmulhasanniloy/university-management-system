import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'

async function main() {
  let server: Server
  try {
    await mongoose.connect(config?.mongo_uri)
    logger.info(`database connection successful`)
    server = app.listen(config?.port, () => {
      logger.info(`server started on port ${config?.port}`)
    })
  } catch (error) {
    errorLogger.error(`failed to connect database`, error)
  }

  // process.on('unhandledRejection', error => {
  //   console.log(`Unhandled rejection detected: ${error}`)

  //   // Log the error before attempting to close the server
  //   errorLogger.error(error)

  //   // Close the server gracefully
  //   server.close(() => {
  //     console.log('Server closed')
  //     process.exit(1)
  //   })
  // })

  //unhandled Rejection detected
  process.on('unhandledRejection', error => {
    console.log(`Unhandled rejection detected: ${error}`)
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
