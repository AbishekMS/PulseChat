import { contactActions } from "./actions";
const getdata=JSON.parse(localStorage.getItem("contacts"));
export const initialState=getdata? getdata:[];
export const contactReducer=(state,action)=>{
    switch(action.type){
        case contactActions.ADD_CONTACT:
            return [...state,action.payload];
        case contactActions.GET_CONTACTS:
            return action.payload;
        case contactActions.DELETE_CONTACT:
          return state.filter(contact => contact.id !== action.payload);
        default: 
            state;     
    }
}