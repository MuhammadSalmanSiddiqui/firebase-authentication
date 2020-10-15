import React,{useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router,Switch,Route,withRouter} from 'react-router-dom';
import {Register, Login} from './components/Auth';
import 'semantic-ui-css/semantic.min.css';
import firebase from './firebase';

const Root = ({history}) => {
  useEffect(()=>{
     firebase.auth().onAuthStateChanged(user =>{
         if(user){
            history.push('/');
         }
     })
  },[]);

  return (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
  );
};

const RootwithAuth = withRouter(Root);

ReactDOM.render(<Router><RootwithAuth /></Router>, document.getElementById('root'));
registerServiceWorker();
