import appRootPath from 'app-root-path'
import dotenv from 'dotenv'
import Joi from '@hapi/joi'

dotenv.config({
  path: `${appRootPath.path}/test/.env`,
})

const environmentVarsSchema = Joi.object({
  NODE_ENV: Joi.string().required().valid('test').default('test'),
  MONGO_URI: Joi.string().required(),
  KEY_SIZE: Joi.string().required(),
})
  .unknown()
  .required()

const { error } = environmentVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}