import config from '../config';
import TokenService from './token-service';

const API_SERVICES = {
    getLanguageContent() {
        return fetch(`${config.API_ENDPOINT}/language`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        }).then(res => {
            return (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
    },
    // get head of server linked list
    getTopWord() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            }
        }).then(res => {
            return (!res.ok) 
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        })
    },
    // submit guess
    submitGuess(value, word) {
        const postObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({ 
                guess: value,
                word: word
             })
        }

        return fetch(`${config.API_ENDPOINT}/language/guess`, postObj)
            .then(res => {
                return (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            })
    }
}

export default API_SERVICES;