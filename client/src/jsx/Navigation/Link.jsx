import { BUTTONS, EVENTS } from '../../js/constants'

// eslint-disable-next-line react/prop-types
export function Link ({ button, onClick = () => {}, target, to, ...props}){
    const className = button ? "link-button" : "link"

    const navigate = (href) => {
        window.history.pushState({}, '', href)
        const navigationEvent = new Event(EVENTS.PUSHSTATE)
        window.dispatchEvent(navigationEvent)
      }

    const handleClick = (event) => {
        onClick(event)

        const isMainEvent = event.button === BUTTONS.PRIMARY
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined || target === '_self'

        if(isMainEvent && isManageableEvent && !isModifiedEvent){
            event.preventDefault()
        navigate(to)
        }
    }

    return <a className={className} onClick={handleClick} href={to} target={target} {...props} />
}
