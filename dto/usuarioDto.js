class CreateUsuarioDTO {
    constructor(nome) {
      this.nome = nome
    }
  }
  
  class UpdateUsuarioDTO {
    constructor(nome) {
      this.nome = nome
    }
  }
  
  module.exports = { CreateUsuarioDTO, UpdateUsuarioDTO };
  