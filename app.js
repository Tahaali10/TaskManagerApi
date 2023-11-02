const express = require("express")
const app = express();
const port = process.env.port || 8000

app.use(express.json());


const allTasks = [
//     {
//     id: "1",
//     task: "Cleaning",
//     description: "Home Cleaning",
//     completed: false
// },
// {
//     id: "2",
//     task: "Eating",
//     description: "Home Eating",
//     completed: false
// },
]

app.get('/tasks', (req, res) => {
    res.json(allTasks);
})

app.get('/tasks/:id', (req, res) => {
    const taskId = req.params.id; 
    const foundTask = allTasks.find((t) => t.id === taskId); 
    if (!foundTask) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(foundTask);
})

app.post('/tasks/new',(req,res)=>{
    const newTask=req.body;
    allTasks.push(newTask);
    res.status(201).json(newTask);
})

app.put('/tasks/:id',(req,res)=>{
    const taskId = req.params.id; 
    const updateTask=req.body
    const taskIndex = allTasks.find((t) => t.id === taskId); 
    if(taskIndex===-1){
        return res.status(404).send('The task with the given ID was not found')
    }
    allTasks[taskIndex]=updateTask;
    res.json(updateTask)
})

app.delete('/tasks/:id',(req,res)=>{
    const taskId = req.params.id; 
    const taskIndex = allTasks.find((t) => t.id === taskId); 
    if(taskIndex===-1){
        return res.status(404).send('The task with the given ID was not found')
    }
   const deleteTask=allTasks.splice(taskIndex,1)[0];
   res.json(deleteTask)
})

app.listen(port, () => {
    console.log(`your app is runing on http://localhost:${port}`)
})

