import { Link } from 'react-router-dom';
import { EXP_AND_LEVEL, PATHS } from '../../constants';
import { useContext, useEffect, useState } from 'react';
import { LoggedUserContext } from '../../context/LoggedUserContext';
import avatarService from '../../services/avatars'
import attributesService from '../../services/attributes'

export default function AvatarView() {
    const { avatar } = useContext(LoggedUserContext)
    const [ attributesDict, setAttributesDict] = useState(avatar.attributes[0].careers[1].specialties[0].stats)

    const [ life, setLife ] = useState(1)
    const [ level, setLevel ] = useState(0)
    const [ exp, setExp ] = useState(-1)
    const [ nextLevel, setNextLevel] = useState(0)

    useEffect(() => {
//        console.log('17', life)
    }, [life])

    useEffect(() => {
        attributesService.getAttributesDict(avatar).then( dict => {
            setAttributesDict(dict)        
        })
    }, [avatar])

    const getAttributes = () => {
        if(!attributesDict || attributesDict.length < 1) return <div></div>

        return attributesDict.map((item) => (
          <div key={item.name} className='grid-horizontal-d2 gap'>
            <h5>{item.name}</h5>
            <h5>{item.value}</h5>
          </div>
        ));
      }

      function EditButton () {
        const avatarID = avatar ? avatar.id : ''
        return (
            <Link to={`${PATHS.AVATAR_EDIT}/${avatarID}`} className='button' style={ { maxHeight : "25%", marginTop : '1%'}} >
                Editar
            </Link>
        )
      } 

      const getProp = (prop, defaultProp) => {
        return avatar ? avatar[prop] : defaultProp
      }

    const getImage = () => {
        if (!avatar) return
        const image = avatarService.getImage(avatar)
        return image
    }

    const getBaseStat = async (prop) => {
        const returnedProp = await attributesService.getBaseStat( avatar, prop)
        return returnedProp
    }

    useEffect(() => {
        getBaseStat('life').then( stat => setLife(stat))
        getBaseStat('level').then( stat => setLevel(stat))
        getBaseStat('exp').then( stat => setExp(stat))
    }, [])

    useEffect(() => {
        const expNL = EXP_AND_LEVEL.CALCULATE_EXP_REQ(level)
        setNextLevel(expNL)
    }, [exp, level])

    return (
        <div className="border container grid" style={{margin : '1%'}} >
            <div className='grid-horizontal-d2'>
                <img className='border container margin' src={getImage()} style={{ height : "70%", width: "70%", margin : "10px"}}></img>
                <div>
                    <div>
                        <h3>{getProp('name', 'name')}</h3>
                        <div className='grid-horizontal-d2 gap'>
                            <h4>{getProp('career', 'job')}</h4>
                            <h4>{getProp('specialty', 'specialty')}</h4>
                        </div>
                        <div className='grid-horizontal-d2'>
                                <div className='grid horizontal nowrap dynamic-size'>
                                <h5>Nivel</h5>
                                <h5>{level}</h5>
                                </div>
                                <div className='grid-horizontal-d2 nowrap dynamic-size'>
                                <h5>Exp</h5>
                                <h5>{exp}</h5>
                                <h5>/</h5>
                                <h5>{nextLevel}</h5>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className='grid vertical gap border container' style={{ marginTop : '1%' }}>
                            <h4 className='center'> Vida : {life}</h4>
                            <div className='avatar-atributes-columns container'>
                                { getAttributes() }
                            </div>
                        </div>
            <EditButton>Editar</EditButton>
        </div>
    )
}