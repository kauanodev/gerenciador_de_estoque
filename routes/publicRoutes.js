import express from 'express'
const router = express.Router()



router.get('/', (req,res)=>{
    res.status(200)
    res.send('Rota pública').json({message: 'Rota pública'})
})

router.post('/cadastro', (req,res)=>{
    const {nome, email, senha} = req.body
    if(!nome ){
        return res.status(422).json({message: 'O nome é obrigatório'})
    }
    if(!email ){
        return res.status(422).json({message: 'O email é obrigatório'})
    }
    if(!senha){
        return res.status(422).json({message: 'O senha é obrigatório'})
    }
    else{
        return res.status(201).json({message: 'Usuário criado com sucesso!'})
    }
})
    
export default router