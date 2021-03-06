import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import StoreContext from 'contexts/StoreContext'

const RoutesPrivate = ({ roles = [], children, ...rest }) => {
  const { token, user } = useContext(StoreContext);


  return (
    <Route
      {...rest}
      render={() =>
        //se não tem token então redireciona para a tela de login
        !token || !user?.name ? <Redirect to={`/login`} />
          : (children)
      }
    />
  )
}

export default RoutesPrivate;