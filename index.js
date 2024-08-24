import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  password: "root",
  database: "Web Dev",
  host: "localhost",
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function add_data(task) {
  const result = await db.query("insert into to_do (title) values($1)",[task])
  console.log("New task is created successfully!",task)
}

async function fetch_data() {
  const result = await db.query("select * from to_do")
  const tasks = [];
  result.rows.forEach((task)=>{
    tasks.push(task)
  })
  console.log(tasks)
  return (tasks)
}

async function delete_task(id) {
  const result = await db.query("delete from to_do where id= $1",[id])
  console.log("task is deleted successfully.")
}

async function update_task(id,task) {
  const result = await db.query("update to_do set title=$1 where id=$2",[task,id])
  console.log("Task is Updated.")
}

app.get("/",async (req, res) => {
  try{
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: await fetch_data(), 
    });
  }catch(err){
    console.log(err)
  }
});

app.post("/add", (req, res) => {
  try{
    const item = req.body.newItem;
    add_data(item)
    res.redirect("/");
  }catch(err) {
    console.log(err)
  }
});

app.post("/edit", (req, res) => {
  try{
    const id = req.body.updatedItemId
    const task = req.body.updatedItemTitle
    update_task(id,task);
    res.redirect("/")
  }catch(err){
    console.log(err)
  }
});

app.post("/delete", (req, res) => {
  try{
    const id = req.body.deleteItemId;
    delete_task(id)
    res.redirect("/")
  }catch(err){
    console.log(err)
  }
});

app.listen(port, () => {
  console.log(`Server running on port  http://localhost:${port}`);
});
