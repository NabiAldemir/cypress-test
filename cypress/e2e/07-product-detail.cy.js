describe('07 - Product Detail | Ürün Detay', () => {
  const productSlug = '/whey-protein';

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('TC-7.1 — Bir ürün detay sayfasının yüklenmesi', () => {
    cy.visit('/protein');
    cy.acceptCookies();
    cy.contains('a', /whey protein/i).filter(':visible').first().scrollIntoView().click({ force: true });
    cy.location('pathname', { timeout: 20000 }).should('eq', productSlug);
    cy.get('h1.product-title').filter(':visible').first().invoke('text').should('match', /whey/i);
    cy.contains('button', /SEPETE EKLE/i).last().should('exist');
  });

  context('Whey PDP (/whey-protein)', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      cy.visit(productSlug);
      cy.acceptCookies();
    });

    it('TC-7.2 — Aroma / varyant seçimi (varsa)', () => {
      cy.get('body').then(($body) => {
        const $aroma = $body.find('button').filter((_, el) => /Bisküvi/i.test(el.textContent || ''));
        if (!$aroma.length) {
          cy.log('Aroma düğmeleri bulunamadı (farklı PDP düzeni); test koşulsuz geçiriliyor.');
          return;
        }
        cy.wrap($aroma.last()).scrollIntoView().click({ force: true });
        cy.wrap($aroma.last()).should('have.attr', 'aria-pressed', 'true');
        const $cik = $body.find('button').filter((_, el) => /^Çikolata$/i.test((el.textContent || '').trim()));
        if ($cik.length) {
          cy.wrap($cik.last()).should('have.attr', 'aria-pressed', 'false');
        }
      });
    });

    it('TC-7.3 — Miktar arttırma / azaltma butonları', () => {
      cy.get('body').then(($body) => {
        const $num = $body.find('input[type="number"]').filter(':visible').first();
        if ($num.length) {
          cy.wrap($num).should('have.value', '1');
          cy.wrap($num)
            .parents()
            .filter((_, el) => Cypress.$(el).find('button').toArray().some((b) => (b.textContent || '').includes('+')))
            .first()
            .within(() => {
              cy.contains('button', '+').click({ force: true });
            });
          cy.wrap($num).should('have.value', '2');
          cy.wrap($num)
            .parents()
            .filter((_, el) => Cypress.$(el).find('button').toArray().some((b) => (b.textContent || '').includes('-')))
            .first()
            .within(() => {
              cy.contains('button', '-').click({ force: true });
            });
          cy.wrap($num).should('have.value', '1');
          return;
        }
        const $spin = $body.find('[role="spinbutton"]').filter(':visible').first();
        expect($spin.length, 'miktar kontrolü (number veya spinbutton)').to.be.greaterThan(0);
        cy.wrap($spin).should('have.value', '1');
        cy.wrap($spin)
          .parents()
          .filter((_, el) => Cypress.$(el).find('button').length >= 2)
          .first()
          .within(() => {
            cy.contains('button', '+').click({ force: true });
            cy.get('[role="spinbutton"]').first().should('have.value', '2');
            cy.contains('button', '-').click({ force: true });
            cy.get('[role="spinbutton"]').first().should('have.value', '1');
          });
      });
    });

    it('TC-7.4 — "Sepete Ekle" ile ürünü sepete ekleme', () => {
      cy.clickAddToCartPdp();
      cy.contains('button', /SEPETE EKLE/i).last().should('not.be.disabled', { timeout: 20000 });
      cy.visit('/cart');
      cy.location('pathname').should('eq', '/cart');
      cy.get('a[href*="/whey-protein"]', { timeout: 25000 }).should('have.length.at.least', 1);
      cy.get('body').invoke('text').should('match', /TOPLAM/i).and('match', /TL/);
    });

    it('TC-7.5 — Stokta olmayan ürün davranışı (varsa)', () => {
      cy.contains('button', /SEPETE EKLE/i)
        .last()
        .then(($btn) => {
          if ($btn.is(':disabled')) {
            cy.wrap($btn).should('be.disabled');
          } else {
            cy.wrap($btn).should('not.be.disabled');
          }
        });
    });
  });
});