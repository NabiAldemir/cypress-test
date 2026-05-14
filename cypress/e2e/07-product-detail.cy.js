describe('07 - Product Detail | Ürün Detay', () => {
  beforeEach(() => {
    cy.visit('/protein');
    // TODO: İlk ürüne tıklayıp detay sayfasına geç
  });

  it('TC-7.1 — Bir ürün detay sayfasının yüklenmesi', () => {
    // TODO: URL ürün slug'ına dönmeli, "Sepete Ekle" buton görünmeli
  });

  it('TC-7.4 — Aroma / varyant seçimi (varsa)', () => {
    // TODO: Varyant butonları varsa birini seç, aktifleştiğini doğrula
  });

  it('TC-7.5 — Miktar arttırma / azaltma butonları', () => {
    // TODO: +/- ile değiştir, miktar input değeri uygun değişmeli
  });

  it('TC-7.6 — "Sepete Ekle" ile ürünü sepete ekleme', () => {
    // TODO: Butona bas, toast/modal bekle, header sepet sayısı 1 olmalı
  });

  it('TC-7.7 — Stokta olmayan ürün davranışı (varsa)', () => {
    // TODO: Stoksuz ürün bulunduysa buton disabled olmalı
    // Atlanabilir: cy.then((win)=>... ile koşullu skip
  });
});
