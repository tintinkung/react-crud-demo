import express from 'express'
import cors from 'cors'
import mariadb from 'mariadb'

const app = express()

const db = mariadb.createPool({
    host: "localhost",
    port: "3306",
    user: "######",
    password: "######",
    database: "######",
    connectionLimit: 5
})


// to send from html body
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.json("Hello World")
})

// GET handler
app.get("/users",(req,res)=>{
    const q = "SELECT * FROM users"
    db.getConnection()
    .then(conn => {
        conn.query(q)
        .then((response) => {
          console.log(response);
          res.json(response)
          conn.end();
        })
        .catch(err => {
          //handle error
          console.log(err); 
          res.json(err)
          conn.end();
        })
    }).catch(err => {
        //not connected
        db.end();
    });
})

// POST handler
app.post("/users",(req,res)=>{
    const q = "INSERT INTO users (`name`,`email`,`age`,`phone`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.phone
    ]

    db.getConnection()
    .then(conn => {
        conn.query(q,[values])
        .then((response) => {
            console.log(response);
            res.json("User has been added.")
            conn.end();
            //db.end();
          })
          .catch(err => {
            console.log(err); 
            res.json(err)
            conn.end();
            //db.end();
          })
    }).catch(err => {
        db.end();
    });

})

app.delete("/users/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM users WHERE id=?"

    db.getConnection()
    .then(conn => {
        conn.query(q,[bookId])
        .then((response) => {
            console.log(response);
            res.json("User has been deleted.")
            conn.end();
          })
          .catch(err => {
            console.log(err); 
            res.json(err)
            conn.end();
          })
    }).catch(err => {
        db.end();
    });
})

app.put("/users/:id", (req,res)=>{
    const bookId=req.params.id;
    const q="UPDATE users SET `name`=?,`email`=?,`age`=?,`phone`=? WHERE id=?"
    const values=[
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.phone
    ]

    db.getConnection()
    .then(conn => {
        conn.query(q, [...values, bookId])
        .then((response) => {
            console.log(response);
            res.json("User has been updated.")
            conn.end();
          })
          .catch(err => {
            console.log(err); 
            res.json(err)
            conn.end();
          })
    }).catch(err => {
        db.end();
    });
})

app.listen(8800,()=>{
    console.log("Connected to backend.")
})