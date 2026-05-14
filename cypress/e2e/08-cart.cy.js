describe('08 - Cart | Sepet İşlemleri', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });
  const resetCartSession = () => {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  };

  const addWheyFromPdp = () => {
    cy.visit('/whey-protein');
    cy.acceptCookies();
    cy.clickAddToCartPdp();
    cy.contains('button', /SEPETE EKLE/i).last().should('not.be.disabled', { timeout: 20000 });
  };

  const openCartPage = () => {
    cy.visit('/cart');
    cy.acceptCookies();
  };

  it('TC-8.1 — Boş sepet ile sepet sayfasının açılması', () => {
    resetCartSession();
    openCartPage();
    cy.location('pathname').should('eq', '/cart');
    cy.contains('button', /ALIŞVERİŞE BAŞLA/i).should('be.visible');
  });

  it('TC-8.2 — Sepete ürün eklendikten sonra sepet sayfasının doğru göstermesi', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.get('a[href*="/whey-protein"]', { timeout: 25000 }).should('have.length.at.least', 1);
    cy.get('body').invoke('text').should('match', /TOPLAM/i).and('match', /TL/);
  });

  it('TC-8.3 — Sepet içinde ürün miktarını arttırma', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.get('a[href*="/whey-protein"]', { timeout: 25000 }).should('exist');
    cy.get('input[type="number"], [role="spinbutton"]').filter(':visible').first().should('have.value', '1');
    cy.get('input[type="number"], [role="spinbutton"]')
      .filter(':visible')
      .first()
      .parent()
      .within(() => {
        cy.contains('button', '+').click({ force: true });
      });
    cy.get('input[type="number"], [role="spinbutton"]').filter(':visible').first().should('have.value', '2');
  });

  it('TC-8.4 — Sepet içinde ürün miktarını azaltma', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.get('a[href*="/whey-protein"]', { timeout: 25000 }).should('exist');
    cy.get('input[type="number"], [role="spinbutton"]').filter(':visible').first().should('have.value', '1');
    cy.get('input[type="number"], [role="spinbutton"]')
      .filter(':visible')
      .first()
      .parent()
      .within(() => {
        cy.contains('button', '+').click({ force: true });
        cy.get('input[type="number"], [role="spinbutton"]').first().should('have.value', '2');
        cy.contains('button', '-').click({ force: true });
        cy.get('input[type="number"], [role="spinbutton"]').first().should('have.value', '1');
      });
  });

  it('TC-8.5 — Sepetten ürün silme', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.contains(/TOPLAM|SEPET/i).first().scrollIntoView();
    cy.get('a[href*="/whey-protein"]')
      .first()
      .closest('li, tr, article, [class*="line"], [class*="item"], [class*="row"]')
      .first()
      .within(() => {
        cy.get('button')
          .filter((_, el) => {
            const label = `${el.getAttribute('aria-label') || ''} ${el.getAttribute('title') || ''}`;
            if (/sil|kaldır|remove|delete|çöp/i.test(label)) return true;
            const t = (el.textContent || '').trim();
            return t.length === 0 && Boolean(el.querySelector('svg'));
          })
          .first()
          .click({ force: true });
      });
    cy.contains('button', /ALIŞVERİŞE BAŞLA/i, { timeout: 15000 }).should('be.visible');
  });

  it('TC-8.6 — Geçersiz promosyon kodu girişi', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.contains(/Promosyon Kodu/i).scrollIntoView({ offset: { top: -120, left: 0 } });
    cy.get('body').then(($body) => {
      const $promoHeading = $body.find('h3, h2, button, div').filter((_, el) => /promosyon kodu/i.test(el.textContent || '')).first();
      if ($promoHeading.length && $promoHeading.is('button, [role="button"]')) {
        cy.wrap($promoHeading).click({ force: true });
      }
    });
    cy.get('input:not(.personaclick-instant-search)')
      .filter(':visible')
      .then(($inputs) => {
        const $promo = $inputs.filter((_, el) => {
          const ph = (el.getAttribute('placeholder') || '') + (el.getAttribute('name') || '');
          return (
            /promo|kod|indirim|kupon|coupon/i.test(ph) ||
            Boolean(Cypress.$(el).closest('div, form, section').text().match(/promosyon/i))
          );
        });
        const $target = $promo.length ? $promo.first() : $inputs.last();
        cy.wrap($target).clear({ force: true }).type('INVALIDCODE123', { force: true });
      });
    cy.contains(/uygula|kullan|onayla/i).last().scrollIntoView().click({ force: true });
    cy.get('body', { timeout: 15000 }).invoke('text').should('match', /geçersiz|bulunamadı|hatalı|uygulanamadı|tanımsız|kullanılamaz|invalid|uygun değil/i);
  });

  it('TC-8.7 — "DEVAM ET" / Checkout butonunun çalışması', () => {
    resetCartSession();
    addWheyFromPdp();
    openCartPage();
    cy.contains('a, button', /DEVAM ET/i).last().scrollIntoView().click({ force: true });
    cy.location('pathname', { timeout: 20000 }).should('match', /checkout|odeme|ödeme|payment|login|account|verify|siparis|sipariş/i);
  });

  it('TC-8.8 — Birden fazla farklı ürünü sepete ekleme', () => {
    resetCartSession();
    addWheyFromPdp();
    cy.visit('/creatine');
    cy.acceptCookies();
    cy.clickAddToCartPdp();
    cy.contains('button', /SEPETE EKLE/i).last().should('not.be.disabled', { timeout: 20000 });
    openCartPage();
    cy.get('a[href*="/whey-protein"]', { timeout: 25000 }).should('exist');
    cy.get('a[href*="/creatine"]', { timeout: 25000 }).should('exist');
    cy.get('body').invoke('text').should('match', /TOPLAM/i).and('match', /TL/);
  });
});