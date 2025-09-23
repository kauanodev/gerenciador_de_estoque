
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)





async function getEstoque() {
let { data: Estoque, error } = await supabase
  .from('Estoque')
  .select()

  if (error) {
    console.log(error)
    return error
  } else {
  
    // console.log(Estoque)
    return Estoque
  }}

// async function getEstoqueID(id) {
// let { data: Estoque, error } = await supabase
//   .from('Estoque')
//   .select(`${id}`)

//   if (error) {
//     console.log(error)
//   } else {
//     console.log(Estoque)
//   }}
async function addItem(name,type){
  const { data:Estoque, error } = await supabase
  .from('Estoque')
  .insert([
    { nome_item: name, tipo_item: type ,adicionado_em: new Date().toISOString()}
  ])
  .select()
   if (error) {
    console.log(error)
    return error
  } else {
    console.log(Estoque)
    return console.log("Item adicionado com sucesso") 
  }
}

// TODO arrumar o update
async function updateItemByID(id, name,type){
  const { data:Estoque, error } = await supabase
  .from('Estoque')
  .update({ 
     nome_item: name,
     tipo_item: type ,
     adicionado_em: new Date().toISOString()})
  .eq('tipo_item', id)
  .select()
   if (error) {
    console.log(error)
    return error
  } else {
    console.log(Estoque)
    return console.log("Item atualizado com sucesso ") 
  }
}

async function deleteItemByID(id){
  const { error } = await supabase
  .from('Estoque')
  .delete()
  .eq('id', id)
    if (error) { 
    console.log(error)
    return error
  } else {
    return console.log("Item deletado com sucesso")
     }
}

  export {supabase, getEstoque,addItem, deleteItemByID, updateItemByID}