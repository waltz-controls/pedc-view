import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAppState} from "state/state.context";

function useQuery(): Record<string, any> {
  return new URLSearchParams(useLocation().search);
}

export default function PrivateRoute(props: any) {
  const {children, roles = [], ...rest} = props;
  const appState = useAppState();
  const query = useQuery();
  const docId = query.get('attach_document_by_id');

  const hasDocId = Boolean(docId);
  const hasAuth = Boolean(appState.getToken());
  const hasValidRole = roles.includes(appState.getUserRole());

  return (
    <Route
      {...rest}
      render={({location}) => {
        if(!hasAuth || !hasValidRole){
          appState.clearAll();
          return <Redirect to={{pathname: "/login", state: {from: location}}}/>;
        }

        if(hasDocId){
          return <Redirect to={{pathname: "/documents/attach", state: {docId, from: location}}}/>;
        }

        return (children);
      }}
    />
  );
}
