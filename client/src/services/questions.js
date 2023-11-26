import axios from 'axios'
import bdConfigService from './bdConfig'
import { BASE_URL } from '../constants'

const baseUrl = `${BASE_URL}/api/questions`

const { CONTENT_TYPES, getHeader } = bdConfigService

const contentType = CONTENT_TYPES.JSON

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getAllOfSpecialty = async specialty => {
    const questions = await getAll();
    return questions.filter(question => question.specialty === specialty);
};


const create = (newObject) => {
    const config = getHeader(contentType)

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

const getRandomOfSpecialty = async specialty => {
    const specialtyQuestions = await getAllOfSpecialty(specialty);
    console.log('follow 30', specialty, specialtyQuestions)
    const randomIndex = Math.floor(Math.random() * specialtyQuestions.length);
    return specialtyQuestions[randomIndex];
};

const shuffleOptions = (question) => {
    console.log('follow 36', question)
    const shuffledOptions = question.options.map((option, index) => ({
        text: option,
        correct: index === 0, // Only the first option is correct
    }));

    // Resort
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    return shuffledOptions;
};



export default { create, getRandomOfSpecialty, shuffleOptions }