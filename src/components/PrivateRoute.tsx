import  React from  "react";
import { Route, Redirect } from  "react-router-dom";

const PrivateRoute = (props) => {
  const jwt = localStorage.getItem('jwt');
  const id = localStorage.getItem('id');

  return (
    <>
    {
      jwt && id ? 
        <Route 
          path={props.path} 
          exact={props.exact} 
          component={props.component} 
        />
      : <Redirect to="/auth/signup" />
    }
    </>
  )
}

export default PrivateRoute;