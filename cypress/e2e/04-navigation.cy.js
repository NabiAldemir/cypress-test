describe('04 - Navigation | Navigasyon', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-4.1 — Protein kategorisine geçiş', () => {
    // TODO: "Protein" linkine tıkla, /protein URL bekle
  });

  it('TC-4.2 — Vitamin kategorisine geçiş', () => {
    // TODO: "Vitamin" linkine tıkla, /vitamin bekle
  });

  it('TC-4.3 — Spor Gıdaları kategorisine geçiş', () => {
    // TODO: /spor-gidalari bekle
  });

  it('TC-4.4 — Tüm ana kategorilerin geçerli URL\'e gitmesi', () => {
    const categories = [
      { name: 'Lansman', url: '/lansman' },
      { name: 'Paketler', url: '/paketler' },
      { name: 'Protein', url: '/protein' },
      { name: 'Spor Gıdaları', url: '/spor-gidalari' },
      { name: 'Vitamin', url: '/vitamin' },
      { name: 'Sağlık', url: '/saglik-1' },
      { name: 'Gıda', url: '/gida' },
      { name: 'Aksesuar', url: '/aksesuar' },
    ];
    // TODO: Her bir kategori için tıkla → URL doğrula → ana sayfaya dön
  });

  it('TC-4.5 — Logoya tıklayarak ana sayfaya dönüş', () => {
    // TODO: Önce /protein'e git, sonra logoya tıkla, "/" bekle
  });

  it('TC-4.6 — "Hakkımızda" sayfasına footer üzerinden geçiş', () => {
    // TODO: Footer scroll → Hakkımızda link → /pages/hakkimizda bekle
  });

  it('TC-4.7 — "İletişim" sayfasına geçiş', () => {
    // TODO: /pages/iletisim bekle
  });

  it('TC-4.8 — Browser geri/ileri butonlarının çalışması', () => {
    // TODO: /protein → cy.go('back') → "/" doğrula
  });
});
