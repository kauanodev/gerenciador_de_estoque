import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getEstoque() {
  let { data: Estoque, error } = await supabase.from("Estoque").select();

  if (error) {
    console.log(error);
    return error;
  } else {
    // console.log(Estoque)
    return Estoque;
  }
}

async function getEstoqueByID(id) {
  try {
    const { data: Estoque, error } = await supabase
      .from("Estoque")
      .select("*")
      .eq("id", `${id}`)
      .single();

    if (error) {
      console.log(false);
      if (error.code === "PGRST116") {
        return error;
      }
    } else {
      console.log(Estoque);
      return Estoque;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function addItem(name, type) {
  const { data: Estoque, error } = await supabase
    .from("Estoque")
    .insert([
      {
        nome_item: name,
        tipo_item: type,
        adicionado_em: new Date().toISOString(),
      },
    ])
    .select();
  if (error) {
    console.log(error);
    return error;
  } else {
    console.log(Estoque);
    return console.log("Item adicionado com sucesso");
  }
}

async function updateItemByID(id, name, type) {
  const { data: Estoque, error } = await supabase
    .from("Estoque")
    .update({ nome_item: name, tipo_item: type })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    return error;
  } else {
    if (Estoque.length === 0) {
      return false;
    }
    console.log(Estoque);
    return true;
  }
}

async function deleteItemByID(id) {
  try {
    const { error } = await supabase.from("Estoque").delete().eq("id", id);

    if (error) {
      console.log(error);
      if (error.code === "PGRST116") {
        return false;
      } else {
        return error;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export {
  supabase,
  getEstoque,
  addItem,
  deleteItemByID,
  updateItemByID,
  getEstoqueByID,
};
