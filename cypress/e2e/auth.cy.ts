describe('Auth API testing', () => {
  it.only('API:POST - Register', () => {
    cy.register({
      name: 'John Doe',
      email: 'test@gmail.com',
      password: '12345',
    }).then((response) => {
      expect(response.status).to.eq(201, 'Response status matches');
      if (response.status !== 201) {
        cy.login({
          email: 'test@gmail.com',
          password: '12345',
        }).then((response) => {
          expect(response.status).to.eq(200, 'Response status matches');
        });
      } else {
        expect(response.body).to.have.property('user');
        expect(response.body.user).to.have.property('id');
        expect(response.body).to.have.property('token');
        cy.getUser(response.body.user.id).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.id).to.have.property('id');
        });
      }
    });
  });
});
