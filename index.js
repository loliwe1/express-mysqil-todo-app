const express = require("express")
const path = require("path")
const todoRouter = require("./routes/todo")
const exphbs = require("express-handlebars")
const mysql = require("./bd/mysql")

const PORT = process.env.PORT || 3000

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  partialsDir  : [ path.join(__dirname, "views/particals") ]
})
const app = express()


app.use(express.urlencoded( { extended: false } ))
app.use(todoRouter)
app.use("/public", express.static("public"))
app.engine(".hbs", hbs.engine)
app.set("view engine", ".hbs")

const start = async () => {
  try {
    await mysql.connect((err) => {
      if (err) {
        console.error("error connecting: " + err.stack);
        throw err
      }
      console.log("connected as id " + mysql.threadId);
    })

  }catch (e) {
    console.log(e)
  }
}

start()

app.listen(PORT, ()=> {
  console.log("Server has been started!")
})

