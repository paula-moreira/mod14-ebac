/// <reference types="cypress" />

let token
beforeEach(() => {
    cy.token("paulam@qa.com", "teste12345").then(tkn => {
        token = tkn
    })
});


describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('quantidade')
            expect(response.body).to.have.property('usuarios')
            expect(response.body.usuarios).to.be.an('array')
        })
    });

    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'usuarios',
            headers: { 'Authorization': token }
        }).should(response => {
            expect(response.status).to.equal(200)
        })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
        let email = `paulam${Date.now()}@qa.com`
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Paula Moreira QA",
                "email": email,
                "password": "teste12345",
                "administrador": "true"
            }
        }).should(response => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar um usuário com email inválido', () => {
        cy.request({
            method: 'POST',
            url: 'usuarios',
            body: {
                "nome": "Paula Moreira QA",
                "email": "paulamr@qa.com",
                "password": "teste12345",
                "administrador": "true"
            },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).to.equal(400)
        })

    });

    it('Deve editar um usuário previamente cadastrado', () => {
        let email = `paulam${Date.now()}@qa.com`
        cy.request({
            method: 'PUT',
            url: 'usuarios',
            headers: { 'Authorization': token },
            body: {
                nome: "Paula Moreira QA2",
                email: "paulamodificado@qa.com",
                password: "teste123454",
                administrador: "true",
            },
            failOnStatusCode: false
        }).should(response => {
            expect(response.status).to.equal(405)
        })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
        let email = `paulam${Date.now()}@qa.com`
        cy.cadastrarUsuario('Paula Moreira excluir', 'emai85647l3@excluir.com', 'senhaatelog', 'true').then(userId => {
            cy.request({
                method: 'DELETE',
                url: `usuarios/${userId}`,
                headers: { 'Authorization': token }
            }).should(response => {
                expect(response.status).to.equal(200)
                //expect(response.body.message).to.equal('Registro Registro excluído com sucesso | Nenhum registro excluído com sucesso')
            })
        
        });


    })
})