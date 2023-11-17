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

export default function AvatarCreation () {
  const { id } = useParams()
  const { avatarData, updateAvatarData } = useContext(AvatarContext)

  const name = useField({ type : 'text' })

      const updateForm = () => {
        console.log(avatarData)
        name.modValue(avatarData.name)
    }

  useEffect(() => {
    if(!id) return
    async function getAvatar() {
      try {
        const avatarGetted = await avatarService.get(id);
        await updateAvatarData({...avatarGetted});
        updateForm()
      } catch (error) {
        console.error('error getting avatar')
      }
    }
    getAvatar();
  }, []);
  

    useEffect(() => {
      updateAvatarData({
        name: name.value,
      })
    }, [name.value])

    const onImageChange = (ev) => {
      const selectedFile = ev.target.files[0];
      const formData = new FormData();
      formData.append('avatarImage', selectedFile);
      
      updateAvatarData({ image : selectedFile })
    }
    

    return (
      <React.Fragment>
        <header>
          <h1 style={{width: "100%"}} className="center">Creación de Avatar</h1>
        </header>
  <main className='grid vertical'>
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
  <div className="center margin">
    <SelectCarrer/>
    <SelectSpecialty />
  </div>
    </div>
  <SaveButton id={id}/>
  </main>
      </React.Fragment>
    )
}