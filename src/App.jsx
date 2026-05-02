import { useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Globe, Heart, Instagram, Lightbulb, Linkedin, Mail, MessageCircleHeart, Users } from "lucide-react";

const BUBBLES = [
  { id: 0, label: "Ekip ici diyalog",             r: 70, color: "#f5e6e0" },
  { id: 1, label: "Topluluk kurma",                r: 60, color: "#fef3c7" },
  { id: 2, label: "Programlar",                    r: 52, color: "#d4ede4" },
  { id: 3, label: "Siddetsiz Iletisim Egitimi",    r: 76, color: "#fef3c7" },
  { id: 4, label: "Iliski & Iletisim Atolyeleri",  r: 48, color: "#f5e6e0" },
  { id: 5, label: "Iyi Olus Kamplari",             r: 80, color: "#e8e4f0" },
  { id: 6, label: "Topluluk Sozlesmesi",           r: 68, color: "#e8e4d0" },
  { id: 7, label: "Inziva Programlari",            r: 54, color: "#d4ede4" },
];

const BUBBLE_LABELS = [
  "Ekip içi diyalog",
  "Topluluk kurma",
  "Programlar",
  "Şiddetsiz İletişim Eğitimi",
  "İlişki & İletişim Atölyeleri",
  "İyi Oluş Kampları",
  "Topluluk Sözleşmesi",
  "İnziva Programları",
];

function FloatingBubbles() {
  const containerRef = useRef(null);
  const elRefs = useRef([]);
  const rafRef = useRef(null);
  const physRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // Place bubbles in a rough circle to avoid initial heavy overlap
    const state = BUBBLES.map((b, i) => {
      const angle = (i / BUBBLES.length) * Math.PI * 2;
      const cx = W / 2 + (W * 0.28) * Math.cos(angle);
      const cy = H / 2 + (H * 0.28) * Math.sin(angle);
      return {
        ...b,
        x: Math.max(b.r, Math.min(W - b.r, cx)),
        y: Math.max(b.r, Math.min(H - b.r, cy)),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        phase: Math.random() * Math.PI * 2,
      };
    });
    physRef.current = state;

    // Set initial DOM positions
    state.forEach((b, i) => {
      const el = elRefs.current[i];
      if (el) { el.style.left = `${b.x - b.r}px`; el.style.top = `${b.y - b.r}px`; }
    });

    let t = 0;
    const tick = () => {
      t += 0.012;
      const bs = physRef.current;

      // Gentle floating force + damping
      for (const b of bs) {
        b.vx += Math.sin(t * 0.6 + b.phase) * 0.006;
        b.vy += Math.cos(t * 0.45 + b.phase + 1) * 0.006;
        b.vx *= 0.975;
        b.vy *= 0.975;
        const spd = Math.hypot(b.vx, b.vy);
        if (spd > 0.9) { b.vx = (b.vx / spd) * 0.9; b.vy = (b.vy / spd) * 0.9; }
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.r < 0)   { b.x = b.r;     b.vx =  Math.abs(b.vx) * 0.5; }
        if (b.x + b.r > W)   { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.5; }
        if (b.y - b.r < 0)   { b.y = b.r;     b.vy =  Math.abs(b.vy) * 0.5; }
        if (b.y + b.r > H)   { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.5; }
      }

      // Circle-circle collision — push apart, no overlap
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i], b = bs[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minD = a.r + b.r + 3;
          if (dist < minD && dist > 0.01) {
            const nx = dx / dist, ny = dy / dist;
            const push = (minD - dist) * 0.5;
            a.x -= nx * push; a.y -= ny * push;
            b.x += nx * push; b.y += ny * push;
            const dot = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
            if (dot < 0) {
              const imp = dot * 0.35;
              a.vx += imp * nx; a.vy += imp * ny;
              b.vx -= imp * nx; b.vy -= imp * ny;
            }
          }
        }
      }

      // Update DOM directly — no React re-render
      bs.forEach((b, i) => {
        const el = elRefs.current[i];
        if (el) { el.style.left = `${b.x - b.r}px`; el.style.top = `${b.y - b.r}px`; }
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[480px]">
      {BUBBLES.map((b, i) => (
        <div
          key={b.id}
          ref={el => { elRefs.current[i] = el; }}
          className="absolute flex items-center justify-center rounded-full text-center text-xs font-medium leading-snug text-[#1a2744] cursor-default select-none hover:scale-105 transition-transform duration-200"
          style={{ width: b.r * 2, height: b.r * 2, backgroundColor: b.color, left: 0, top: 0 }}
        >
          <span className="px-3">{BUBBLE_LABELS[b.id]}</span>
        </div>
      ))}
    </div>
  );
}

