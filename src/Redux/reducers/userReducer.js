import {REGISTER} from 'Redux/actionsTypes'
const initState={
    email:'',
    userName:'',
    id:'',
    role:''
}

 const userReducer=(state=initState,action)=>{
    switch (action) {
        case REGISTER:
            return{
                ...state
             } 
    
        default:
            return  state
           
    }
}
export default userReducer