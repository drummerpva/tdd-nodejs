import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from '../main/config/env'

MongoHelper.connect(env.mongoURL)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server runnig att http://localhost:${env.port}`)
    )
  })
  .catch(console.error)
