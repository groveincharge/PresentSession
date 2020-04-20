import React from 'react';
import {AddTodos} from './../AddTodos';
import './../../_components/css/InteriorDetail.css';

export const InteriorDetail = () => {
    
         
  const interiorTodos = new AddTodos()
  interiorTodos.first = "Vacuum seats,mats and floor."
  interiorTodos.second  = "Spot Clean to remove spots and stains."
  interiorTodos.third  = "Dust and clean dashboard and side panels."
  interiorTodos.fourth  = "Clean center console and cup holders."
  interiorTodos.fifth  = "Treat and protect dashboard and side panels."
  interiorTodos.sixth  = "Clean windows."

return (
  <div className="InteriorDetail">
    <ul>
      <li>{interiorTodos.first}</li>
      <li>{interiorTodos.second}</li> 
      <li>{interiorTodos.third}</li> 
      <li>{interiorTodos.fourth}</li>
      <li>{interiorTodos.fifth}</li>
      <li>{interiorTodos.sixth}</li>
    </ul>
    <div><img src='./../../../public/uploads/interiorCar1.JPG' style={{width: '25%'}} alt=""/></div>
  </div>
  )  
}
