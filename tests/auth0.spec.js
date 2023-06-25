const { test } = require('@playwright/test');
const auth0PageObjects = require('../steps/auth0steps') 
const auth0username = process.env.AUTH0USER
const auth0password = process.env.AUTH0PASSWORD
const url = "localhost:3000"

test('Log in to web app using Auth0 and check lbs number exists in token', async ({ page }) => {
  await auth0PageObjects.navigateToPage(page, url);
  await auth0PageObjects.clickLoginButton(page);
  await auth0PageObjects.completeEmailField(page, auth0username);
  await auth0PageObjects.clickContinueButton(page);
  await auth0PageObjects.completePasswordField(page, auth0password);
  await auth0PageObjects.clickAuth0LoginButton(page);
  await auth0PageObjects.clickLinkAccount(page);
  await auth0PageObjects.checkTokenClaimsPresent(page);
});
