import React from 'react';
import {AddTodos} from './../AddTodos';
import './../../_components/css/FullDetail.css';

export const FullDetail = () => {
      
    const interiorTodos = new AddTodos()
    const exteriorTodos = new AddTodos()
    interiorTodos.first = "Vacuum seats,mats and floor."
    interiorTodos.second  = "Spot Clean to remove spots and stains."
    interiorTodos.third  = "Dust and clean dashboard and side panels."
    interiorTodos.fourth  = "Clean center console and cup holders."
    interiorTodos.fifth  = "Treat and protect dashboard and side panels."
    interiorTodos.sixth  = "Clean windows."

    exteriorTodos.first = "Handwash and chamois dry vehicle."
    exteriorTodos.second  = "Clean tires and rims."
    exteriorTodos.third  = "Remove minor scratches tree sap and tar."
    exteriorTodos.fourth  = "Hand polish and buff exterior."
    exteriorTodos.fifth  = "Dress tires."
    exteriorTodos.sixth  = "Clean windows."
    

return (
    <div className="FullDetail">
      <ul>
        <li>{interiorTodos.first}</li>
        <li>{interiorTodos.second}</li> 
        <li>{interiorTodos.third}</li> 
        <li>{interiorTodos.fourth}</li>
        <li>{interiorTodos.fifth}</li>
        <li>{interiorTodos.sixth}</li>

        <li>{interiorTodos.first}</li>
        <li>{interiorTodos.second}</li> 
        <li>{interiorTodos.third}</li> 
        <li>{interiorTodos.fourth}</li>
        <li>{interiorTodos.fifth}</li>
        <li>{interiorTodos.sixth}</li>
      </ul>
      <div><img src='./../../../public/uploads/e.JPG' style={{width: '25%'}} alt=""/></div>
    </div>
    )
}