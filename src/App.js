
import React, { Component } from 'react';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './app.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      imgUrl: '',
      answerOptions: [],
      allQuestions : [],
      answer: '',
      selectedAnswers : {},
      result: ''
    };
    
    this.setNextQuestion = this.setNextQuestion.bind(this);
    this.setPreviousQuestion = this.setPreviousQuestion.bind(this);
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.viewResults = this.viewResults.bind(this);
  }

  handleAnswerSelected(e){
    let _self = this;
    let obj = _self.state.selectedAnswers;
    let index = parseInt(e.target.value);
    let Qindex = (_self.state.counter )
    obj[Qindex] = index;
    _self.setState({selectedAnswers : obj})
  }

  componentWillMount() {
    fetch('https://theblackwomanhistory-questions.firebaseio.com/.json')
    .then(res => res.json())
    .then(
      (data) => {
        this.setState({
          question: data.quizQuestions[0].question,
          imgUrl: data.quizQuestions[0].imgUrl,
          answerOptions : data.quizQuestions[0].answers,
          allQuestions : data.quizQuestions
        });
      },
      (error) => {
        this.setState({
          error
        });
      }

    )
    console.log(this.setState.allQuestions)

  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
    const allQuestions = this.state.allQuestions;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: allQuestions[counter].question,
      imgUrl: allQuestions[counter].imgUrl,
      answerOptions: allQuestions[counter].answers,
      answer: ''
    });
  }

  setPreviousQuestion() {
    const counter = this.state.counter - 1;
    const questionId = this.state.questionId - 1;
    const allQuestions = this.state.allQuestions;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: allQuestions[counter].question,
      imgUrl: allQuestions[counter].imgUrl,
      answerOptions: allQuestions[counter].answers,
      answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    return (
      <Quiz viewResults={this.viewResults}
      setNextQuestion={this.setNextQuestion}
      counter={this.state.counter}
      setPreviousQuestion={this.setPreviousQuestion}
      answer={this.state.answer}
      selectedAnswer = {this.state.selectedAnswers[this.state.counter]}
      answerOptions={this.state.answerOptions}
      questionId={this.state.questionId}
      question={this.state.question}
      imgUrl={this.state.imgUrl}
      questionTotal={this.state.allQuestions.length}
      onAnswerSelected = {this.handleAnswerSelected}
    />
    );
  }

  renderResult() {
    return (
      <Result quizResult={this.state.allQuestions} answers={this.state.selectedAnswers} />
    );
  }
  
  viewResults(e){
    e.preventDefault();
    this.setState({result : true})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>The Black Women History Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>

    );
  }
}

export default App;