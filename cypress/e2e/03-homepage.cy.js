describe('03 - Homepage | Ana Sayfa', () => {
  const mainNav = () => cy.get('nav.container-xl');

  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-3.1 — Ana sayfanın başarıyla yüklenmesi', () => {
    cy.title().should('match', /proteinocean/i);
    cy.location('pathname').should('eq', '/');
    mainNav().should('be.visible');
  });

  it('TC-3.2 — Logonun görünür ve tıklanabilir olması', () => {
    cy.get('header a[href="/"]')
      .should('be.visible')
      .find('img[alt="proteinocean logo"]')
      .should('be.visible');
    cy.get('header a[href="/"]').click();
    cy.location('pathname').should('eq', '/');
  });

  it('TC-3.3 — Header butonları (Giriş Yap, Üye Ol, Arama, Sepet) görünmesi', () => {
    cy.get('header input.personaclick-instant-search').should('be.visible');
    cy.contains('header button', 'SEPET').should('be.visible');
    cy.get('header').contains('button', 'HESAP').focus();
    cy.get('header a[href="/account/login"]').should('be.visible');
    cy.get('header a[href="/account/register"]').should('be.visible');
  });

  it('TC-3.4 — Kampanya banner görünmesi', () => {
    cy.get('section[role="banner"]')
      .should('be.visible')
      .and('contain.text', '%20');
    cy.get('section[role="banner"]').invoke('text').should('match', /kampanya|indirim/i);
  });

  it('TC-3.5 — Kategori menüsünün tüm kategorileri listelemesi', () => {
    const hrefs = [
      '/lansman',
      '/paketler',
      '/protein',
      '/spor-gidalari',
      '/vitamin',
      '/saglik-1',
      '/gida',
      '/aksesuar',
    ];
    hrefs.forEach((href) => {
      mainNav().find(`a[href="${href}"]`).should('be.visible');
    });
  });

  it('TC-3.6 — Footer linklerinin görünür ve geçerli href olması', () => {
    cy.get('footer').scrollIntoView();
    cy.get('footer a[href]').each(($a) => {
      const href = $a.attr('href');
      expect(href, 'footer anchor href').to.be.a('string').and.match(/\S/);
    });
  });

  it('TC-3.7 — Sosyal medya ikonlarının görünmesi', () => {
    cy.get('footer').scrollIntoView().within(() => {
      cy.get('a[href*="facebook.com/proteinocean"]').should('be.visible');
      cy.get('a[href*="instagram.com/proteinocean"]').should('be.visible');
      cy.get('a[href*="wa.me"]').should('be.visible');
    });
  });
});