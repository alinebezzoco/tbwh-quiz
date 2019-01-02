import React, { Component } from 'react';

class Result extends Component {

  constructor(props){
    super(props);
  }
  renderQuestions(){
    return this.props.quizResult.map((_data, index) => {
        return <div className="list-grp">{_data.question} <br/>a resposta correta é: {_data.correct} :  e você selecionou {this.props.answers[index]+1} { ((this.props.answers[index]+1) === _data.correct) ? (<span className="status">its correct !man</span>) : ''}</div>
    })
  }

  render() {
    return (
    <div  className="quiz-story">
      <div>
        <strong>Veja o resultado e confira as respostas!</strong>!
        <div>{this.renderQuestions()}</div>
      </div>
    </div>
    )
  }
}

export default Result;