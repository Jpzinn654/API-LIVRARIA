const fs = require('fs');

const deleteImagem = (imagem) => {
    fs.unlink(imagem, (error)=>{
        if (error) {
            console.log('Erro de exclusão de imagens: ' + error)
        } else {
            console.log('Imagem exlcuida com sucesso')
        }
    });
}


module.exports = deleteImagem;