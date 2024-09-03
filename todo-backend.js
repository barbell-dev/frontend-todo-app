const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
let log = console.log;
app.get("/api/sasta-notion/get", function (req, res) {
  fs.readFile("todos.json", "utf-8", function (err, data) {
    if (err || data.trim() == "" || data == "[]") {
      let todos = [];
      // console.log("here");
      fs.writeFile("todos.json", JSON.stringify(todos), () => {
        console.log(todos);
        res.json({ todoList: todos, msg: "Todo list is empty." });
      });
    } else {
      log(JSON.parse(data));
      res.json({ todoList: JSON.parse(data) });
    }
  });
});
//todos.json structure.
/*
    [<list of todos>]
*/
app.put("/api/sasta-notion/put", function (req, res) {
  fs.readFile("todos.json", "utf-8", function (err, data) {
    if (err) {
      res.json({ message: "File not found." });
      return;
    } else {
      const index = req.body.index;
      log(typeof index);
      const oldTodo = req.body.oldTodo;
      const newTodo = req.body.newTodo;
      const jsonData = JSON.parse(data);
      jsonData[index] = newTodo;
      log(jsonData);
      fs.writeFile("todos.json", JSON.stringify(jsonData), () => {
        log("Done");
      });
      // let FOUND = 0;
      // for (let i = 0; i < jsonData.length; i++) {
      //   if (jsonData[i].id == id) {
      //     let todoList = jsonData[i].todos;
      //     let found = 0;
      //     for (let j = 0; j < todoList.length; j++) {
      //       if (todoList[j].todo == oldTodo) {
      //         todoList[j].todo = newTodo;
      //         jsonData[i].todos = todoList;
      //         fs.writeFile("todos.json", JSON.stringify(jsonData), () => {
      //           res.json({ message: "Done" });
      //         });
      //         found = 1;
      //         FOUND = 1;
      //       }
      //     }
      //     if (found == 0) {
      //       FOUND = 1;
      //       res.json({ message: "Todo not found for that ID." });
      //       break;
      //     }
      //   }
      // }
      // if (FOUND == 0) {
      //   res.json({ message: "ID not found." });
      // }
    }
  });
});
app.post("/api/sasta-notion/post", function (req, res) {
  console.log(req.body);
  // const id = req.body.id;
  const todo = req.body.todo;
  console.log("here");
  // fs.writeFile("todos.json","utf")
  fs.readFile("todos.json", "utf-8", function (err, data) {
    if (err) {
      // let temp = {};
      let data = [];
      // temp.id = id;
      // temp.todos = [];
      // let smallerObject = {};
      // smallerObject.todoID = 1;
      // smallerObject.todo = todo;
      // temp.todos.push(smallerObject);
      data.push(todo);
      fs.writeFile("todos.json", JSON.stringify(data), () => {
        res.json({ statuscode: 200, msg: `Todo ${todo} has been added.` });
      });
    } else {
      if (data == "[]") {
        // log(data);
        // let data = [];
        // let temp = {};
        // temp.id = id;
        // temp.todos = [];
        // let smallerObject = {};
        // smallerObject.todoID = 1;
        // smallerObject.todo = todo;
        // temp.todos.push(smallerObject);
        let temp = JSON.parse(data);
        temp.push(todo);
        fs.writeFile("todos.json", JSON.stringify(temp), () => {
          res.json({ statuscode: 200, msg: `Todo ${todo} has been added.` });
        });
      } else {
        let temp = JSON.parse(data);
        // let found = 0;
        temp.push(todo);
        fs.writeFile("todos.json", JSON.stringify(temp), () => {
          `Todo ${todo} has been added.`;
        });
        // if (found == 0) {
        //   let dataTemp = JSON.parse(data);
        //   let temp = {};
        //   temp.id = id;
        //   temp.todos = [];
        //   let smallerObject = {};
        //   smallerObject.todoID = 1;
        //   smallerObject.todo = todo;
        //   temp.todos.push(smallerObject);
        //   dataTemp.push(temp);
        //   fs.writeFile("todos.json", JSON.stringify(dataTemp), () => {
        //     res.json({ statuscode: 200, msg: `Todo ${todo} has been added.` });
        //   });
        // }
      }
    }
  });
});
app.delete("/api/sasta-notion/delete", function (req, res) {
  const id = req.body.id;
  const todo = req.body.todo;
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err || data == "[]" || data.trim() == "") {
      res.json({ msg: "File not found or file is empty. Cannot delete" });
      return;
    } else {
      let jsonData = JSON.parse(data);
      let FOUND = 0;
      for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].id == id) {
          // log("here");
          let found = 0;
          let todoList = jsonData[i].todos;
          // if(todoList)
          for (let j = 0; j < todoList.length; j++) {
            if (todoList[j].todo == todo) {
              todoList.splice(j, 1);
              jsonData[i].todos = todoList;
              fs.writeFile("todos.json", JSON.stringify(jsonData), () => {
                res.send("Deleted.");
              });
              found = 1;
              FOUND = 1;
              break;
            }
          }
          if (found == 0) {
            FOUND = 1;
            res.send("Couldnt find todo for that ID.");
            break;
          }
        }
      }
      if (FOUND == 0) {
        res.send("Couldnt find ID");
        return;
      }
    }
  });
});
app.listen(3000, () => {
  log("Listening on 3000");
});
