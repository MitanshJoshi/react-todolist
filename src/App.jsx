import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring)
    {
      let tds=JSON.parse(localStorage.getItem("todos"))
      settodos(tds)
    }
  }, [])
  

  const setToLS=(params) => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }
  

  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    console.log(todos);
    setToLS()
  }
  
  const handleChange=(e)=>{
    settodo(e.target.value)
  }

  const handleDelete=(e,id) => {
    let newtodos=todos.filter(item=>{
      return item.id!=id
    });
    settodos(newtodos);
    setToLS()
  }

  const handleCheckbox=(e,id) => {
    let index=todos.findIndex(item=>{
      return item.id==id
    });
    let newtodos=[...todos]
    newtodos[index].isCompleted=!newtodos[index].isCompleted
    settodos(newtodos)
    setToLS()
  }
  
  
  const handleEdit=(e,id) => {
    let newtdo=todos.filter(i=>{
      return i.id==id;
    })
    settodo(newtdo[0].todo)
    let newtodos=todos.filter(item=>{
      return item.id!=id
    });
    settodos(newtodos);
    setToLS()
  }

  const toggleFinish=(e) => {
    setshowfinished(!showfinished)
  }
  

  return (
    <>
    <Navbar/>
      <div className="lg:container bg-violet-100 my-5 mx-3 lg:mx-auto rounded-xl p-5 lg:w-1/2 h-auto min-h-[80vh]">
      <h1 className='text-2xl font-bold text-center'>iTask - Manage your todos at one place</h1>
          <div className="addtoto my-5 gap-4 flex flex-col">
            <h2 className='text-xl font-bold'>Add a Todo</h2>
           <div className="flex">

            <input onChange={handleChange}  value={todo} type="text" className='w-full rounded-2xl p-1.5' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 py-1 px-2 text-white rounded-full mx-2'>Save</button>
           </div>
  
          </div>
          <input onChange={toggleFinish} type="checkbox" checked={showfinished} className='my-5'/> Show Finished
          <div className="h-[1px] bg-black opacity-15 w-[90%] my-3 mx-auto"></div>
            <h2 className='font-bold text-lg'>Your Todos</h2>
            <div className="todos">
            {todos.map(items=>{
          return (
            (showfinished || !items.isCompleted )&& <div key={items.id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-7 items-center justify-center'>
              <input onChange={(e)=>{handleCheckbox(e,items.id)}} name={items.id} type='checkbox' checked={items.isCompleted}></input>
              <div className={items.isCompleted?"line-through":""}>{items.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,items.id)}} className='bg-violet-800 hover:bg-violet-950 py-1 px-2 text-white rounded-lg mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e,items.id)}} className='bg-violet-800 hover:bg-violet-950 py-1 px-2 text-white rounded-lg mx-1'><MdDelete /></button>
            </div>
            </div>

          )
})}
</div> 
        </div>
    </>
  )
}

export default App
