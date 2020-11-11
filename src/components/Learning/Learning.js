import React from 'react';
import LanguageContext from '../../contexts/LangContext';
import './Learning.css';

class Learning extends React.Component {
    state = {
        guess: ''
    }

    onGuessChange = (val) => {
        this.setState({guess: val})
    }

    render() {
        return (
            <LanguageContext.Consumer>
                {langContext => {
                    // console.log(langContext)
                    // langContext should just be the first  word in LL, and language object
                    // onSubmit = this.props.onSubmit() to change state in upper component
                    return (
                        <div className="learn-translate-box">
                            <div className="learn-translate-header">
                                <div>
                                    <h4>Practicing {langContext.language.name}</h4>
                                </div>
                                <div className="DisplayScore">
                                    <p>Your total score is: {langContext.language.total_score} </p>
                                </div>
                            </div>
                            <div className="learn-translate-word-container">
                                <p>
                                    Translate the word:
                                </p>
                                <h2>
                                    {langContext.word.original}
                                </h2>
                            </div>
                            <form className="learn-translate-form"
                                onSubmit={event => this.props.onSubmitGuess(event, this.state.guess, langContext.word)}
                            >
                                <label htmlFor="learn-guess-input">What's the translation for this word?</label>
                                <input type="text" id="learn-guess-input" name="learn-guess-input" required 
                                    onChange={event => this.onGuessChange(event.target.value)}
                                />
                                <button type="submit">Submit your answer</button>
                            </form>
                            <div className="learn-translate-stats">
                                <div>
                                    <p>
                                        You have answered this word: 
                                    </p>
                                    <p className="correct">
                                        correctly {langContext.word.correct_count} times 
                                    </p>
                                    <p className="incorrect">
                                        incorrectly {langContext.word.incorrect_count} times
                                    </p>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </LanguageContext.Consumer>
        )
    }
}

export default Learning;