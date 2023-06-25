import jwt_decode from "jwt-decode"; 

const { test, expect } = require('@playwright/test');

async function navigateToPage(page, url) {
  await test.step(`Given I go to the web page ${url}`, async () => {
    await page.goto(url);
  });
}

async function clickLoginButton(page) {
  await test.step('When I click the login button', async () => {
    await page.getByRole('button', { name: 'Log in' }).click();
  });
}

async function completeEmailField(page, email) {
  await test.step(`When I fill in the email address field with ${email}`, async () => {
    await page.getByLabel('Email').fill(email);
  });
}

async function clickContinueButton(page) {
  await test.step('When I click the continue button', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
  });
}

async function completePasswordField(page, password) {
  await test.step(`When I fill in the password field`, async () => {
    await page.getByLabel('Password').fill(password);
  });
}

async function clickAuth0LoginButton(page) {
  await test.step('When I click the Auth0 Login button', async () => {
    await page.getByRole('button', { name: 'Log in' }).click();
  });
}

async function clickLinkAccount(page) {
  await test.step(`If link account button appears then click accept`, async () => {
    let linkAccount = await page.getByRole('button', { name: 'Accept' }).isVisible();
      if ((linkAccount == true)) {
        await page.getByRole('button', { name: 'Accept' }).click();
      }
  });
}

async function checkTokenClaimsPresent(page) {
  await test.step(`Then the LBS number and Netlify Guest Role are present in the ID token`, async () => {
      const response = await page.waitForResponse(response => response.url().includes('/oauth/token') && response.status() === 200);
      let responseBody = await response.body();
      let jsonResponse = (JSON.parse(responseBody));
      let id_token = jsonResponse.id_token;
      let decoded_id_token
      try {
        decoded_id_token = jwt_decode(id_token);
      } catch (error) {
        console.error(error);
      }
      let lbsNumber = (decoded_id_token["https://www.london.edu/lbs_no"]);
      expect(lbsNumber).toBeTruthy;
      let netlifyRole = (decoded_id_token["https://netlify-integration.com/roles"]);
      expect(netlifyRole).toStrictEqual(["guest"]);
  });
}

module.exports = {
    navigateToPage,
    clickLoginButton,
    completeEmailField,
    clickContinueButton,
    clickLinkAccount,
    completePasswordField,
    clickAuth0LoginButton,
    checkTokenClaimsPresent
}
