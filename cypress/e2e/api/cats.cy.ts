describe('cats', () => {
    it('GET Should return array', () => {
        cy.request('http://localhost:3000/api/cats').then((response) => {
            expect(response.status).is.eq(200)
            expect(response.body[0].id).is.equals(0)
        })
    })
})