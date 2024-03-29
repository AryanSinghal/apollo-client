import React from 'react';
import { CssBaseline } from '@material-ui/core';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-components';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  Trainee, Login, NoMatch, TextFieldDemo, InputDemo, ChildrenDemo,
} from './pages';
import { SnackbarProvider } from './contexts';
import { AuthRoute, PrivateRoute } from './routes';
import { theme } from './theme';
import client from './lib/apollo-client';

function App() {
  return (
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <AuthRoute exact path="/login" component={Login} />
              <PrivateRoute path="/trainee" component={Trainee} />
              <PrivateRoute exact path="/textfield-demo" component={TextFieldDemo} />
              <PrivateRoute exact path="/input-demo" component={InputDemo} />
              <PrivateRoute exact path="/children-demo" component={ChildrenDemo} />
              <PrivateRoute component={NoMatch} />
            </Switch>
          </Router>
        </ThemeProvider>
      </SnackbarProvider>
    </ApolloProvider>
  );
}

export default App;
