import express from 'express'
import { getEstoque, addItem, deleteItemByID, updateItemByID} from '../db.js'
const router = express.Router()

//OK-------------------------------------------------
router.get('/item', async (req,res)=>{
    const message = await getEstoque()
   res.status(200).json(message)
})



router.get('/item/:id', (req,res)=>{
    res.status(200)
    res.send('Rota pública').json({message: 'Rota pública'})
})


//OK-------------------------------------------------
router.post('/item', (req,res)=>{
    const {name, type, userId} = req.body
    if(!name){
        return res.status(422).json({message: 'O nome do item é obrigatório'})
    }
    if(!type){
        return res.status(422).json({message: 'O tipo do item é obrigatório'})
    }
    else{
        addItem(name, type, userId)
        return res.status(201).json({message: 'Item Criado com Sucesso!'})
    }
})


router.delete('/item/:id', async(req,res)=>{
    const id = req.params.id
    await deleteItemByID(id)
    res.status(200).json({message: 'Item deletado com sucesso'})
})

// TODO arrumar put
router.put('/item/:id', async (req,res)=>{
    const id = req.params.id
    const name = req.params.name
    const type = req.params.type
    await updateItemByID(id, name,type)
    res.status(200).json({message: 'Item atualizado com sucesso'})
})
    
export default router