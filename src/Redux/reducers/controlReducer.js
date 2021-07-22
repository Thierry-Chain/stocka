import {REGISTER} from 'Redux/actionsTypes'
const initState={
  range:{},
  data:[],
  buyingPrice:null,
  sellingPrice:null,
  profit:null,
  loss:null,
  remainedAmount:{
      shortTerm:null,
      longTerm:null
  }
}

 const controlReducer=(state=initState,action)=>{
    switch (action) {
        case REGISTER:
            return{
                ...state
             } 
    
        default:
            return  state
           
    }
}
export default controlReducer