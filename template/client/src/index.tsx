import { ApolloProvider } from "@apollo/react-hooks"
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { createClient } from "./graphql/client";
import './index.css';
import * as serviceWorker from './serviceWorker';
import { KeycloakProvider } from 'react-keycloak';

import { init } from '@aerogear/app';
import { Auth } from '@aerogear/auth';

import mobileConfig from './mobile-services.json'
import { AeroGearConfiguration, ConfigurationService } from "@aerogear/core";

const app = init(mobileConfig as unknown as AeroGearConfiguration)
const auth = new Auth(app.config as ConfigurationService)

// tslint:disable-next-line: no-floating-promises
createClient(auth, app).then((client) => {
    ReactDOM.render(
        //@ts-ignore
        <KeycloakProvider keycloak={auth.extract()} initConfig={{ onLoad: 'login-required' }}>
            <ApolloProvider client={client as any}>
                <App />
            </ApolloProvider>
        </KeycloakProvider>
        , document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
