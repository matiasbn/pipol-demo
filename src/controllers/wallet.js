import { newKit } from '@celo/contractkit'
import { debugControllers } from '../config/debug'
import PrivateKey from '../models/private-key'
import ERROR_MESSAGES from '../common/error-messages'

const keySize = Number(process.env.KEY_SIZE)
// Create kit
const kit = newKit('https://alfajores-forno.celo-testnet.org/')
const { web3 } = kit

const createWallet = async (request, response) => {
  try {
    debugControllers(request.body)
    const { email, phone } = request.body
    // Create crypto key for AES
    // const crypto = (web3.utils.randomHex(keySize)).replace('0x', '')

    // Create random seed for wallet
    const randomSeed = (web3.utils.randomHex(keySize)).replace('0x', '')
    debugControllers(randomSeed)

    // Create wallet
    const wallet = web3.eth.accounts.wallet.create(1, randomSeed)

    // Encrypt and store wallet
    const { privateKey } = wallet['0']
    debugControllers(privateKey)

    // Clear wallets
    web3.eth.accounts.wallet.clear()


    const privateKeys = await PrivateKey.find({ $or: [{ email }, { phone }] })
    debugControllers(privateKeys)
    if (privateKeys.length > 0) {
      response.status(401).json({ message: ERROR_MESSAGES.EMAIL_OR_PHONE_ALREADY_REGISTERED })
    } else {
      const state = new PrivateKey({ email, privateKey, phone })
      await state.save()
      response.status(200).json(state)
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

const fetchWallet = async (request, response) => {
  const projections = {
    _id: 0, privateKey: 1, email: 1, phone: 1,
  }
  try {
    const { email } = request.body
    const privateKey = await PrivateKey.findOne({ email }, projections).lean()
    if (!privateKey) {
      response.status(401).json({ message: 'private key not found for email or phone number' })
    } else {
      response.status(200).json(privateKey)
    }
  } catch (error) {
    response.status(500).json(error)
  }
}
export default {
  createWallet,
  fetchWallet,
}