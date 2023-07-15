describe('cat/name', () => {
    it('POST Should update the cats name', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat/name',
            body: {
                id: 0,
                newName: "Saffron (Male One)",
            }}).then((response) => {
            expect(response.status).is.eq(200)
        })
    })

    it('POST Should return 400 if ID or name is missing', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat/name',
            body: {
                id: 0,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
            expect(response.body.error).is.eq("A new name was not correctly provided")
        })
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat/name',
            body: {
                newName: "Saffron (Male One)",
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(400)
            expect(response.body.error).is.eq("ID for the cat was not correctly provided")
        })
    })

    it('POST Should return 404 if no cat has that ID', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/cat/name',
            body: {
                id: -2,
                newName: "Saffron (Male One)",
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).is.eq(404)
        })
    })
})