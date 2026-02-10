/// <reference types= "cypress"/>

describe('Teste de API - Produtos', () => {

    let token
    beforeEach(() => {
        cy.token('fulano@qa.com' , 'teste').then(tkn => {
            token = tkn
        })
    });

    it('Deve listar produtos com sucesso - GET', () => {
        cy.request({
         method: 'GET',
         url: 'produtos'                
        }).should((response) => {
            expect(response.status).equal(200)
            expect(response.body).to.have.property('produtos')
        })
    });

    it('Deve cadastrar produto com sucesso - POST', () => {
        let produto = 'Produto EBAC' + Math.floor(Math.random() * 200000000000000)
        cy.cadastrarProduto(token, produto, 12000, "celular Appleblitz", 1)
        .should((response) => {
         expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
        })
    });

    it('Deve validar mensagem de produto cadastrado anteriormente -  POST', () => {
        cy.cadastrarProduto(token, 'iPhone 19 Pro Max', 12000, "celular Apple", 1)
         .should((response) => {
         expect(response.status).equal(400)
         expect(response.body.message).equal('Já existe produto com esse nome')
        })
    });

    it('Deve editar um produto com sucesso - PUT', () => {
        let produto = 'Produto EBAC Editado' + Math.floor(Math.random() * 200000000000000)
        cy.cadastrarProduto(token, produto, 58, "Produto EBAC Editado", 10)
            .then(response => {
                let id = response.body._id
                cy.request({
                    method: 'PUT',
                    url: `produtos/${id}`,
                    headers: {authorization: token},
                    body:{
                        "nome": produto,
                        "preco": 470,
                        "descricao": "Produto editado",
                        "quantidade": 4333382
                     }
                }).should((response) => {
                 expect(response.body.message).equal('Registro alterado com sucesso')
                 expect(response.status).to.equal(200)
            })
        });
    })

    it('Deve deletar um produto com sucesso - DELETE', () => {
        cy.cadastrarProduto(token, 'Produto EBAC a ser deletado', 100, 'Delete', 50)
            .then(response => {
            let id = response.body._id
            //const authHeader = token.startsWith('Bearer ') ? token : `Bearer ${token}`
            cy.request({
              method: 'DELETE',
              url: `produtos/${id}`,
              headers: { authorization: token }
        }).should(resp =>{
            expect(resp.body.message).to.equal('Registro excluído com sucesso')
            expect(resp.status).to.equal(200)
        })
    })
})
})


