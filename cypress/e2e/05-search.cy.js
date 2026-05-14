describe('05 - Search | Arama', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-5.1 — Arama input\'unun görünmesi', () => {
    // TODO: placeholder ile veya class ile input'u bul, visible olmalı
  });

  it('TC-5.2 — Boş arama ile gönderim', () => {
    // TODO: Input boşken ARA butonuna bas, sayfa stabil kalmalı
  });

  it('TC-5.3 — Geçerli ürün adı ile arama ("whey")', () => {
    // TODO: "whey" yaz, Enter veya ARA, sonuçta "whey" geçen en az 1 ürün
  });

  it('TC-5.4 — Anlık arama önerilerinin görünmesi', () => {
    // TODO: "pro" yaz, dropdown/öneri panelini bekle
  });

  it('TC-5.5 — Eşleşmeyen kelime ile arama', () => {
    // TODO: "xyznosuchproduct1234" yaz, "sonuç bulunamadı" bekle
  });

  it('TC-5.6 — Türkçe karakter ile arama ("kreatin")', () => {
    // TODO: "kreatin" yaz, sonuçlarda en az 1 ürün
  });

  it('TC-5.7 — Arama sonucundan ürün detayına gitme', () => {
    // TODO: Bir arama yap, ilk ürüne tıkla, detay sayfası açılmalı
  });
});
