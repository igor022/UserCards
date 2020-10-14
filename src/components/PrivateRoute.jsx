import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const PrivateRoute = (props) => {
  const auth = localStorage.getItem('jwt');

  return (
    <>
    {
      auth ? 
        <Route 
          path={props.path} 
          exact={props.exact} 
          component={props.component} 
        />
      : <Redirect to="/auth/login" />
    }
    </>
  )
}

export default PrivateRoute;