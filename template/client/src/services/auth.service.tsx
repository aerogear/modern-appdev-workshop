import { Auth } from '@aerogear/auth';
import { AeroGearConfiguration, ConfigurationService, ServiceConfiguration } from "@aerogear/core";
import { AeroGearApp } from "@aerogear/app";
import React, { ReactNode } from 'react'
import { KeycloakProvider } from 'react-keycloak'


const LoadingComponent = () => <h2>Loading...</h2>

let auth

export const withAuth = (children: ReactNode, app: AeroGearApp) => {
    if (!app.config) {
        return children
    }
    const appConfig: ConfigurationService = app.config;
    const authConfig = appConfig.getConfigByType(Auth.TYPE) as ServiceConfiguration[]

    let auth
    if (authConfig.length > 0) {
        auth = new Auth(appConfig)
    }

    if (auth) {
        return (
            <KeycloakProvider keycloak={auth.extract()} initConfig={{ onLoad: 'login-required' }} LoadingComponent={LoadingComponent()}>
                {children}
            </KeycloakProvider>
        )
    }
    return children
}

export { auth }