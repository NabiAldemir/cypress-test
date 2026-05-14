describe('05 - Search | Arama', () => {
  const searchInput = () => cy.get('input.personaclick-instant-search').filter(':visible').first();
  const searchButton = () => cy.contains('span', 'ARA').filter(':visible'); // span içindeki ARA metni

  const expectVisibleSepeteEkle = () => {
    cy.get('button', { timeout: 20000 })
      .filter((_, el) => /sepete\s*ekle/i.test((el.textContent || '').trim()))
      .filter(':visible')
      .first()
      .should('be.visible');
  };

  const expectSearchResultsUrl = () => {
    cy.url({ timeout: 20000 }).should((url) => {
      expect(
        url.includes('/search') || /[?&](s|q)=/i.test(url),
        `arama sonuç URL'i: ${url}`,
      ).to.be.true;
    });
  };

  beforeEach(() => {
    cy.visit('/');
    cy.acceptCookies();
    
  });

  it('TC-5.1 — Arama input\'unun görünmesi ve placeholder kontrolü', () => {
    searchInput()
      .should('be.visible')
      .invoke('attr', 'placeholder')
      .then((ph) => {
        // Verdiğin HTML'deki "150+’den fazla üründen ara" placeholder'ını doğrular
        expect((ph || '').toLowerCase()).to.include('150');
      });
  });

  it('TC-5.2 — Pozitif Arama: "Protein tozu" yazınca ilgili ürünler gelmeli', () => {
    searchInput().clear().type('Protein tozu{enter}');

    expectSearchResultsUrl();

    cy.get('li[data-id], .product-item, .product-card', { timeout: 20000 })
      .filter(':visible')
      .should('have.length.at.least', 1);

    cy.get('li[data-id], .product-item, .product-card')
      .filter(':visible')
      .contains(/protein/i)
      .should('be.visible');
  });

  it('TC-5.3 — Autocomplete (Öneri): İlk 3 harfi ("kre") yazınca öneri listesi açılmalı', () => {
    searchInput().clear().type('kre', { delay: 150 });
    
    cy.get('[class*="personaclick"], [class*="instant-search"], [role="listbox"]', { timeout: 15000 })
      .filter(':visible')
      .should('have.length.at.least', 1);
      
    cy.contains(/kreatin|creatine/i, { timeout: 5000 }).should('be.visible');
  });

  it('TC-5.4 — Negatif Arama: Anlamsız karakterlerde ("xyz123") "Sonuç bulunamadı" uyarısı çıkmalı', () => {
    searchInput().clear().type('xyz123{enter}');
    expectSearchResultsUrl();
    
    cy.contains(/Hiç ürün bulunamadı|sonuç bulunamadı|0\s*ürün|ürün bulunamadı/i, { timeout: 20000 })
      .should('be.visible');
  });

  it('TC-5.5 — Boş Arama: Hiçbir şey yazmadan gönderilince sistem stabil kalmalı', () => {
    searchInput().clear();
    searchButton().click();
    
    cy.get('body').should('be.visible');
    cy.get('header, form').should('be.visible');
  });

  it('TC-5.7 — Sonuçtan Detaya: Çıkan sonuçlardan birine tıklayınca Ürün Detay Sayfası\'na (PDP) gitmeli', () => {
    searchInput().clear().type('whey{enter}');
    expectSearchResultsUrl();

    cy.get('li[data-id], .product-item, .product-card', { timeout: 20000 })
      .filter(':visible')
      .find('a[href^="/"]')
      .filter(':visible')
      .first()
      .then(($a) => {
        const href = $a.attr('href');
        expect(href).to.match(/^\//);
        cy.visit(href);
      });

    cy.location('pathname', { timeout: 20000 }).should('not.include', '/search');

    cy.get('body', { timeout: 15000 }).then(($b) => {
      const hasVisibleSepete = $b
        .find('button')
        .toArray()
        .some(
          (el) =>
            /sepete\s*ekle/i.test(el.textContent || '') && Cypress.dom.isVisible(el),
        );

      if (hasVisibleSepete) return;

      cy.get('main li[data-id] a[href^="/"]', { timeout: 15000 })
        .filter(':visible')
        .first()
        .then(($a) => {
          const href = $a.attr('href');
          expect(href).to.match(/^\//);
          cy.visit(href);
        });
    });

    expectVisibleSepeteEkle();
  });
});