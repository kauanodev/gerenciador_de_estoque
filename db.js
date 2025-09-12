
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


getEstoqueID()

async function getEstoqueID(id) {
let { data: Estoque, error } = await supabase
  .from('Estoque')
  .select(`${id}`)

  if (error) {
    console.log(error)
  } else {
    console.log(Estoque)
  }}