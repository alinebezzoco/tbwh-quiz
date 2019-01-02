import React from 'react';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

const Quiz = (props) => {

  const renderAnswerOptions = (key,index) => {
    return (
      <AnswerOption
        index ={index}
        key={key.content}
        answerContent={key.content}
        answerType={key.type}
        answer={props.answer}
        questionId={props.questionId}
        selectedAnswer={props.selectedAnswer}
        onAnswerSelected={props.onAnswerSelected}
      />
    );
  }

  return (
      <div key={props.questionId} className="quiz-story">
        <QuestionCount counter={props.counter} viewResults={props.viewResults}
          counter={props.questionId}
          total={props.questionTotal}
        />
        <Question content={props.question} img={props.imgUrl} />
        <ul className="answerOptions">
          {props.answerOptions.map(renderAnswerOptions)}
        </ul>
        <div className="bottom-footer" >
          {props.counter > 0 && props.counter < 9 ? (<button className="Previous-btn" onClick={props.setPreviousQuestion} >Voltar</button>) : (<div></div>)}

          {props.counter < 9 ? (<button className="next-btn" onClick={props.setNextQuestion} >Próximo</button>) : (<div></div>)}

          {props.counter === 9 ? (<button className="result-link" onClick={props.viewResults}>Ver os resultados</button>) : (<div></div>)}
        </div>
      </div>
  );
}


export default Quiz;