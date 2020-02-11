import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Redirect } from "react-router-dom";

function Login(){
    const userObj = {
        userName:'',
        password:''
    };
    
    let [user,setUser] = useState(userObj);
    let [userList,setUserList] = useState([]);
    let [isLogin,setIsLogin] = useState(false);


    const handleInputChange = (event) => {
        user = {...user};
        user[event.target.name] = event.target.value;
        setUser(setUser => user);
      }


    useEffect(() => {
        axios.get('https://swapi.co/api/people')
        .then(res =>{
            setUserList (setUserList => res.data.results );
        })
        .catch((error) => {
            console.log(error);
        })
      },[]);


      

      function userLogin(){
          if(user.userName === '' || user.password === ''){
               alert("User Name or Password can't be empty ");
               return;
          }
        for(let i=0; i < userList.length; i++){
            if( (userList[i].name === user.userName) && (userList[i].birth_year === user.password) ){
                localStorage.setItem("currentUser", JSON.stringify(userList[i]))
                setIsLogin(setIsLogin => true);
               break;
            }
        }

        if(!isLogin){
            alert("User Name or password not match.");
            return;
        }

       }

    return(
        <React.Fragment>
            { isLogin &&   <Redirect to="/search" /> } 
            <h1> Login here </h1>
            <div className="form-wrap">
               
                    <div className="form-group">
                    <label>UserName:</label>
                        <input type="text" value={user.userName} onChange={handleInputChange} className="form-control" placeholder="UserName" name="userName" required/>   
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="text" value={user.password} onChange={handleInputChange} className="form-control" placeholder="Password" name="password" required/>   
                    </div>
                    <button onClick={()=>userLogin()} className="btn btn-primary">Submit</button>
                
            </div>
        </React.Fragment>
    )
}

export default Login;
