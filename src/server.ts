import mongoose from 'mongoose'
import config from './config/index'
import app from './app'
import { errorLogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config?.mongo_uri)
    logger.info(`database connection successful`)
    app.listen(config?.port, () => {
      logger.info(`server started on port ${config?.port}`)
    })
  } catch (error) {
    errorLogger.error(`failed to connect database`, error)
  }
}

main()
