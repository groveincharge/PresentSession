import './../css/IconFooter.css';
import React from 'react';

export const IconFooter = () => {
        
        return (
            <div className="IconBox">
            <div className="IconBoxOne">
            <i className="fas fa-globe fa-3x"></i>
               <p>Bio-Degradable products,
                   safe for pets and kids,
                   safe for the enviroment.
               </p>
             </div>
              <div className="IconBoxTwo">
              <i className="fas fa-chess-king fa-3x"></i>    
              <p>Years of experience in the
                  auto detail field. you just
                  can't beat experience.
              </p>
               </div>
                <div className="IconBoxThree">
                <i className="fas fa-city fa-3x"></i>
                <p>Moblie service available,
                    we come to your location,
                    according to your schedule.
                </p>
                 </div>
                  <div className="IconBoxFour">
                  <i className="fas fa-chess-pawn fa-3x"></i>
                  <p>Detail work takes time,
                      the average full detail job will
                      take about two and a half hours.
                      
                  </p>
                   </div>
               </div>    
        );  
}   