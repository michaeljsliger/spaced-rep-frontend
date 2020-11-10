import React, { Component } from 'react'
import LangContext from '../../contexts/LangContext'
import API_SERVICES from '../../services/API-services'
import Learning from '../../components/Learning/Learning'
import './LearningRoute.css';

class LearningRoute extends Component {
  state = {
    language: {},
    words: [],
    fetched: false,
  }
  componentDidMount() {
    // fetch call to update state and context appropriately
    // needs to GET /head

    return API_SERVICES.getLanguageContent()
      .then(json => {
        this.setState({
          language: json.language,
          words: json.words,
          fetched: true,
        })
      })
  }

  // on submit, change state in route component
  // could give the context provider just the next word, instead of whole LL
  // server has endpoint for /head
  // so no /head?

  
  submitGuess(event, value, word) {
    event.preventDefault();
    return API_SERVICES.submitGuess(value, word)
      .then(json => {
        // json.guess === true || false;
        console.log(json)
        // return this.setState({
        //   language: json.language
        // });
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
        </LangContext.Provider>
      </div>
    );
  }
}

export default LearningRoute
