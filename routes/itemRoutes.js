import express from "express";
import {
  getEstoque,
  addItem,
  deleteItemByID,
  updateItemByID,
  getEstoqueByID,
} from "../db.js";
const router = express.Router();

//OK-------------------------------------------------
router.get("/item", async (req, res) => {
  try {
    const message = await getEstoque();
    res.status(200).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao buscar os itens" });
  }
});
//OK-------------------------------------------------
router.get("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const message = await getEstoqueByID(id);
    console.log(id);
    if (!id) {
      return res.status(422).json({ message: "ID do item é obrigatório" });
    }
    if (message.code === "PGRST116") {
      message.exist = false;
      return res
        .status(404)
        .json({ message: "Item não encontrado", exist: false });
    } else {
      message.exist = true;
      res.status(200).json(message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao buscar o item" });
  }
});
//OK-------------------------------------------------
router.post("/item", (req, res) => {
  try {
    const { name, type, userId } = req.body;
    if (!name) {
      return res.status(422).json({ message: "O nome do item é obrigatório" });
    }
    if (!type) {
      return res.status(422).json({ message: "O tipo do item é obrigatório" });
    } else {
      addItem(name, type, userId);
      return res.status(201).json({ message: "Item Criado com Sucesso!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao criar o item" });
  }
});
//MORE OR LESS OK, Item já não existe precisa ser consertado-------------------------------------------------
router.delete("/item/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const resBD = await deleteItemByID(id);
    if (!id) {
      return res.status(422).json({ message: "ID do item é obrigatório" });
    }
    if (!resBD) {
      return res
        .status(404)
        .json({ message: "Item não encontrado", exist: false });
    } else {
      console.log(resBD);
      res.status(200).json({ message: "Item deletado com sucesso" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao deletar o item" });
  }
});
//OK-------------------------------------------------
router.put("/item/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(422).json({ message: "Nome e Tipo são obrigatórios" });
    }
    const updateStatus = await updateItemByID(id, name, type);
    if (!updateStatus) {
      return res
        .status(404)
        .json({ message: "Item não encontrado", exist: false });
    } else {
      console.log(updateStatus);
      res.status(200).json({ message: "Item atualizado com sucesso" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Erro ao atualizar o item" });
  }
});

export default router;
