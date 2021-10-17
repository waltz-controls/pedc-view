import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAppState} from "state/state.context";

function useQuery(): Record<string, any> {
  return new URLSearchParams(useLocation().search);
}

export default function PrivateRoute(props: any) {
  const {children, ...rest} = props;
  const appState = useAppState();
  const query = useQuery();
  const documentId = query.get('document_id');

  const hasDocumentId = Boolean(documentId);
  const hasAuth = Boolean(appState.getToken());

  return (
    <Route
      {...rest}
      render={({location}) => {
        if(hasAuth && hasDocumentId){
          return <Redirect to={"/documents/" + documentId}/>;
        }

        if(!hasAuth){
          return <Redirect to={{pathname: "/login", state: {from: location}}}/>;
        }

        return (children);
      }}
    />
  );
}
