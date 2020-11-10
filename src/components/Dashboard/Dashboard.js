import React from 'react';
import API_SERVICES from '../../services/API-services';
import './Dashboard.css';

export default class Dashboard extends React.Component {
    state = {
        language: '',
        words: []
    }

    componentDidMount() {
        return API_SERVICES.getLanguageContent()
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
                     {el.correct_count}:{el.incorrect_count}
                </div>
            </li>
        })

        return (
            <div className="dashboard-box">
                <div className="dashboard-header">
                    <h2>Dashboard</h2>
                </div>
                <h2>
                    {this.state.language.name}
                </h2>
                <h5>
                    Total Correct: {this.state.language.total_score}
                </h5>
                <div>
                    <ul className="dashboard-words-list">
                        {wordsArr}
                    </ul>

                </div>
                <div className="dashboard-start-button-box">
                    <a href="/learn"><button>Learn!</button></a>
                </div>
            </div>
        )
    }
}
