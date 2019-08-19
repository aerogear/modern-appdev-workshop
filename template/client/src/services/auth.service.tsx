import { Auth } from '@aerogear/auth';
import { AeroGearConfiguration, ConfigurationService, ServiceConfiguration } from "@aerogear/core";
import { AeroGearApp } from "@aerogear/app";
import React, { ReactNode } from 'react'
import { KeycloakProvider } from 'react-keycloak'


const LoadingComponent = () => <h2>Loading...</h2>

let auth

export const getAuth = (app: AeroGearApp): Auth | undefined => {
    const appConfig = app.config as ConfigurationService;
    const authConfig = appConfig.getConfigByType(Auth.TYPE) as ServiceConfiguration[];

    if (authConfig.length > 0) {
        auth = new Auth(appConfig)
        return auth
    }
}


export const withAuth = (children: ReactNode) => {
    if (auth) {
        return (
            <KeycloakProvider keycloak={auth.extract()} initConfig={{ onLoad: 'login-required' }} LoadingComponent={LoadingComponent()}>
                {children}
            </KeycloakProvider>
        )
    }
    return children
}