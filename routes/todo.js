const { Router } = require("express")
const router = Router()
const connection = require("../bd/mysql")

router.get("/", (req, res) => {
  const sql = "SELECT * FROM todos"

  connection.query(sql, (err, result) => {
    if(err) throw err
    res.render("home", { home: true, title: "Todos", todos: result.reverse() })
  })
})

router.get("/create", (req, res) => {
  res.render("create", { create: true, title: "Create" })
})

router.post("/create", (req, res) => {
  if (!req.body) return sendStatus(400);
  const sql = `INSERT INTO todos(title, executed) VALUES('${req.body.title}', false) `

  connection.query(sql, (err, result) => {
    if(err) throw err
  })
  res.redirect("/")
})

router.post("/executed", (req, res) => {
  if (!req.body) return sendStatus(400);

  if(req.body.delete) {
    const sql = `DELETE FROM todos WHERE id=${req.body.id}`
    connection.query(sql, (err, result) => {
      if(err) throw err
    })
    res.redirect("/")
  } else {
    const sql = `UPDATE todos SET executed=${req.body.executed ? 1 : 0 } WHERE id=${req.body.id }`
    connection.query(sql, (err, result) => {
      if(err) throw err
    })
    res.redirect("/")
  }
})

module.exports = router
