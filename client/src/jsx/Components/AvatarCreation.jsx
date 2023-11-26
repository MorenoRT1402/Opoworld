/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useField } from "../../Hooks/useField";
import { AvatarContext } from "../../context/AvatarContext";
import avatarService from "../../services/avatars";
import SaveButton from "./SaveButton";
import SelectCarrer from './SelectCareer';
import SelectSpecialty from './SelectSpecialty';

const ConditionalRenderCareerAndSpecialty = () => {
  const { avatarData, updateAvatarData } = useContext(AvatarContext)

  const updateSpecialty = specialty => {
    updateAvatarData({ specialty })
  }

  const updateCareer = career => {
    updateAvatarData({ career })
  }

  if (avatarData.attributes){
    return (
      <div className="center margin">
        <SelectCarrer 
        initialCareer={avatarData.career} returnCareer={updateCareer}
        />
        <SelectSpecialty 
        career={avatarData.career} initialSpeciality={avatarData.specialty} returnSpecialty={updateSpecialty} 
        />
      </div>
    )
  }
}

export default function AvatarCreation () {
  const { id } = useParams()
  const { avatarData, updateAvatarData } = useContext(AvatarContext)
  const { field } = useField({ type : 'text', initialValue : avatarData.name })

  const name = field

  useEffect(() => {
    if(!id) return
    getAvatar();
  }, []);
  

    useEffect(() => {
      if(avatarData.name !== name.value)
      updateAvatarData({
        name: name.value,
      })
    }, [name.value])

    async function getAvatar() {
      try {
        const avatarGetted = await avatarService.get(id);
        await updateAvatarData({...avatarGetted});
      } catch (error) {
        console.error('error getting avatar')
      }
    }

    const onImageChange = (ev) => {
      const selectedFile = ev.target.files[0];
      const formData = new FormData();
      formData.append('avatarImage', selectedFile);
      
      updateAvatarData({ image : selectedFile })
    }

    const correctAvatar = () => {
      const { name, career, specialty } = avatarData

      return name && career && specialty
    }
    

    return (
      <React.Fragment>
        <header>
          <h1 style={{width: "100%"}} className="center">Creación de Avatar</h1>
        </header>
  <main className='grid vertical margin'>
    <div className="grid vertical gap">
    <input className="avatarInput-Image" 
  name="avatar" 
  placeholder="avatar" 
  type="file"
  accept="image/*"
  onChange={onImageChange}/>
  <input className='text-center' 
  {...name}
  name='avatarName' 
  placeholder='Nombre'/>
    <ConditionalRenderCareerAndSpecialty/>
    </div>
   { correctAvatar() ? <SaveButton id={id}/> : null }
  </main>
      </React.Fragment>
    )
}