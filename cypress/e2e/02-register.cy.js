describe('02 - Register | Üye Olma', () => {
  beforeEach(() => {
    cy.visit('/account/register');
  });

  it('TC-2.1 — Boş form ile kayıt denemesi', () => {
    // TODO: Hiçbir alan doldurulmadan submit, validasyon mesajı bekle
  });

  it('TC-2.2 — Eksik alanlar ile kayıt (sadece e-posta dolu)', () => {
    // TODO: Sadece email doldur, diğerleri boş, hata bekle
  });

  it('TC-2.3 — Geçersiz e-posta formatı', () => {
    // TODO: "bad-email-format" yaz, hata bekle
  });

  it('TC-2.4 — Zayıf şifre ile kayıt', () => {
    // TODO: Şifre olarak "123" gir, varsa şifre kuralı hatası bekle
  });

  it('TC-2.5 — KVKK / Sözleşme onayı verilmeden kayıt', () => {
    // TODO: Tüm alanları doldur, checkbox işaretleme, uyarı bekle
  });

  it('TC-2.6 — Başarılı kayıt (happy path)', () => {
    // TODO: env.json'daki register* değerleri ile yeni hesap oluştur
    // ⚠ Bu test her run'da env'deki email'i değiştirmeyi gerektirir
  });

  it('TC-2.7 — Mevcut e-posta ile tekrar kayıt denemesi', () => {
    // TODO: TC-2.6'da kullanılan aynı email ile tekrar dene, "zaten kayıtlı" hatası bekle
  });
});
