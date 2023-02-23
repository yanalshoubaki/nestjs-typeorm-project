/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { LoginDto, RegisterDto } from 'src/api/user/auth/auth.dto';
import { CreateUserDto } from 'src/api/user/user.dto';
import { User } from 'src/api/user/user.entity';
import { Response } from 'types/general';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(body: LoginDto): Chainable<
        Response<{
          token: string;
          user: User;
        }>
      >;
      register(body: RegisterDto): Chainable<
        Response<{
          token: string;
          user: User;
        }>
      >;
      getUser(id: number): Chainable<Response<User>>;
    }
  }
}

Cypress.Commands.add<any>('register', (body: RegisterDto) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000/auth/register',
    body,
  });
});

Cypress.Commands.add<any>('login', (body: LoginDto) => {
  return cy.request({
    method: 'POST',
    url: 'http://localhost:3000/auth/login',
    body,
  });
});

Cypress.Commands.add('getUser', (id: number) => {
  it.only('API:GET - Get user by id', () => {
    cy.request<Response<User>>('GET', `http://localhost:3000/user/${id}`)
      .as('getUser')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('name');
        expect(response.body.data).to.have.property('email');
      });
  });
});
