import AvatarView from "../Components/AvatarView.jsx";
import './../../css/customPage.css'

export default function HomeScreen() {

    return (
        <main className="grid-vertical gap">
            <AvatarView />
            <div className="grid-horizontal gap">
                <button>Crear Pregunta</button>
                <button>Batalla Rápida</button>
            </div>
        </main>
    )
}