/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import SelectCarrer from './SelectCareer';
import SelectSpecialty from './SelectSpecialty';

export default function AvatarCreation (avatarData, onAvatarDataChange) {
    const [selectedCareer, setSelectedCareer] = useState("Educación Primaria");

    const handleImageChange = (event) => {
      const newAvatarData = { ...avatarData, image: event.target.value };
      onAvatarDataChange(newAvatarData);
    };
    
    const handleNameChange = (event) => {
      const newAvatarData = { ...avatarData, name: event.target.value };
      avatarData.onAvatarDataChange(newAvatarData);
    }

    useEffect(() => {
        }, [selectedCareer]);

    return (
        <div className='grid-vertical'>
        <input className="avatarInput-Image" onChange={handleImageChange} type="file" name="avatar" placeholder="avatar" accept="image/*"/>
        <input className='avatarInput-Name' onChange={handleNameChange} type='text' name='avatarName' placeholder='Nombre'/>
        <div><SelectCarrer
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
        </div>
    )
}