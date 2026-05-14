describe('08 - Cart | Sepet İşlemleri', () => {
  it('TC-8.1 — Boş sepet ile sepet sayfasının açılması', () => {
    cy.visit('/');
    // TODO: Sepet ikonuna tıkla, "Sepetinizde ürün bulunmamaktadır" bekle
  });

  it('TC-8.2 — Sepete ürün eklendikten sonra sepet sayfasının doğru göstermesi', () => {
    // TODO: /protein → ilk ürün → Sepete Ekle → Sepet sayfası → 1 ürün listede
  });

  it('TC-8.3 — Sepet içinde ürün miktarını arttırma', () => {
    // TODO: Sepette + butonuna bas, adet 2 olmalı, toplam güncellenmeli
  });

  it('TC-8.4 — Sepet içinde ürün miktarını azaltma', () => {
    // TODO: - butonu ile 1'e indir, toplam güncellenmeli
  });

  it('TC-8.5 — Sepetten ürün silme', () => {
    // TODO: Sil/çöp ikonuna tıkla, sepet boş olmalı
  });

  it('TC-8.6 — Geçersiz promosyon kodu girişi', () => {
    // TODO: Promosyon alanına "INVALIDCODE" yaz, Uygula → hata mesajı bekle
  });

  it('TC-8.7 — "DEVAM ET" / Checkout butonunun çalışması', () => {
    // TODO: Sepette ürün varken DEVAM ET'e bas, URL değişmeli (login veya checkout)
  });

  it('TC-8.8 — Birden fazla farklı ürünü sepete ekleme', () => {
    // TODO: 2 farklı ürün ekle, sepette ikisi de görünmeli, toplam = toplam(1+2)
  });
});
