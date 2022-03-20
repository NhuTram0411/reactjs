import TodoList from "./component/Todolist";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState } from 'react';
import { v4 } from 'uuid';



function App() {

  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState();

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback((e) =>{
    setTodoList([
       
      {id:v4(), name: textInput, isCompleted: false},...todoList
      ]);

    setTextInput("");
  },[textInput, todoList]);

  const onCheckBtnClick = useCallback((id)=>{
    setTodoList(prevState => prevState.map(todo=> todo.id === id ? {...todo, isCompleted:true}: todo))
  }, []);


  const adminUser = [
    {
      email: "admin@gmail.com",
      password: "admin",
    },
  ];

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
    for(let h of adminUser){
      if (details.email === h.email && details.password === h.password){
        console.log("Đăng nhập thành công");
        setUser({
            name: details.name,
            email: details.email
        });
  
      }else{
        console.log("Đăng nhập thất bại");
      }
    }
  
  }

  
  return (
    <div>
      {/* {(user.email !== "") ? ( */}
        <div className="welcome"> 
            <h3>Danh sách cần làm</h3>
            <Textfield name="add-Todo" placeholder="Thêm việc cần làm" elemAfterInput={
              <Button isDisabled={!textInput} appearance ="primary" onClick={onAddBtnClick}>Thêm</Button>
              }
              css= {{padding:'2px 4px 2px'}}
              value = {textInput}
              onChange = {onTextInputChange}
              ></Textfield>
          {/* <button>Logout</button> */}
        </div>
      {/* ): (  */}
        {/* <Login Login={Login} error={error}/> */}
      {/* )} */}
      

      <TodoList todoList = {todoList} onCheckBtnClick={onCheckBtnClick}/>
    </div>
  );
}

export default App;
