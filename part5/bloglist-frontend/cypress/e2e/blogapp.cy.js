/* eslint-disable func-names */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const userDetails = { username: 'testname', name: 'testname', password: 'testpsw' };
    cy.request('POST', 'http://localhost:3003/api/users', userDetails);
    const userDetailsTwo = { username: 'testname2', name: 'testname2', password: 'testpsw2' };
    cy.request('POST', 'http://localhost:3003/api/users', userDetailsTwo);
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testname');
      cy.get('#password').type('testpsw');
      cy.get('button:contains("Login")').click();
      cy.contains('testname is logged in');
    });

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('wrong');
      cy.get('button:contains("Login")').click();
      cy.contains('Invalid credentials');
      cy.contains('Invalid credentials').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      // cy.get('#username').type('testusername');
      // cy.get('#password').type('testpsw');
      // cy.get('button:contains("Login")').click();
      cy.login({ username: 'testname', password: 'testpsw' });
    });

    it('user can create a new blog', function () {
      cy.contains('Show Create Form').click();
      cy.get('#title').type('new blog');
      cy.get('#url').type('newurl');
      cy.contains('Create Blog').click();
      cy.get('.blog').should('have.length', 1);
    });

    it('User can like a blog', function () {
      cy.createBlog({ title: 'tt', url: '11' });
      cy.get('.blog').contains('Show').click();
      cy.get('.blog').contains('like').click();
      cy.contains('Likes: 1');
    });

    it('User can like a blog', function () {
      cy.createBlog({ title: 'tt', url: '11' });
      cy.get('.blog').contains('Show').click();
      cy.get('.blog').contains('like').click();
      cy.contains('Likes: 1');
    });

    it('User can delete a blog', function () {
      cy.createBlog({ title: 'tt', url: '11' });
      cy.get('.blog').contains('Show').click();
      cy.get('.blog').contains('Delete').click();
      cy.get('.blog').should('have.length', 0);
    });

    it('Delete button is only displayed to the creator', function () {
      cy.createBlog({ title: 'tt', url: '11' });
      cy.get('.blog').contains('Show').click();
      cy.get('.blog').should('contain', 'Delete');
      cy.contains('Logout').click();
      cy.login({ username: 'testname2', password: 'testpsw2' });
      cy.get('.blog').contains('Show').click();
      cy.get('.blog').should('not.contain', 'Delete');
    });
  });

  it('Blog posts are sorted by number of likes', function () {
    cy.login({ username: 'testname', password: 'testpsw' });
    cy.createBlog({ title: 'second', url: 'second', likes: 4 });
    cy.createBlog({ title: 'first', url: 'first', likes: 11 });
    cy.createBlog({ title: 'third', url: 'third', likes: 1 });
    cy.get('.blog').eq(0).should('contain', 'first');
    cy.get('.blog').eq(1).should('contain', 'second');
    cy.get('.blog').eq(2).should('contain', 'third');
  });
});
