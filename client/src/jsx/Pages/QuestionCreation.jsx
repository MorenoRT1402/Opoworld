import { useEffect, useState } from "react";
import { useField } from "../../Hooks/useField";
import SelectAttribute from "../Components/SelectAttribute";
import SelectSpecialty from "../Components/SelectSpecialty";
import SelectCareer from "../Components/SelectCareer";
import useError from "../../Hooks/useError";
import avatarsService from "../../services/avatars";
import questionsService from "../../services/questions";
import { PATHS } from "../../constants";
import { useNavigate } from "react-router-dom";

const useQuestionOptions = ( { correct = false } ) => {
    const { field } = useField({ type : 'text' })
    const { value, onChange } = field

    const style = {
        backgroundColor: correct ? "lightgreen" : "#FFDDDD",
        'textAlign': 'center',
    };
    const placeholder = correct ? 'Opción Correcta' : 'Opción Incorrecta'
    const rows=3
    const cols=30

    return {
        value,
        onChange,
        style,
        placeholder,
        rows,
        cols
    }
}

export default function QuestionCreation() {
    const navigate = useNavigate()
    const { field } = useField({ type : 'text'})
  const question = field
  const correctOption = useQuestionOptions({ correct : true })
  const optionB = useQuestionOptions({ })
  const optionC = useQuestionOptions({ })
  const optionD = useQuestionOptions({ })
  const [ career, setCareer ] = useState()
  const [ specialty, setSpecialty ] = useState()
  const [ attribute, setAttribute ] = useState()

  const [ questionData, setQuestionData ] = useState({
    question: 'default',
    options : [ 'correct', 'b', 'c', 'd'],
    career: 'Educación Primaria',
    specialty: 'Generalista',
    attribute: 'Temario'
  })

  const { errorMessage, errorStyle, setErrorMessage } = useError()

  const { getDefaultAvatar } = avatarsService

  useEffect(() => {
    getDefaultAvatar().then( avatar => {
        setCareer(avatar.career)
        setSpecialty(avatar.specialty)
    })
  }, [])

  useEffect(() => {
    setQuestionData({
        ...questionData,
        career: career,
        specialty: specialty,
        attribute: attribute
    })
  }, [career, specialty, attribute])

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question.value || !correctOption.value || !optionB.value || !optionC.value || !optionD.value || !career || !specialty || !attribute) {
        setErrorMessage('Por favor completa todos los campos');
        return;
    }

    const options = [ correctOption.value, optionB.value, optionC.value, optionD.value ]

    const questionToRegister = {
        question: question.value,
        options: options,
        career: career, 
        specialty: specialty, 
        attribute: attribute
    }

    setQuestionData(questionToRegister)

    questionsService.create(questionToRegister)

    console.log('Pregunta enviada:', question.value);

    navigate(PATHS.HOME)

  };

  return (
    <div className="grid vertical center fillhvh">
        <form onSubmit={handleSubmit} >
            <div className="grid">
                <label htmlFor="question" className="">Pregunta:</label>
                <textarea
                {...question}
                id="question"
                name="question"
                placeholder="Escribe tu pregunta aquí..."
                rows={7}
                cols={50}
                />
            </div>
            <div className="grid-horizontal-d2">
                <textarea
                    {...correctOption}
                    id="correctOption"
                    name="correctOption"
                />
                <textarea 
                {...optionB}
                id="optionB"
                name="optionB"
                />
                <textarea 
                {...optionC}
                id="optionC"
                name="optionC"
                />
                <textarea 
                {...optionD}
                id="optionD"
                name="optionD"
                />
            </div>
            <div className="center" style={{ marginTop : '1%', marginBottom : '15%' }}>
                <SelectCareer initialCareer={questionData.career} returnCareer={setCareer}/>
                <SelectSpecialty career={questionData.career} initialSpeciality={questionData.specialty} returnSpecialty={setSpecialty}/>
                <SelectAttribute career={questionData.career} specialty={questionData.specialty} initialAttr={questionData.attribute} returnAttr={setAttribute}/>
            </div>
            <div className="error center">
            </div>
            {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        <button type="submit">Enviar pregunta</button>
    </form>
    </div>
  );
}
