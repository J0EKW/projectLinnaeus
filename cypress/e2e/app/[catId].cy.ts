describe('[CatId]', () => {
    it('Load generation 1 cat', () => {
        let response = {
            "id": 0,
            "name": "Test (Male X)",
            "parentIds": {
                "m": -1,
                "f": -1
            },
            "generation": 1,
            "genes": {
                "sex": false,
                "coatCol": {
                    "phenotype": 1,
                    "genotype": [
                        1,
                        0
                    ]
                },
                "orange": {
                    "phenotype": 1,
                    "genotype": [
                        1
                    ]
                }
            }
        }
        cy.intercept('GET','/api/cat?id=0', (req) => {
            req.reply(response)
            }
        ).as('getRequest')
        cy.visit('http://localhost:3000/0')
        cy.get('h1').contains('Test (Male X)')
        cy.get('p').contains('It has no parents')
    })

    it('Load generation n cat', () => {
        let response = [
            {
                "id": 0,
                "name": "Test (Male X)",
                "parentIds": {
                    "m": -1,
                    "f": -1
                },
                "generation": 1,
                "genes": {
                    "sex": false,
                    "coatCol": {
                        "phenotype": 1,
                        "genotype": [
                            1,
                            0
                        ]
                    },
                    "orange": {
                        "phenotype": 1,
                        "genotype": [
                            1
                        ]
                    }
                }
            },
            {
                "id": 1,
                "name": "Test (Male X)",
                "parentIds": {
                    "m": -1,
                    "f": -1
                },
                "generation": 1,
                "genes": {
                    "sex": false,
                    "coatCol": {
                        "phenotype": 1,
                        "genotype": [
                            1,
                            0
                        ]
                    },
                    "orange": {
                        "phenotype": 1,
                        "genotype": [
                            1
                        ]
                    }
                }
            },
            {
                "id": 2,
                "name": "Test (Male X)",
                "parentIds": {
                    "m": 0,
                    "f": 1
                },
                "generation": 1,
                "genes": {
                    "sex": false,
                    "coatCol": {
                        "phenotype": 1,
                        "genotype": [
                            1,
                            0
                        ]
                    },
                    "orange": {
                        "phenotype": 1,
                        "genotype": [
                            1
                        ]
                    }
                }
            },
        ]
        cy.intercept('GET','/api/cat?id=0', (req) => {
            req.reply(response[0])
            }
        ).as('getRequest')
        cy.intercept('GET','/api/cat?id=1', (req) => {
            req.reply(response[1])
            }
        ).as('getRequest')
        cy.intercept('GET','/api/cat?id=2', (req) => {
            req.reply(response[2])
            }
        ).as('getRequest')
        cy.visit('http://localhost:3000/2')
        cy.get('h1').contains('Test (Male X)')
        cy.get('p').contains('It is the child of Test (Male X) and Test (Male X)')
    })

    it('Should redirect to the cattery when CATTERY button is clicked', () => {
        let response = {
            "id": 0,
            "name": "Test (Male X)",
            "parentIds": {
                "m": -1,
                "f": -1
            },
            "generation": 1,
            "genes": {
                "sex": false,
                "coatCol": {
                    "phenotype": 1,
                    "genotype": [
                        1,
                        0
                    ]
                },
                "orange": {
                    "phenotype": 1,
                    "genotype": [
                        1
                    ]
                }
            }
        }
        cy.intercept('GET','/api/cat?id=0', (req) => {
            req.reply(response)
            }
        ).as('getRequest')
        cy.visit('http://localhost:3000/0')
        cy.get('a').contains('CATTERY').click().then(() => {
            cy.get('h1').contains('Cattery')
        })
    })

    it('Should redirect to the cattery when DELETE button is clicked', () => {
        let response = {
            "id": 0,
            "name": "Test (Male X)",
            "parentIds": {
                "m": -1,
                "f": -1
            },
            "generation": 1,
            "genes": {
                "sex": false,
                "coatCol": {
                    "phenotype": 1,
                    "genotype": [
                        1,
                        0
                    ]
                },
                "orange": {
                    "phenotype": 1,
                    "genotype": [
                        1
                    ]
                }
            }
        }
        cy.intercept('GET','/api/cat?id=0', (req) => {
            req.reply(response)
            }
        ).as('getRequest')
        cy.intercept(
            {
                method:'DELETE',
                url:'/api/cat?id=0'
            },
            {
                statusCode: 200,
                body: { message: 'Cat was successfully deleted' }
            }
        ).as('deleteRequest')
        cy.visit('http://localhost:3000/0')
        cy.get('button').contains('DELETE').click().then(() => {
            cy.get('h1').contains('Cattery')
        })
    })
})