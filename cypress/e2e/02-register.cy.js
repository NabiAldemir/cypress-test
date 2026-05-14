describe('02 - Register | Üye Olma', () => {
  const registerForm = () => cy.contains('button', 'ÜYE OL').closest('form');
  const firstNameInput = () =>
    registerForm()
      .find('input:not([type="email"]):not([type="password"]):not([type="checkbox"]):not([type="submit"])')
      .eq(0);
  const lastNameInput = () =>
    registerForm()
      .find('input:not([type="email"]):not([type="password"]):not([type="checkbox"]):not([type="submit"])')
      .eq(1);
  const emailInput = () => registerForm().find('input[type="email"]');
  const passwordInput = () => registerForm().find('input[type="password"]');
  const submitButton = () => cy.contains('button', 'ÜYE OL');

  beforeEach(() => {
    cy.visit('/account/register');
  });

  it('TC-2.1 — Boş form ile kayıt denemesi', () => {
    submitButton().click();

    cy.url().should('include', '/account/register');
    cy.contains('Zorunlu').should('be.visible');
  });

  it('TC-2.2 — Eksik alanlar ile kayıt (sadece e-posta dolu)', () => {
    emailInput().type(Cypress.env('registerEmail'));
    submitButton().click();

    cy.url().should('include', '/account/register');
    cy.contains('Zorunlu').should('be.visible');
  });

  it('TC-2.4 — Zayıf şifre ile kayıt', () => {
    firstNameInput().type(Cypress.env('registerFirstName'));
    lastNameInput().type(Cypress.env('registerLastName'));
    emailInput().type(Cypress.env('registerEmail'));
    passwordInput().type('123');
    submitButton().click();

    cy.url().should('include', '/account/register');
    cy.contains('En az 6 karakter olmalı').should('be.visible');
  });

  it('TC-2.5 — KVKK / Sözleşme onayı verilmeden kayıt (BUG: site bunu engellemiyor)', () => {
    firstNameInput().type(Cypress.env('registerFirstName'));
    lastNameInput().type(Cypress.env('registerLastName'));
    emailInput().type(Cypress.env('registerEmail'));
    passwordInput().type(Cypress.env('registerPassword'));

    registerForm()
      .find('input[type="checkbox"]')
      .each(($cb) => {
        cy.wrap($cb).uncheck({ force: true });
      });

    registerForm()
      .find('input[type="checkbox"]:checked')
      .should('have.length', 0);

    submitButton().click();

    cy.wait(3000);

    cy.get('body').then(($body) => {
      const text = $body.text();
      const successVisible = /Kayıt başarılı/i.test(text);

      if (successVisible) {
        throw new Error(
          'BUG: KVKK ve Üyelik sözleşmesi checkbox\'ları işaretlenmeden de kayıt başarıyla tamamlandı. ' +
            'Site, sözleşme onayı olmadan kayıt yapılmasını engellemelidir.'
        );
      }
    });

    cy.contains(/sözleşmeyi kabul|kvkk.*kabul|onaylamanız gerekiyor|kabul etmelisiniz|zorunlu/i)
      .should('be.visible');
  });

  it('TC-2.6 — Başarılı kayıt (happy path)', () => {
    firstNameInput().type(Cypress.env('registerFirstName'));
    lastNameInput().type(Cypress.env('registerLastName'));
    emailInput().type(Cypress.env('registerEmail'));
    passwordInput().type(Cypress.env('registerPassword'));

    submitButton().click();

    cy.contains('Kayıt başarılı', { timeout: 15000 }).should('be.visible');
  });

  it('TC-2.7 — Mevcut e-posta ile tekrar kayıt denemesi', () => {
    firstNameInput().type(Cypress.env('registerFirstName'));
    lastNameInput().type(Cypress.env('registerLastName'));
    emailInput().type(Cypress.env('registerEmail'));
    passwordInput().type(Cypress.env('registerPassword'));

    submitButton().click();

    cy.contains('Bu e-posta adresi sistemde kayıtlı', { timeout: 10000 })
      .should('be.visible');
  });
});
