class CreateImageDTO {
    constructor(referencia, titulo) {
      this.referencia = referencia;
      this.titulo = titulo;
    }
  }
  
  class UpdateImageDTO {
    constructor(referencia, titulo) {
      this.referencia = referencia;
      this.titulo = titulo;
    }
  }
  
  module.exports = { CreateImageDTO, UpdateImageDTO };
  