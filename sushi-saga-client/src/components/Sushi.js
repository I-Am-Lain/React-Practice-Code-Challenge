import React, { Fragment } from 'react'

const Sushi = (props) => {
  return (
    <div className="sushi">
      <div className="plate" 
           onClick={() => props.handleEaten(props.id, props.price)}>
        { 
          /* Tell me if this sushi has been eaten! */ 
          props.isEaten ?
            null
          :
            <img src={props.img_url} width="100%" alt='' />
        }
      </div>
      <h4 className="sushi-details">
        {props.name} - ${props.price}
      </h4>
    </div>
  )
}

export default Sushi