export default function SiddetsizIletisimSitesi() {
  const services = [
    {
      title: "Derin Bağlantı",
      description:
        "Kendi duygularınızı ve ihtiyaçlarınızı daha net duyabilmeniz, zor konuşmalara daha açıklıkla yaklaşabilmeniz için bire bir alan.",
      icon: Heart,
    },
    {
      title: "Topluluk",
      description:
        "Çiftler, yakın ilişkiler ve aileler için daha güvenli, duyulmuş ve bağ kuran bir iletişim pratiği geliştirmeye yönelik görüşmeler.",
      icon: MessageCircleHeart,
    },
    {
      title: "Kolaylaştırıcılık",
      description:
        "Topluluklar, ekipler ve kurumlar için deneyimsel atölyeler, kolaylaştırıcılık ve birlikte öğrenme alanları.",
      icon: Users,
    },
  ];

  const highlights = [
    "Schiedam, Hollanda merkezli",
    "Çoğunlukla online çalışmalar",
    "Türkçe ve uluslararası topluluklarla çalışma imkânı",
  ];

  const principles = [
    "Yargının ötesine geçerek duymak",
    "Duygu ve ihtiyaç dilini güçlendirmek",
    "Empati ve öz-empati pratiği geliştirmek",
    "Çatışmayı kopuş değil, temas fırsatı olarak ele almak",
  ];

  const steps = [
    {
      title: "Tanışma",
      description: "İhtiyacın, niyetin ve birlikte nasıl çalışılabileceği üzerine kısa bir ilk temas.",
    },
    {
      title: "Derinleşme",
      description: "Tekrarlayan örüntüleri, zor konuşmaları ve ihtiyaçları birlikte görünür kılan süreç.",
    },
    {
      title: "Entegrasyon",
      description: "Günlük hayata taşınabilecek pratikler, ilişkilerde uygulanabilir yeni bir dil ve ritim.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-stone-800 selection:bg-stone-900 selection:text-white">

      {/* NAVBAR */}
      <header className="bg-white px-8 md:px-16 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <p className="text-base font-semibold tracking-tight text-stone-900">Zeynep Zümbül</p>
            <p className="text-xs text-stone-500 mt-0.5">Topluluk Mimarı · Kolaylaştırıcı · Öğrenme Tasarımcısı</p>
          </div>
          <div className="flex items-center gap-7">
            <nav className="hidden md:flex items-center gap-7 text-sm text-stone-600">
              <a href="#hakkinda" className="transition hover:text-stone-900">Hakkımda</a>
              <a href="#hizmetler" className="transition hover:text-stone-900">Çalışma Alanları</a>
              <a href="#iletisim" className="transition hover:text-stone-900">İletişim</a>
            </nav>
            <a
              href="#iletisim"
              className="rounded-full bg-[#1a2744] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#243359]"
            >
              Tanışma Görüşmesi
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#d4e8e1] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* SOL: METİN */}
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1a2744] md:text-5xl">
                Bağ kurmayı, öğrenmeyi ve birlikte dönüşmeyi mümkün kılan deneyimler tasarlıyorum.
              </h1>
              <p className="mt-6 text-base leading-7 text-stone-700">
                Bireyler, ekipler ve topluluklar için güvenli iletişim ve öğrenme alanları açıyorum. İletişimi ve ilişkileri derin, açık ve anlamlı hale getiren süreçler tasarlıyorum.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#iletisim"
                  className="rounded-full bg-[#1a2744] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#243359]"
                >
                  Tanışma Görüşmesi
                </a>
                <a
                  href="#hizmetler"
                  className="rounded-full bg-[#1a2744] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#243359]"
                >
                  Çalışma Alanları
                </a>
              </div>
            </div>

            {/* SAĞ: FOTOĞRAF */}
            <div className="flex justify-center lg:justify-end">
              <div className="overflow-hidden rounded-3xl bg-white shadow-md">
                <img
                  src="/zeynep-zumbul-1.jpeg"
                  alt="Zeynep Zümbül"
                  className="block h-[420px] w-[360px] object-cover object-center md:h-[500px] md:w-[420px]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ÇALIŞMA ALANLARI */}
      <section id="hizmetler" className="bg-[#fef9c3] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <h2 className="text-center text-4xl font-semibold tracking-tight text-[#1a2744] md:text-5xl">
            Çalışma Alanlarım
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4e8e1]">
                <Users className="h-6 w-6 text-[#1a2744]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1a2744]">Topluluk Tasarımı</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Toplulukların bağ kurmasını, katılım göstermesini ve birlikte üretmesini destekleyen süreçler tasarlıyorum.</p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4e8e1]">
                <BookOpen className="h-6 w-6 text-[#1a2744]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1a2744]">Öğrenme Tasarımı</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Deneyimleyerek öğrenmeyi ve kalıcı dönüşümü destekleyen programlar geliştiriyorum.</p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4e8e1]">
                <Lightbulb className="h-6 w-6 text-[#1a2744]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1a2744]">Kolaylaştırıcılık</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Grupların birlikte düşünebildiği, duyulabildiği ve ilerleyebildiği güvenli alanlar açıyorum.</p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4e8e1]">
                <Heart className="h-6 w-6 text-[#1a2744]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#1a2744]">Derin Dinleme</h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">Empati ve ihtiyaçlar odağında, Şiddetsiz İletişim yaklaşımından ilham alan deneyimler tasarlıyorum.</p>
            </div>

          </div>
        </div>
      </section>

      {/* BALONCUK BÖLÜMÜ */}
      <section className="bg-[#f8f8f8] py-20 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* SOL: METİN */}
            <div>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#1a2744] md:text-4xl">
                Şunlardan biriyle mi ilgileniyorsunuz?
              </h2>
              <a
                href="#iletisim"
                className="mt-8 inline-block rounded-full bg-[#1a2744] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#243359]"
              >
                Benimle İletişime Geçebilirsin
              </a>
            </div>

            {/* SAĞ: BALONCUKLAR */}
            <FloatingBubbles />
          </div>
        </div>
      </section>

      <section id="hakkinda" className="bg-[#e8d5c4] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-8 md:px-16">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

            {/* SOL: METİN */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
                Hakkımda
              </h2>
              <div className="mt-8 space-y-5 text-base leading-8 text-stone-700">
                <p>
                  Bağ kurmanın mümkün olduğu alanlar tasarlıyorum.
                  İnsanların kendileriyle ve birbirleriyle açık, güvenli ve anlamlı şekilde buluşabildiği alanlar yaratmak, işimin özü. Atölyeler, programlar ve topluluk deneyimleri aracılığıyla insanların birlikte düşünebildiği, öğrenebildiği ve üretebildiği süreçlerin içinde oluyorum.
                </p>
                <p>
                  İstanbul Üniversitesi İşletme Fakültesi'nde davranış bilimleri ve örgütsel davranışla tanışınca asıl merakım netleşti: İnsanlar bir arada nasıl var olur? Bir yapıyı gerçekten ayakta tutan nedir? Zamanla fark ettim ki bu sorular beni hep aynı yere götürüyor: İnsanlar arasındaki bağın nasıl kurulduğuna.
                </p>
                <p>
                  2018'de bu soruları pratiğe dökmek için yaratıcı topluluk odaklı inovasyon platformu olan Nexlab'i kurdum. Birlikte öğrenme ve üretme süreçleri kurguladım, girişimlere Şiddetsiz İletişimden ilhamla iletişim eğitimleri verdim. Nexlab, bugün yaptığım işin temellerini attığım yerdi.
                </p>
                <p>
                  Ardından Müzikist'te topluluk ve projeler koordinatörü olarak gönüllük programları, topluluk etkinlikleri ve doğa-inziva kampları üzerine çalıştım. Şiddetsiz İletişim Festivali'nde organizasyon ekibinin bir parçası oldum ve o deneyim, bu yolda olmak istediğimi bir kez daha doğruladı.
                </p>
                <p>
                  Bugün kolaylaştırıcılık, topluluk tasarımı, öğrenme tasarımı ve derin dinleme alanlarında çalışıyorum. Odağım hep aynı: iletişimi açık, ilişkileri derin, toplulukları canlı kılmak.
                </p>
              </div>
            </div>

            {/* SAĞ: FOTOĞRAF + BUTON */}
            <div className="flex flex-col items-center gap-6">
              <img
                src="/3e9998c5-1022-4910-8f64-1db2b57bbcb1.png"
                alt="Zeynep Zümbül"
                className="w-full max-w-sm object-cover"
              />
              <a
                href="#iletisim"
                className="rounded-full border border-stone-400 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
              >
                Benimle İletişime Geçebilirsin
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* KAYAN FOTOĞRAF GALERİSİ */}
      <section className="bg-white py-10 overflow-hidden">
        <div className="marquee-track">
          {[
            "/akanresim1.JPG",
            "/akanresim2.jpeg",
            "/akanresim3.JPG",
            "/akanresim4.JPG",
            "/akanresim5.jpeg",
            "/akanresim7.jpeg",
            "/akanresim8.jpeg",
            "/akanresim1.JPG",
            "/akanresim2.jpeg",
            "/akanresim3.JPG",
            "/akanresim4.JPG",
            "/akanresim5.jpeg",
            "/akanresim7.jpeg",
            "/akanresim8.jpeg",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              loading="eager"
              className="galeri-foto h-[280px] w-auto rounded-xl object-cover flex-shrink-0"
              style={{ marginRight: 16 }}
            />
          ))}
        </div>
      </section>

      {/* CTA BÖLÜMÜ */}
      <section className="bg-[#78350f] py-20 md:py-28 px-8 md:px-16">
        <div className="mx-auto max-w-4xl">

          {/* Alıntı */}
          <p className="text-center text-xl italic leading-relaxed text-white md:text-2xl">
            &ldquo;İnsanların kendileriyle ve birbirleriyle bağ kurmasını kolaylaştıran deneyimler tasarlayalım.&rdquo;
          </p>

          {/* İki kart */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">

            <div className="rounded-[2rem] border-2 border-white/60 px-8 py-10 flex flex-col items-start gap-6">
              <h3 className="text-3xl font-bold text-white leading-tight">Bir projen mi var?</h3>
              <a
                href="#iletisim"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#78350f] transition hover:bg-white/90"
              >
                Benimle İletişime Geçebilirsin
              </a>
            </div>

            <div className="rounded-[2rem] border-2 border-white/60 px-8 py-10 flex flex-col items-start gap-6">
              <h3 className="text-3xl font-bold text-white leading-tight">Neler mi yazıyorum?</h3>
              <a
                href="#bulten"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#78350f] transition hover:bg-white/90"
              >
                Bültene Katılabilirsin
              </a>
            </div>

          </div>
        </div>
      </section>

      <footer id="iletisim" className="bg-white px-8 md:px-16 py-16 md:py-20">
        <div className="mx-auto max-w-xl flex flex-col items-center gap-8">

          {/* İsim */}
          <p className="text-2xl font-bold tracking-tight text-stone-900">Zeynep Zümbül</p>

          {/* Sosyal medya ikonları */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/zeynep-zümbül"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 text-stone-900 transition hover:opacity-50"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.instagram.com/zeynepzumbl"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 text-stone-900 transition hover:opacity-50"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:zeynepzumbul@gmail.com"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 text-stone-900 transition hover:opacity-50"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Ayraç */}
          <hr className="w-full border-stone-200" />

          {/* Copyright */}
          <p className="text-sm text-stone-400">2026 &copy; Zeynep Zümbül</p>

        </div>
      </footer>
    </div>
  );
}
