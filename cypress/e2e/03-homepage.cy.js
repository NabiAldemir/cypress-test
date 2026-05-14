describe('03 - Homepage | Ana Sayfa', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('TC-3.1 — Ana sayfanın başarıyla yüklenmesi', () => {
    // TODO: Status, title ve hero alanını doğrula
  });

  it('TC-3.2 — Logonun görünür ve tıklanabilir olması', () => {
    // TODO: Logoyu bul, görünür mü kontrol et, tıkla, "/" URL'i bekle
  });

  it('TC-3.3 — Header butonları (Giriş Yap, Üye Ol, Arama, Sepet) görünmesi', () => {
    // TODO: Header'da bu 4 öğenin varlığını doğrula
  });

  it('TC-3.4 — Kampanya banner görünmesi', () => {
    // TODO: "20" / "kampanya" benzeri metni bul
  });

  it('TC-3.5 — Kategori menüsünün tüm kategorileri listelemesi', () => {
    // TODO: Lansman, Paketler, Protein, Spor Gıdaları, Vitamin, Sağlık, Gıda, Aksesuar
  });

  it('TC-3.6 — Footer linklerinin görünür ve geçerli href olması', () => {
    // TODO: Footer'a scroll, her link için href.boş.olmamalı
  });

  it('TC-3.7 — Sosyal medya ikonlarının görünmesi', () => {
    // TODO: Facebook / Instagram / WhatsApp linklerini doğrula
  });
});
