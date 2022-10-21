import "./App.css";
import { useState, useEffect} from "react";
import {Task} from "./Task"

function App() {
  // const [todoList, setTodoList] = useState([]);

  const [todoList, setTodoList] = useState(()=>{
    const saved=localStorage.getItem('key1')
    const savedvalues=JSON.parse(saved)
    return savedvalues
  });


  const [newTask, setNewTask] = useState("");



  const handleChange = (event) => {
    setNewTask(event.target.value);
  };


  useEffect(()=>{
     
    window.localStorage.setItem("key1",JSON.stringify(todoList))},
    [todoList]);

    useEffect(()=>{
      const mydata = window.localStorage.getItem('key1');
      if (mydata)
      setTodoList(JSON.parse(mydata))}
    ,[]);

  // since we can't add the data in array or list in react using normal list or array methods
  // we have to modify the state of the list here, so we have to use a set method to modify the state of the already existing array.
  const addTask = () => {
    // triple dots in react mean include everything that is present in in the list and add to the newTask.
    //const newTodoList = [...todoList, newTask];
    //setTodoList(newTodoList);

    const task={
      id: todoList.length ===0 ? 1 :   todoList[todoList.length-1].id+1,
      taskName: newTask,
      completed: false,
    };


    setTodoList([...todoList,task]);
    // we can use the above code block as well this is simpler and shorter way to achive the task that is
    // to add exiting list task with a newt task
  };

  // const completeTask = (id) => {
  //   setTodoList(
  //     todoList.map((task)=>{
  //       if(task.id === id){
  //         return{...task,completed:true};
  //       } 
  //       else{
  //         return task;
  //       }
  //     })
  //   )
  //   }
  const completeTask = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        } else {
          return task;
        }
      })
    );
  };



  const deleteTask=(id)=>{
    // const newTodoList = todoList.filter((task)=> task!== taskName); 

    // const newTodoList = todoList.filter((task) =>{
    //   if (task === taskName){
    //     return false;}
    //   else{
    //     return true;}
      // })

      // setTodoList(newTodoList);
      setTodoList(todoList.filter((task)=> task.id !== id));
    

  };

  return (
    <div className="App">
      <div className="addTask">
        <input onChange={handleChange} /> <button onClick={(addTask)}>Add Task </button>
        {/* in react when we use a function on click that uses some parameters we have to put it like ()=>funciton, so it call a function that does a certain task. */}
      </div>
      <div className="list">
        {todoList.map((task) => {
          // return (<div><h1> {task.taskName} </h1><button onClick={()=> deleteTask(task.id)}>X</button></div>);
          return ( 
          <Task 
          taskName={task.taskName} 
          id={task.id} 
          completed={task.completed}
          deleteTask={deleteTask} 
          completeTask={completeTask} />);
        })}
      </div>
    </div>
  );
}

export default App;
