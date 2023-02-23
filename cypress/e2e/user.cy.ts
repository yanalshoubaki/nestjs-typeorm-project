import { CreateUserDto, UpdateUserDto } from 'src/api/user/user.dto';
import { User } from 'src/api/user/user.entity';
import { Response } from 'types/general';

describe('User API testing', () => {
  it.only('API:GET - Get users', () => {
    cy.request<Response<User[]>>('GET', 'http://localhost:3000/user')
      .as('getUsers')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body.data).length.gte(0);
      });
  });

  it.only('API:POST - Create user', () => {
    const body: CreateUserDto = {
      name: 'John Doe',
      password: '123456',
      username: 'johndoe',
      email: 'test@example.com',
    };
    cy.request<Response<User>>('POST', 'http://localhost:3000/user', body)
      .as('createUser')
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('name');
        expect(response.body.data).to.have.property('email');
      });
  });

  it.only('API:PUT - Update user', () => {
    const body: UpdateUserDto = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'test@example.com',
    };
    cy.request<Response<User>>('PATCH', 'http://localhost:3000/user/1', body)
      .as('updateUser')
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('name');
        expect(response.body.data).to.have.property('email');
      });
  });

  it.only('API:DELETE - Delete user', () => {
    cy.request('DELETE', 'http://localhost:3000/user/1')
      .as('updateUser')
      .then((response) => {
        expect(response.status).to.eq(201);
      });
  });
});
