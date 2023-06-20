# LBS.Auth0.E2E.Playwright
Simple Login via Auth0 Lock UI using Playwright

# Overview
The solution uses Playwright as part of its end-to-end testing suite.

# Design and Architecture
The test harness consists of a simple Auth0 Single Page Application (SPA) and a test runner (Playwright) which we can use to grant us access to the LBS Auth0 client. It leverages an Azure Devops pipeline.yaml file to handle all of the credentials retrieval when ran as part of a pipeline, as well as handle any artefacts.
![Architecture](https://github.com/amido/LBS.Auth0.E2E.Playwright/assets/29248132/90da67c4-ca8c-4a97-aeab-5d1163afa53a)


# Running locally
You will need [Node.js](https://nodejs.org/en/) installed to run the test harness locally. And Docker if you wish to run the SPA within a container; running in a container is completely optional however, and the SPA can also be ran in non-containerised mode.

## Setting up your local environment
- Clone the Identity Repository

All local setup should be done from within the root directory of the End-to-end test solution within the LBS Identity project. This is located within `./LBS-Identity/LBS.Identity.E2eTests`
## Installing dependencies
- Open a terminal and navigate to `LBS.Identity.E2eTests` (as mentioned above)
- Run `npm install` to install the node project dependencies
- Run `npx install playwright` to install the test runner and browser dependencies

## Creating a `.env` file

To run locally you will need the credentials to access the Auth0 environment you wish to target. These can be found in Azure Keyvault under the `kvldneduidentlbsnosv{environment}` resource (replacing environment with one of the following:
- dev *(dev should also be used for SIT)
- qau
- pp
- liv

The credentials can be found under the following secret keys:

- `portal-app-client-id`
- `auth0-domain`
- `auth0-e2e-test-email`
- `auth0-e2e-test-password`

Create a `.env` file in the `LBS.Identity.E2eTests` directory and add in the credentials as shown below (remove the curly braces).

```
DOMAIN={auth0-domain}
CLIENTID={portal-app-client-id}
AUTH0USER={auth0-e2e-test-email}
AUTH0PASSWORD={auth0-e2e-test-password}
```

## Generating `auth_config.json` file
The SPA uses an `auth_config.json` file for connection context. To generate the `auth_config` open a terminal and run `node ./environment-config.js`

## Launching the Auth0 SPA
The SPA can be ran in either containerised or non-containerised mode. In either case you can check that the SPA is running by opening a browser and navigating to http://localhost:3000
### Containerised
Run `sh ./exec.sh` to build and run the containerised SPA locally (alternatively you can also run `pwsh exec.ps1` if you're running in Windows).
### Non-containerised
Run `node ./binaries/www` to run the SPA in non-containerised mode.

## Running tests
Run `npx playwright test` to launch the tests in headless mode
Run `npx playwright test --headed` to run in headed mode
#Writing Tests
The test harness is written with BDD syntax. Each test has a `.spec.js` file and an associated `steps.js` file. The `spec.js` file contains the order of execution along with the name of the test case, whilst the `steps.js` file contains abstractions of the test steps as functions, along with a BDD decorator for identification.

# Configuring Playwright
# Test Artifacts
## Test Reporting
A test report is generated after each test run. This can be viewed by running `npx playwright show-report`
## Test Recording
A test recording is created if a failure occurs during the test run. This can be found within the `./test-results` directory.
# Generating Playwright tests
Playwright also supports test generation out of the box. You can generate test snippets from the webpage of your choice by running `npx playwright codegen {your-website}`
