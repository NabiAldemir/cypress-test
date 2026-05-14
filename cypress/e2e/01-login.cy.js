describe('01 - Login | Giriş Yapma', () => {
  beforeEach(() => {
    cy.visit('/account/login');
  });

  it('TC-1.1 — Boş form ile giriş denemesi', () => {
    // TODO: Form submit edilecek, validasyon mesajı veya URL kontrolü yapılacak
  });

  it('TC-1.2 — Geçersiz e-posta formatı ile giriş', () => {
    // TODO: "notanemail" yaz, şifre doldur, submit et, hata bekle
  });

  it('TC-1.3 — Hatalı e-posta / hatalı şifre ile giriş', () => {
    // TODO: invalidEmail + invalidPassword ile giriş dene, hata bekle
  });

  it('TC-1.4 — Doğru e-posta / hatalı şifre ile giriş', () => {
    // TODO: loginEmail + invalidPassword ile giriş dene, hata bekle
  });

  it('TC-1.5 — Geçerli kimlik bilgileri ile başarılı giriş', () => {
    // TODO: loginEmail + loginPassword ile giriş yap, başarılı yönlendirme bekle
  });

  it('TC-1.6 — "Şifremi Unuttum" linkinin çalışması', () => {
    // TODO: Linke tıkla, şifre sıfırlama sayfası açılmalı
  });

  it('TC-1.7 — "Üye Ol" linkine geçiş', () => {
    // TODO: Tab/linke tıkla, /account/register URL'i bekle
  });
});
