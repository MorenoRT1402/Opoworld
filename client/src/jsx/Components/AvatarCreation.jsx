/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SelectCarrer from './SelectCareer';
import SelectSpecialty from './SelectSpecialty';
import { useParams } from "react-router-dom";
import { useField } from "../../Hooks/useField";

export default function AvatarCreation (avatarData, onAvatarDataChange) {
  const { id } = useParams()
  console.log(id)
  const [selectedCareer, setSelectedCareer] = useState("Educación Primaria");

    useEffect(() => {
        }, [selectedCareer]);

    const saveButton = () => {
      return (
        <button>
          Guardar
        </button>
      )
    }

    const image = useField({ type : 'file' })
    const name = useField({ type : 'text' })

    return (
        <div className='grid vertical'>
        <input className="avatarInput-Image" 
        {...image}
        name="avatar" 
        placeholder="avatar" 
        accept="image/*"/>
        <input className='text-center' 
        {...name}
        type='text' 
        name='avatarName' 
        placeholder='Nombre'/>
        <div className="grid horizontal margin">
          <SelectCarrer
        avatarData={avatarData}
        onAvatarDataChange={onAvatarDataChange}
          selectedCareer={selectedCareer}
          setSelectedCareer={setSelectedCareer}
        />
        <SelectSpecialty 
        selectedCareer={selectedCareer}
        avatarData={avatarData}
        onAvatarDataChange={onAvatarDataChange}
         />
        </div>
        { id ? saveButton() : null }
        </div>
    )
}