import {REGISTER} from 'Redux/actionsTypes'
const initState={
   short_term:[],
   long_term:[]
}

 const stockReducer=(state=initState,action)=>{
    switch (action) {
        case REGISTER:
            return{
                ...state
             } 
    
        default:
            return  state
           
    }
}
export default stockReducer