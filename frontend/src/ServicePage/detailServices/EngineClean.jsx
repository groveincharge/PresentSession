import React from 'react';
import {AddTodos} from './../AddTodos';
import './../../_components/css/EngineClean.css';

export const EngineClean = () => {
  const engineTodos = new AddTodos()
  engineTodos.first = "Brush loose dirt and cover electrical connections."
  engineTodos.second  = "Degrease engine block and surrounding components."
  engineTodos.third  = "Lightly Pressure wash engine block."
  engineTodos.fourth  = "Blow dry or Hand dry engine block."
  engineTodos.fifth  = ".Add protection and gloss."
  engineTodos.sixth  = "Remove cover from electrical connections."

  return (
    <div className="EngineClean">
      <ul>
       <li>{engineTodos.first}</li>
       <li>{engineTodos.second}</li> 
       <li>{engineTodos.third}</li> 
       <li>{engineTodos.fourth}</li>
       <li>{engineTodos.fifth}</li>
       <li>{engineTodos.sixth}</li>
    </ul>
    <div><img src='./../../../public/uploads/e.JPG' style={{width: '25%'}} alt=""/></div>
    </div>
    )
}