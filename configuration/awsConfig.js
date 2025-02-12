const AWS = require('aws-sdk');

// Configuração das credenciais AWS
AWS.config.update({
  region: 'us-east-1',  // Substitua pela sua região
  accessKeyId: '',
  secretAccessKey: ''
});

export default AWS;