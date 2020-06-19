import React, {useState, useEffect} from 'react';
import { cartConstants} from '../_constants/cart.constants';
import axios from 'axios';

const initState = {
         items: [],
    addedItems: [],
         total: 0
   }

export const cartReducer= (state = initState, action)=>{

  if(action.type === cartConstants.GETALL_PRODUCT){
    return {
      ...state,
     items: action.items
    }
  }
    
    //INSIDE HOME COMPONENT
    if(action.type === cartConstants.ADD_TO_CART){
          let addedItem = state.items.find(item=> item._id === action._id)
          //check if the action id exists in the addedItems
         let existed_item = state.addedItems.find(item=> action._id === item._id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.itemPrice 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.itemPrice 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }  
        }
    }

  if(action.type === cartConstants.REMOVE_FROM_CART){
    let itemToRemove= state.addedItems.find(item=> action._id === item._id)
    let new_items = state.addedItems.filter(item=> action._id !== item._id)
    
    //calculating the total
    let newTotal = state.total - (itemToRemove.itemPrice * itemToRemove.quantity )
    console.log(itemToRemove)
    return{
        ...state,
        addedItems: new_items,
        total: newTotal
    }
}

//INSIDE CART COMPONENT
if(action.type=== cartConstants.INCREMENT_CART){
    let addedItem = state.items.find(item=> item._id === action._id)
      addedItem.quantity += 1 
      let newTotal = state.total + addedItem.itemPrice
      return{
          ...state,
          total: newTotal
      }
}

if(action.type=== cartConstants.DECREMENT_CART){  
    let addedItem = state.items.find(item=> item._id === action._id) 
    //if the qt == 0 then it should be removed
    if(addedItem.quantity === 1){
        let new_items = state.addedItems.filter(item=>item._id !== action._id)
        let newTotal = state.total - addedItem.itemPrice
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    else {
        addedItem.quantity -= 1
        let newTotal = state.total - addedItem.itemPrice
        return{
            ...state,
            total: newTotal
        }
    }
    
}
return state
}
