import React from 'react';

const Question = (props) => {

  return (
    <div>
     <h2 className="question">{props.content}</h2>
     <img src={props.img} />
  </div>
  );
}

export default Question;