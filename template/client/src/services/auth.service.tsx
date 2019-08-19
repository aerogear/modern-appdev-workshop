import { AeroGearConfiguration, ConfigurationService, ServiceConfiguration } from "@aerogear/core";
import { Auth } from '@aerogear/auth';
import { init } from '@aerogear/app';

import React, { ReactNode } from 'react'
import { KeycloakProvider } from 'react-keycloak'
import mobileConfig from '../mobile-services.json'

const appConfig = init(mobileConfig as unknown as AeroGearConfiguration).config as ConfigurationService

const authConfig = appConfig.getConfigByType(Auth.TYPE) as ServiceConfiguration[]

let auth
if (authConfig.length > 0) {
    auth = new Auth(appConfig)
}

const LoadingComponent = () => <h2>Loading...</h2>

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

export { auth }