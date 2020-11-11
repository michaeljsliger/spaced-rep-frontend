import React, { Component } from 'react'
import LangContext from '../../contexts/LangContext'
import API_SERVICES from '../../services/API-services'
import Learning from '../../components/Learning/Learning'
import LearningResult from '../../components/Learning/LearningResult';
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    language: {},
    word: {},
    fetched: false,
    guess: null,
    results: false,

  }
  componentDidMount() {
    // fetch call to update state and context appropriately
    // needs to GET /head
    return API_SERVICES.getTopWord()
      .then(json => {
        console.log(json);
        this.setState({
          language: json.language,
          word: json.word,
          fetched: true,
        })
      })
  }

  // on submit, change state in route component
  // could give the context provider just the next word, instead of whole LL
  // server has endpoint for /head
  // so no /head?

  
  submitGuess = (event, value, word) => {
    event.preventDefault();
    return API_SERVICES.submitGuess(value, word)
      .then(json => {
        // json.guess === true || false;
         this.setState({
          fetched: false,
          results: true,
          word: json.word,
          guess: json.guess[0],
          guessWord: json.guess[1],
          language: json.language,
        });
        
        // setState with updated words

      })
    }
    
    nextWordClick = () => {
      return API_SERVICES.getTopWord()
        .then(json => {
          this.setState({ 
            results: false, 
            fetched: true,
            guess: null, 
            word: json.word,
          })
        })
    }

  // need an upper level setState to rerender and reupdate Context
  render() {
    // const value = GET /head
    const value = this.state;
    return (
      <div className="learningRoute-box">
        <h2>Prepare to learn</h2>
        <LangContext.Provider value={value}>
          { this.state.fetched && <Learning onSubmitGuess={this.submitGuess}/> }
          { this.state.results && <LearningResult guess={this.state.guess} nextWordClick={this.nextWordClick}/>}
        </LangContext.Provider>
      </div>
    );
  }
}

export default LearningRoute
