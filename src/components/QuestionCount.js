import React from 'react';

const QuestionCount = (props) => {

  return (
    <div className="questionCount">
      Questão <span>{props.counter}</span> de <span>{props.total}</span>
       {props.counter === 10 ? (<a className="result-link" href="" onClick={props.viewResults}>Ver os resultados</a>) : (<div></div>)}
    </div>
  );

}

export default QuestionCount;