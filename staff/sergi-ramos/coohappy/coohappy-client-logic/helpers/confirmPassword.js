import { CredentialsError } from 'coohappy-commons/errors'

module.exports = (newPassword, newPasswordConfirm) => {

    if (newPassword !== newPasswordConfirm)  throw new CredentialsError('confirm password are wrong')
}