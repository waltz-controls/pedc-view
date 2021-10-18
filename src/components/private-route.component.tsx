import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAppState} from "state/state.context";

function useQuery(): Record<string, any> {
  return new URLSearchParams(useLocation().search);
}

export default function PrivateRoute(props: any) {
  const {children, ...rest} = props;
  const appState = useAppState();
  const query = useQuery();
  const docId = query.get('attach_document_by_id');

  const hasDocId = Boolean(docId);
  const hasAuth = Boolean(appState.getToken());

  return (
    <Route
      {...rest}
      render={({location}) => {
        if(hasAuth && hasDocId){
          return <Redirect to={{pathname: "/documents/attach", state: {docId}}}/>;
        }

        if(!hasAuth){
          return <Redirect to={{pathname: "/login", state: {from: location}}}/>;
        }

        return (children);
      }}
    />
  );
}
