import React from 'react';
import LanguageContext from '../../contexts/LangContext';

class LearningResult extends React.Component {

    render() {
        return (
            <LanguageContext.Consumer>
                {langContext => {
                    // state of route component
                    return (
                        <div className="learn-translate-box">
                            <h2 className="learn-translate-header">{this.props.guess ? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
                            <div className="white-color">
                                <h4>{langContext.language.name}</h4>
                                <div>
                                    <p>Total Correct Guesses: {langContext.language.total_score}</p>
                                </div>
                            </div>
                            <div>
                                <p className="white-color">
                                    {
                                        (this.props.guess)
                                            ? `'${langContext.guessWord}' was the correct translation for '${langContext.word.original}!'`
                                            : `The translation for '${langContext.word.original}' is '${langContext.word.translation},' where you guessed '${langContext.guessWord}'`
                                    }
                                </p>
                            </div>
                            <div>
                                <button onClick={() => this.props.nextWordClick()}>Next Word</button>
                            </div>
                        </div>
                    )
                }}
            </LanguageContext.Consumer>
        )
    }
}

export default LearningResult;