import { Link } from 'react-router-dom';
import { PATHS } from '../../constants';
import { useContext } from 'react';
import { LoggedUserContext } from '../../context/LoggedUserContext';
import avatarService from '../../services/avatars'

export default function AvatarView() {
    const { avatar } = useContext(LoggedUserContext)


    const getAttributes = () => {
        const attributes = [
            { key: 'Temario', value: 1 },
            { key: 'Supuestos Prácticos', value: 1 },
            { key: 'Programación', value: 1 },
            { key: 'Práctico Común', value: 1 },
        ];
      
        return attributes.map((item) => (
          <div key={item.key} className='grid-horizontal-d2 gap'>
            <h5 className='nowrap'>{item.key} :</h5>
            {`${item.value}`}
          </div>
        ));
      }

      function EditButton () {
        const avatarID = avatar ? avatar.id : ''
        return (
            <Link to={`${PATHS.AVATAR_EDIT}/${avatarID}`} className='button' >
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

    return (
        <div className="border container grid vertical gap margin" >
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
                                <h5>{getProp('level', '1')}</h5>
                                </div>
                                <div className='grid-horizontal-d2 nowrap dynamic-size'>
                                <h5>Exp</h5>
                                <h5>{getProp('exp', '0')}</h5>
                                <h5>/</h5>
                                <h5>10</h5>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className='grid vertical gap border container'>
                            <h4 className='center'>10/10</h4>
                            <div className='avatar-atributes-columns container'>
                                {getAttributes()}
                            </div>
                        </div>
            <EditButton>Editar</EditButton>
        </div>
    )
}