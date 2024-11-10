export default class AutheticationError extends Error {
  constructor(message = "Authetication error"){
    super(message)
    this.name = 'AutheticationError'
  }
}