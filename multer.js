// utilizando o multer podemos gerenciar facilmente a manipulação de
// multipart/multipart/from-data com este middleware
const crypto = require('crypto')
const multer = require('multer')
// arquivos de configurações do multer
module.exports ={
   // gera uma hash de caracteres para não conter dois arquivos com mesmo nome no 
  // diretorio
  //storage : multer.diskStorage(
  //destintation ->recebe uma função com req,file e callback
  //no callback o retorno é o diretório 
  //
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null,'img')
    },
  // filename utilizado para dar o nome do arquivo antes de fazer o upload
  //é aconselhavel tratar essa função com a biblioteca nativa do node crypto
  // neste exemplo gerei uma chave de 8 bits e em seguida concatenei com o nome 
  //original do arquivo
  filename: (req, file, callback) => {
    crypto.randomBytes(8, (err, hash) => {
      if (err)
        return callback(err)
      const filename = `${hash.toString('hex')}- ${req.originalname} `
      callback(null, filename)
    })
  },
  // define o tamanho do arquivo
  limits: {
    filesize: 5 * 1024 * 1024 //equivalente a 5 mb
  },
  //define o tipo de arquivo
  fileFilter: (req, file, callback) => {
    const archiveAccept=
      ['image/jpg',
      'image/jpeg',
      'image/png']
    if (archiveAccept.includes(file.mimetype)) {
      callback(null,true)
    }
    else {
      callback(new Error('Archive invalid!'))
    }
  }
  
}) 
}