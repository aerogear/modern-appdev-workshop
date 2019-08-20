import { init } from '@aerogear/app';
import { AeroGearConfiguration, ConfigurationService } from "@aerogear/core";
import { ApolloProvider } from "@apollo/react-hooks"
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { createClient } from "./graphql/client";
import './index.css';
import { getAuth, withAuth } from './services/auth.service'
import * as serviceWorker from './serviceWorker';


import mobileConfig from './mobile-services.json'
const app = init(mobileConfig as unknown as AeroGearConfiguration)
const auth = getAuth(app)

// tslint:disable-next-line: no-floating-promises
createClient(auth, app).then((client) => {
    ReactDOM.render(
        // @ts-ignore
        withAuth(
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        ), document.getElementById('root'));
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
