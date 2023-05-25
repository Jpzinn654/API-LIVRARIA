const express = require('express');

const upload = require("../helpers/upload/uploadImagem")
const deleteImagem = require("../helpers/upload/deleteImagem")
const modelLivro = require('../model/modelLivro');

const router = express.Router();

router.post('/cadastrarLivro', upload.array('imagem', 2), (req, res)=>{
    console.log(req.body);
    console.log(req.files[0]);
    console.log(req.files[1]);
    //  res.send("teste upload:")
    
    let { titulo, preco, detalhes, tblCategoriumCodCategoria } = req.body;
    
    let imagen_peq = req.files[0].path;
    let imagen_grd = req.files[1].path;

    modelLivro.create(
        {
            titulo,
            preco,
            imagen_peq,
            imagen_grd,
            detalhes,
            imagen_peq,
            imagen_grd,
            tblCategoriumCodCategoria
        }
    )
    .then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:'Livro inserido com sucesso.'
            });      
        }
    ).catch((erro)=>{
        return res.status(400).json({
            erroStatus: true,
            erroMensagem: erro
        });
    });

});

router.get('/listarLivro', (req, res)=>{

    modelLivro.findAll()
        .then((livros)=>{
            return res.status(200).json(livros)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/listarLivroCodigo/:id', (req, res)=>{

    const { id } = req.params

    modelLivro.findByPk(id)
        .then((livro)=>{
            return res.status(200).json(livro)
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });
});

router.get('/excluirLivro/:id', (req, res)=>{

    const { id } = req.params;

    modelLivro.findByPk(id)

        .then((livro)=>{

            let imagen_grd = livro.imagen_grd;
            let imagen_peq = livro.imagen_peq;

            // console.log("Imagem Grande" + imagen_grd )
            // console.log("Imagem peq" + imagen_peq)
            // res.send('teste de exclusão de imagens')

            modelLivro.destroy({
                where:{cod_livro:id}
            }).then(
                ()=>{

                    //EXCLUSÃO DE ARQUIVOS

                    deleteImagem(imagen_grd);
                    deleteImagem(imagen_peq);

                    return res.status(200).json({
                        erroStatus:false,
                        mensagemStatus:'Livro excluído com sucesso.'
                    });

                }).catch((erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMensagem: erro
                    });
                });

        });

});

router.put('/editarLivro', (req, res)=>{

    const { titulo, preco, detalhes, imagen_peq, imagen_grd, tblCategoriaumId, id } = req.body;

    /** UPDATE SEM IMAGEM **/
    modelLivro.update(
        {titulo,
        preco,
        detalhes,
        imagen_peq, 
        imagen_grd,
        tblCategoriaumId},
        {where: {id}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:'Livro alterado com sucesso.'
            });
        }).catch((erro)=>{
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro
            });
        });

});

module.exports = router;