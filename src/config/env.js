import appRootPath from 'app-root-path'
import dotenv from 'dotenv'
import Joi from '@hapi/joi'
import envSchema from '../common/env-schema'

dotenv.config({
  path: `${appRootPath.path}/.env`,
})

const environmentVarsSchema = Joi.object(envSchema())
  .unknown()
  .required()

const { error } = environmentVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
