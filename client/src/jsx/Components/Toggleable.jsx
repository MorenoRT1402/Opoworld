import { useState } from "react"

// eslint-disable-next-line react/prop-types
export default function Toggleable({children, buttonLabel}) {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none': ''}
    const showWhenVisible = { display: visible ? '': 'none'}

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>{buttonLabel}</button>
            </div>

            <div style={showWhenVisible}>
                {children}
                <button onClick={() => setVisible(false)}>Hide</button>
            </div>
        </div>
    )
}