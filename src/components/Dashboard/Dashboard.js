import React from 'react';
import AuthService from '../../services/auth-api-service';
import './Dashboard.css';

export default class Dashboard extends React.Component {
    state = {
        language: '',
        words: []
    }

    componentDidMount() {
        return AuthService.getLanguageContent()
            .then(json => {
                this.setState({
                    language: json.language,
                    words: json.words,
                })
            })
    }

    render() {
        const wordsArr = this.state.words.map((el, index) => {
            return <li key={index}>
                <div>
                    {el.original}
                </div>
                <div>
                    {el.correct_count}:
                    {el.incorrect_count}
                </div>
            </li>
        })

        return (
            <div className="dashboard-box">
                <div className="dashboard-header">
                    <h2>Dashboard</h2>
                </div>
                {this.state.language.name}
                <br />
                {this.state.language.total_score} total correct guesses
                <div>
                    <div>
                        Words:
                        <ul className="dashboard-words-list">
                            {wordsArr}
                        </ul>
                    </div>
                </div>
                <div className="dashboard-start-button-box">
                    <a href="/learn"><button>Learn!</button></a>
                </div>
            </div>
        )
    }
}
