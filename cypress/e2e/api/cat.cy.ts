describe('cat', () => {
    it('GET Should return a cat with the given valid ID', () => {
        cy.request('http://localhost:3000/api/cat?id=0').then((response) => {
            expect(response.status).is.eq(200)
        })
    })

    it('GET Should return a 404 with a numeric ID that isnt used', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/cat?id=0.1',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(404)
        })
    })
    
    it('GET Should return a 400 with a non-numeric ID', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/cat?id=A',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
        })
    })
    
    it('GET Should return a 400 with a missing ID', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/cat',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
        })
    })



    it('POST Should return a cat with valid Male and Female IDs', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: 0,
                femaleId: 1,
            }}).then((response) => {
            expect(response.status).is.eq(200)
            let id = response.body.id
            let url: string = `http://localhost:3000/api/cat?id=${id}`
            cy.request({
                method: 'DELETE',
                url: url})
        })
    })

    it('POST Should return a gen 1 cat with undefined Male and Female IDs', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: undefined,
                femaleId: undefined,
            }}).then((response) => {
            expect(response.status).is.eq(200)
            let id = response.body.id
            let url: string = `http://localhost:3000/api/cat?id=${id}`
            cy.request({
                method: 'DELETE',
                url: url})
        })
    })

    it('POST Should return a 400 if either the maleId or femaleId is missing', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: 0,
                femaleId: undefined,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
            expect(response.body.error).is.eq("ID for female cat was not correctly provided")
        })
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: undefined,
                femaleId: 0,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
            expect(response.body.error).is.eq("ID for male cat was not correctly provided")
        })
    })

    it('POST Should return a 404 if either the maleId or femaleId doesnt belong to a cat', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: 0,
                femaleId: -2,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(404)
            expect(response.body.error).is.eq("A female cat with that ID could not be found")
        })
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: -2,
                femaleId: 0,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(404)
            expect(response.body.error).is.eq("A male cat with that ID could not be found")
        })
    })



    it('DELETE Should return a cat with the given valid ID', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat',
            body: {
                maleId: undefined,
                femaleId: undefined,
            }}).then((response) => {
            let id = response.body.id
            cy.request({
                method: 'DELETE',
                url: `http://localhost:3000/api/cat?id=${id}`
            }).then((response) => {
                expect(response.status).is.eq(200)
            })
        })
    })

    it('DELETE Should return a 404 with a numeric ID that isnt used', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/api/cat?id=-2',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(404)
        })
    })
    
    it('DELETE Should return a 400 with a non-numeric ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/api/cat?id=A',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
        })
    })
    
    it('DELETE Should return a 400 with a missing ID', () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/api/cat',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
        })
    })
})