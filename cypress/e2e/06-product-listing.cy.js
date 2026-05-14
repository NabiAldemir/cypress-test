describe('06 - Product Listing | Ürün Listeleme (Kategori)', () => {
  beforeEach(() => {
    cy.visit('/protein');
  });

  it('TC-6.1 — Kategori sayfasının yüklenmesi', () => {
    // TODO: URL /protein, "Toplam X ürün" benzeri ifade bekle
  });

  it('TC-6.2 — Ürün kartlarının görünmesi', () => {
    // TODO: En az 1 ürün kartı sayılmalı (.product-card vb. veya jenerik link)
  });

  it('TC-6.3 — Ürün kartında resim, isim ve fiyatın bulunması', () => {
    // TODO: İlk kartta img, başlık metni ve TL/₺ ifadesi
  });

  it('TC-6.4 — Sıralama seçeneklerinin çalışması (varsa)', () => {
    // TODO: Sıralama dropdown'unu bul, "Fiyat: Artan" seç, sıralamayı doğrula
  });

  it('TC-6.5 — Filtreleme seçeneklerinin çalışması (varsa)', () => {
    // TODO: Bir marka/fiyat filtresi uygula, listenin filtreye uyduğunu doğrula
  });

  it('TC-6.6 — Ürün kartına tıklayarak detay sayfasına gitme', () => {
    // TODO: İlk karta tıkla, URL değişmeli, "Sepete Ekle" butonu detay sayfasında olmalı
  });

  it('TC-6.7 — Diğer kategori sayfalarının da düzgün açılması', () => {
    ['/vitamin', '/aksesuar', '/gida'].forEach((url) => {
      // TODO: visit, ürün kartı olduğunu doğrula
    });
  });
});
