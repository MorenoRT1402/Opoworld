import { useNavigate } from 'react-router-dom';

export default function AvatarView() {
    const navigate = useNavigate()


    const getAttributes = () => {
        const attributes = [
            { key: 'Temario', value: 1 },
            { key: 'Supuestos Prácticos', value: 1 },
            { key: 'Programación', value: 1 },
            { key: 'Práctico Común', value: 1 },
        ];
      
        return attributes.map((item) => (
          <div key={item.key} className='grid-horizontal dynamic-size'>
            <h5 className='nowrap dynamic-size'>{item.key} :</h5>
            {`${item.value}`}
          </div>
        ));
      }

      const editButton = () => {
        const avatarID = null
        return (
            <button onClick={navigate(`/avatar/edit/${avatarID}`)}>
                Editar
            </button>
        )
      }
      

    return (
        <div className="border container grid-vertical gap" >
            <div className='grid-horizontal'>
                <img className='border container'></img>
                <div>
                    <div>
                        <h3>Name</h3>
                        <div className='grid-horizontal gap'>
                            <h4>Job</h4>
                            <h4>Specialty</h4>
                        </div>
                        <div className='grid-horizontal'>
                                <div className='grid-horizontal nowrap dynamic-size'>
                                <h5>Nivel</h5>
                                <h5>1</h5>
                                </div>
                                <div className='grid-horizontal nowrap dynamic-size'>
                                <h5>Exp</h5>
                                <h5>0</h5>
                                <h5>/</h5>
                                <h5>10</h5>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div className='grid-vertical gap border container'>
                            <h4>10/10</h4>
                            <div className='grid-auto container'>
                                {getAttributes()}
                            </div>
                        </div>
            <button onClick={editButton}>Editar</button>
        </div>
    )
}