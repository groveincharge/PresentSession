import React from 'react';
import {AddTodos} from './../AddTodos';
import './../../_components/css/ExteriorDetail.css';

export const ExteriorDetail = () => {

  const exteriorTodos = new AddTodos()
  exteriorTodos.first = "Handwash and chamois dry vehicle."
  exteriorTodos.second  = "Clean tires and rims."
  exteriorTodos.third  = "Remove minor scratches tree sap and tar."
  exteriorTodos.fourth  = "Hand polish and buff exterior."
  exteriorTodos.fifth  = "Dress tires."
  exteriorTodos.sixth  = "Clean windows."
  
  return (
    <div className="ExteriorDetail">
      <ul>
       <li>{exteriorTodos.first}</li>
       <li>{exteriorTodos.second}</li> 
       <li>{exteriorTodos.third}</li> 
       <li>{exteriorTodos.fourth}</li>
       <li>{exteriorTodos.fifth}</li>
       <li>{exteriorTodos.sixth}</li>
    </ul>
    <div><img src='./../../../public/uploads/exteriorCar2.JPG' style={{width: '25%'}} alt=""/></div>
    </div>
    )
}