describe('04 - Navigation | Navigasyon', () => {
  const mainNav = () => cy.get('nav.container-xl');

  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-4.1 — Protein kategorisine geçiş', () => {
    mainNav().find('a[href="/protein"]').click();
    cy.location('pathname').should('eq', '/protein');
  });

  it('TC-4.2 — Vitamin kategorisine geçiş', () => {
    mainNav().find('a[href="/vitamin"]').click();
    cy.location('pathname').should('eq', '/vitamin');
  });

  it('TC-4.3 — Spor Gıdaları kategorisine geçiş', () => {
    mainNav().find('a[href="/spor-gidalari"]').click();
    cy.location('pathname').should('eq', '/spor-gidalari');
  });

  it('TC-4.4 — Tüm ana kategorilerin geçerli URL\'e gitmesi', () => {
    const categories = [
      { url: '/lansman' },
      { url: '/paketler' },
      { url: '/protein' },
      { url: '/spor-gidalari' },
      { url: '/vitamin' },
      { url: '/saglik-1' },
      { url: '/gida' },
      { url: '/aksesuar' },
    ];
    categories.forEach(({ url }) => {
      cy.visit('/');
      mainNav().find(`a[href="${url}"]`).click();
      cy.location('pathname').should('eq', url);
    });
  });

  it('TC-4.5 — Logoya tıklayarak ana sayfaya dönüş', () => {
    cy.visit('/protein');
    cy.get('header a[href="/"]').click();
    cy.location('pathname').should('eq', '/');
  });

  it('TC-4.6 — "Hakkımızda" sayfasına footer üzerinden geçiş', () => {
    cy.get('footer').scrollIntoView();
    cy.get('footer a[href="/pages/hakkimizda"]').click();
    cy.location('pathname').should('eq', '/pages/hakkimizda');
  });

  it('TC-4.7 — "İletişim" sayfasına geçiş', () => {
    cy.get('footer').scrollIntoView();
    cy.get('footer a[href="/pages/iletisim"]').click();
    cy.location('pathname').should('eq', '/pages/iletisim');
  });

  it('TC-4.8 — Browser geri/ileri butonlarının çalışması', () => {
    mainNav().find('a[href="/protein"]').click();
    cy.location('pathname').should('eq', '/protein');
    cy.go('back');
    cy.location('pathname').should('eq', '/');
    cy.go('forward');
    cy.location('pathname').should('eq', '/protein');
  });
});