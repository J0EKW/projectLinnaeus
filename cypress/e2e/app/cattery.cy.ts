describe('Cattery', () => {
    it('Should load default elements', () => {
        cy.intercept('GET', '/api/cats', {
            statusCode: 200,
            body: []
        }).as('request')
        cy.visit('http://localhost:3000/cattery')
        cy.wait('@request').then((response) => {
            expect(response).not.null
            expect(response.response?.statusCode).is.equals(200)
            expect(response.response?.body).is.empty
        })
        cy.get('h1').contains('Cattery')
    })

    it('Should load all given cats with working links', () => {
        cy.fixture('catteryResponse.json').then((data) => {
            cy.intercept(
                {
                    method:'GET',
                    url:'/api/cats'
                },
                {
                    statusCode: 200,
                    body: data
                }
        ).as('request')})
        
        cy.visit('http://localhost:3000/cattery')
        cy.wait('@request').then((response) => {
            expect(response).not.null
            expect(response.response?.statusCode).is.equals(200)
            expect(response.response?.body[0].id).is.equals(0)
        })
        cy.get('h1').contains('Cattery')
        cy.get('a').as('click')
        cy.get('@click').contains('Saffron (Male One)').click().then(() => {
            cy.get('h1').contains('Saffron (Male One)')
        })
    })

    it('Should handle API errors', () => {
        cy.intercept(
            {
                method:'GET',
                url:'/api/cats'
            },
            {
                statusCode: 500,
                body: {
                    error: 'Something went wrong, please try again'
                }
            }
        ).as('request')
        
        cy.visit('http://localhost:3000/cattery')
        cy.wait('@request').then((response) => {
            expect(response).not.null
            expect(response.response?.statusCode).is.equals(500)
        })
        cy.get('p').contains('An error occurred, please try again')
    })

    it('Should be able to create new cat', () => {
        var responseNo = 0
        const response = [
            [
                {
                    "id": 0,
                    "name": "Saffron (Male One)",
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
                    "name": "Stripes (Male Two)",
                    "parentIds": {
                        "m": -1,
                        "f": -1
                    },
                    "generation": 1,
                    "genes": {
                        "sex": false,
                        "coatCol": {
                            "phenotype": 0,
                            "genotype": [
                                0,
                                0
                            ]
                        },
                        "orange": {
                            "phenotype": 0,
                            "genotype": [
                                0
                            ]
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "Mittens (Female One)",
                    "parentIds": {
                        "m": -1,
                        "f": -1
                    },
                    "generation": 1,
                    "genes": {
                        "sex": true,
                        "coatCol": {
                            "phenotype": 2,
                            "genotype": [
                                2,
                                0
                            ]
                        },
                        "orange": {
                            "phenotype": 1,
                            "genotype": [
                                1,
                                1
                            ]
                        }
                    }
                }
            ],
            [
                {
                    "id": 0,
                    "name": "Saffron (Male One)",
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
                    "name": "Stripes (Male Two)",
                    "parentIds": {
                        "m": -1,
                        "f": -1
                    },
                    "generation": 1,
                    "genes": {
                        "sex": false,
                        "coatCol": {
                            "phenotype": 0,
                            "genotype": [
                                0,
                                0
                            ]
                        },
                        "orange": {
                            "phenotype": 0,
                            "genotype": [
                                0
                            ]
                        }
                    }
                },
                {
                    "id": 2,
                    "name": "Mittens (Female One)",
                    "parentIds": {
                        "m": -1,
                        "f": -1
                    },
                    "generation": 1,
                    "genes": {
                        "sex": true,
                        "coatCol": {
                            "phenotype": 2,
                            "genotype": [
                                2,
                                0
                            ]
                        },
                        "orange": {
                            "phenotype": 1,
                            "genotype": [
                                1,
                                1
                            ]
                        }
                    }
                },
                {
                    "id": 3,
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
            ]
        ]
        cy.intercept('GET','/api/cats', (req) => {
            req.reply(response[responseNo++])
            }
        ).as('getRequest')
        
        cy.visit('http://localhost:3000/cattery')
        cy.wait('@getRequest')
        cy.get('button').contains('NEW CAT').as('button')
        cy.get('@button').click().then(() => {
            cy.wait('@getRequest')
            cy.get('a').contains('Test (Male X)')
        })
    })
})