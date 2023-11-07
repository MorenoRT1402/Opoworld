import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../../constants'
import { match } from 'path-to-regexp'
import NotFound from '../Pages/NotFound'

// eslint-disable-next-line react/prop-types
export function Router ({children, routes = [], defaultComponent: DefaultComponent = NotFound }) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
    useEffect(() => {
      const onLocationChange = () => {
        setCurrentPath(window.location.pathname)
      }
  
      window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
  
      return () => {
        window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
        window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
  
      }
    }, [])
  
    /*
    const PageToRender = routes.find(({path}) => path === currentPath)?.Component
    return PageToRender ? <PageToRender /> : <DefaultComponent />
    */

    let routeParams = {}

    const routesFromChildren = Children.map( children, ({props, type}) => {
      const { name } = type
      const isRoute = name === 'Route'

      return isRoute ? props: null
    })

    const routeToUse = routes.concat(routesFromChildren).filter(Boolean)
  
    const PageToRender = routeToUse.find(({ path }) => {
        if (path === currentPath) return true

        const matcherUri = match(path, {decode: decodeURIComponent })
        const matched = matcherUri(currentPath)
        if(!matched) return false

        routeParams = matched.params
        return true
        })?.Component

    return PageToRender 
    ? <PageToRender routeParams={routeParams}/> 
    : <DefaultComponent routeParams={routeParams}/>
  }