import {Redirect, Route} from "react-router-dom";
import {useAppState} from "state/state.context";


export default function PrivateRoute(props: any) {
  const {children, ...rest} = props;
  let appState = useAppState();

  const hasAuth = Boolean(appState.getToken());

  return (
    <Route
      {...rest}
      render={({location}) =>
        hasAuth ? (children) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}
