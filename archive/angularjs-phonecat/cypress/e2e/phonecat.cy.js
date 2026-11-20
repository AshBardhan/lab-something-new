// PhoneCat Application E2E Tests - Converted from Protractor to Cypress

describe('PhoneCat Application', () => {

  it('should redirect `index.html` to `index.html#!/phones`', () => {
    cy.visit('/index.html')
    cy.url().should('include', 'index.html#!/phones')
  })

  describe('View: Phone list', () => {

    beforeEach(() => {
      cy.visit('/index.html#!/phones')
    })

    it('should filter the phone list as a user types into the search box', () => {
      // Wait for phones to load
      cy.get('.phones li').should('have.length', 20)
      
      const searchBox = cy.get('input[ng-model="$ctrl.query"]')
      
      // Filter by 'nexus'
      searchBox.type('nexus')
      cy.get('.phones li').should('have.length', 1)
      
      // Clear and filter by 'motorola'
      searchBox.clear()
      searchBox.type('motorola')
      cy.get('.phones li').should('have.length', 8)
    })

    it('should be possible to control phone order via the drop-down menu', () => {
      const searchBox = cy.get('input[ng-model="$ctrl.query"]')
      const orderSelect = cy.get('select[ng-model="$ctrl.orderProp"]')
      
      // Narrow dataset to tablets
      searchBox.type('tablet')
      
      // Check default order (by age) - use the name link, not the image link
      cy.get('.phones li a:not(.thumb)').first().should('contain', 'Motorola XOOM™ with Wi-Fi')
      cy.get('.phones li a:not(.thumb)').last().should('contain', 'MOTOROLA XOOM™')
      
      // Change order to alphabetical
      orderSelect.select('name')
      
      // Check new order
      cy.get('.phones li a:not(.thumb)').first().should('contain', 'MOTOROLA XOOM™')
      cy.get('.phones li a:not(.thumb)').last().should('contain', 'Motorola XOOM™ with Wi-Fi')
    })

    it('should render phone specific links', () => {
      const searchBox = cy.get('input[ng-model="$ctrl.query"]')
      searchBox.type('nexus')
      
      // Click first phone name link (not the image link)
      cy.get('.phones li a:not(.thumb)').first().click()
      
      // Verify navigation to phone detail page
      cy.url().should('include', 'index.html#!/phones/nexus-s')
    })

  })

  describe('View: Phone detail', () => {

    beforeEach(() => {
      cy.visit('/index.html#!/phones/nexus-s')
    })

    it('should display the `nexus-s` page', () => {
      cy.get('h1').should('have.text', 'Nexus S')
    })

    it('should display the first phone image as the main phone image', () => {
      cy.get('img.phone.selected')
        .should('have.attr', 'src')
        .and('include', 'img/phones/nexus-s.0.jpg')
    })

    it('should swap the main image when clicking on a thumbnail image', () => {
      const mainImage = () => cy.get('img.phone.selected')
      
      // Click third thumbnail
      cy.get('.phone-thumbs img').eq(2).click()
      mainImage()
        .should('have.attr', 'src')
        .and('include', 'img/phones/nexus-s.2.jpg')
      
      // Click first thumbnail
      cy.get('.phone-thumbs img').eq(0).click()
      mainImage()
        .should('have.attr', 'src')
        .and('include', 'img/phones/nexus-s.0.jpg')
    })

  })

})
