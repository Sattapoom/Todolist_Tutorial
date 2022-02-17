describe('Web Performance', () => {

    context("adding data",()=>{
        it("Remove and Recreate datalist", () => {
            // Cypress.config('baseUrl','http://localhost:8080'); // clear data in DB
            cy.request('DELETE','http://localhost:8080/api/todo');
    
            // cy.server();
            const data = {
                id: null,
                title: "Buy eggs",
                description: "",
                finished: false,
                favor:false,
                summitted: false
            }
            // cy.route('POST','/api/todo');
            for(let i = 0 ; i < 1000 ; i++ ){
                cy.request('POST','http://localhost:8080/api/todo',data);
            }
    
            
            // cy.get(".list-group-item")
            //     .should("have.length",200) // following items length equals 100
            
        })
    })    

    context("test performance" , () => {
        const url = 'http://localhost:3000/';
        it('run web performance measurement and report in html', () => {
            cy.lighthouse(url)
              .then(() => {
                cy.visit('./lhreport.html');
              });
          });
        
          it('run web performance measurement and report in json', () => {
            cy.lighthouse(url, 'json')
            .then(({ stdout }) => {
              const { categories } = JSON.parse(stdout);
              const { accessibility, 'best-practices': bestPractices, performance, pwa, seo } = categories;
              expect(accessibility.score).to.be.greaterThan(0.5);
              expect(bestPractices.score).to.be.greaterThan(0.7);
              expect(performance.score).to.be.greaterThan(0.6);
              expect(pwa.score).to.be.greaterThan(0.5);
              expect(seo.score).to.be.greaterThan(0.85);
            });
          });
    })
  
});