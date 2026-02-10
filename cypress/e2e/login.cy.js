/// <reference types= "cypress" />

describe('Teste de API - Login', () => {
    it('Deve realizar o login com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        }).should((Response) => {
            expect(Response.body.message).to.equal('Login realizado com sucesso')
            expect(Response.status).to.equal(200)
        })
    })
});