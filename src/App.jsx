import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, BookOpen, Globe, Heart, Instagram, Lightbulb, Linkedin, Mail, MessageCircleHeart, Users, Calendar, Tag, ChevronRight, X } from "lucide-react";

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

// ──────────────────────────────────────────────────────────────────
// BLOG YAZILARI
// Yeni yazı eklemek için bu diziye yeni bir obje ekle.
// ──────────────────────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    title: "Gerçekten Dinlemek Ne Demektir?",
    date: "6 Mayıs 2026",
    category: "İletişim",
    excerpt:
      "Birinin söylediklerini duyarken aslında ne kadar orada olduğumuzu soruyorum kendime. Çoğu zaman dinliyor gibi görünürüz; ama zihnimiz çoktan bir sonraki cümleyi kuruyordur.",
    content: `Birinin söylediklerini duyarken aslında ne kadar orada olduğumuzu soruyorum kendime. Çoğu zaman dinliyor gibi görünürüz; ama zihnimiz çoktan bir sonraki cümleyi kuruyordur.

Şiddetsiz İletişim'de "empatiyle dinlemek" dediğimizde kastımız budur: karşıdaki kişinin söylediklerine değil, söylemek istediklerine kulak vermek. Kelimelerinin arkasındaki duyguya, oradan da ihtiyaca ulaşmak.

Bu çok daha zor bir şey. Çünkü bizi alışkındığımız kalıpların dışına çıkarıyor. Cevap vermek yerine oturmayı, çözmek yerine sadece "buradayım" demeyi gerektiriyor.

Ama tam da bu yüzden dönüştürücü.

Gerçekten dinlenildiğinde bir insan ne hisseder? Çoğu zaman söze bile ihtiyaç duymaz. Sadece görülmüş olmanın hafifliği yeter. İşte o an, bağ kurulur.

Dinlemeyi bir beceri olarak öğrenmek mümkün. Ama önce onu bir seçim olarak yapmak gerekiyor.`,
  },
];

const MAILCHIMP_URL = "https://zeynepzumbul.us5.list-manage.com/subscribe/post-json?u=094ac66de559e740d735ea0f8&id=e17b3b6c8d&f_id=009ebeedf0";

function BultenModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setStatus('loading');

    const callbackName = `mc_cb_${Date.now()}`;
    const url = `${MAILCHIMP_URL}&EMAIL=${encodeURIComponent(email)}&c=${callbackName}`;

    window[callbackName] = (data) => {
      delete window[callbackName];
      document.getElementById(callbackName)?.remove();
      if (data.result === 'success') {
        setStatus('success');
      } else {
        setStatus('error');
        setMessage(data.msg?.replace(/<[^>]+>/g, '') ?? 'Bir hata oluştu.');
      }
    };

    const script = document.createElement('script');
    script.id = callbackName;
    script.src = url;
    script.onerror = () => {
      delete window[callbackName];
      script.remove();
      setStatus('error');
      setMessage('Bağlantı hatası. Lütfen tekrar deneyin.');
    };
    document.body.appendChild(script);
  }, [email]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl font-bold text-stone-900">Bültene Abone Ol</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition text-2xl leading-none ml-4"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-stone-500 mb-6">
          Zeynep'in yazılarından haberdar olmak için e-postanı bırak.
        </p>

        {status === 'success' ? (
          <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
            Teşekkürler! Bültene başarıyla abone oldunuz. 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full rounded-full border border-stone-300 px-5 py-3 text-sm outline-none focus:border-stone-500"
            />
            {status === 'error' && (
              <p className="text-sm text-red-600">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-[#1a2744] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#243359] disabled:opacity-60"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const FORMSPREE_URL = "https://formspree.io/f/xjglkqgy";

function IletisimModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(onClose, 3000);
      return () => clearTimeout(t);
    }
  }, [status, onClose]);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error();
      }
    } catch {
      setStatus('error');
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-xl font-bold text-stone-900">İletişime Geç</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 transition text-2xl leading-none ml-4"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-stone-500 mb-6">
          Bir projen, sorun ya da işbirliği fikrin mi var? Mesajını bırak.
        </p>

        {status === 'success' ? (
          <p className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
            Mesajınız iletildi! En kısa sürede dönüş yapacağım. 🙏
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Ad Soyad"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#1a2744]"
            />
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="E-posta"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#1a2744]"
            />
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="Konu"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#1a2744]"
            />
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Mesajınız"
              className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[#1a2744] resize-none"
            />
            {status === 'error' && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-[#1a2744] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#243359] disabled:opacity-60"
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const GALERI_PHOTOS = [
  "/akanresim1.webp",
  "/akanresim2.webp",
  "/akanresim3.webp",
  "/akanresim4.webp",
  "/akanresim5.webp",
  "/akanresim6.webp",
  "/akanresim7.webp",
  "/akanresim8.webp",
];

function GaleriSerit() {
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.all(
      GALERI_PHOTOS.map(src =>
        new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        })
      )
    ).then(() => {
      if (mounted) setImagesReady(true);
    });

    return () => { mounted = false; };
  }, []);

  const photos = [...GALERI_PHOTOS, ...GALERI_PHOTOS];

  return (
    <section className="galeri-wrapper bg-white py-10">
      <div
        className="galeri-track"
        style={{
          animationPlayState: imagesReady ? "running" : "paused",
          opacity: imagesReady ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {photos.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            width="400"
            height="280"
            loading="eager"
            decoding="sync"
            className="galeri-foto"
            style={{ width: "auto", height: "280px", objectFit: "cover" }}
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        ))}
      </div>
    </section>
  );
}

function BlogPostModal({ post, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 py-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white p-8 md:p-12 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="inline-block rounded-full bg-[#d4e8e1] px-3 py-1 text-xs font-medium text-[#1a2744] mb-3">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold text-stone-900 leading-snug">{post.title}</h2>
            <p className="mt-2 text-sm text-stone-400">{post.date}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-stone-500 hover:text-stone-900 transition"
          >
            <X size={18} />
          </button>
        </div>
        <hr className="border-stone-100 mb-8" />
        <div className="space-y-5 text-base leading-8 text-stone-700">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogBolumu() {
  const [activePost, setActivePost] = useState(null);

  return (
    <section id="blog" className="bg-[#f7f4ee] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-[#1a2744] md:text-5xl">
              Blog
            </h2>
            <p className="mt-3 text-base text-stone-500">
              Düşünceler, deneyimler ve notlar.
            </p>
          </div>
        </div>

        {BLOG_POSTS.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-stone-200 py-20 text-center">
            <p className="text-stone-400 text-base">Yakında yazılar burada olacak.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map(post => (
              <article
                key={post.id}
                className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="rounded-full bg-[#d4e8e1] px-3 py-1 text-xs font-medium text-[#1a2744]">
                    {post.category}
                  </span>
                  <span className="text-xs text-stone-400">{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-stone-900 leading-snug mb-3 group-hover:text-[#1a2744] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm leading-7 text-stone-500 flex-1">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-[#1a2744]">
                  <span>Devamını oku</span>
                  <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {activePost && (
        <BlogPostModal post={activePost} onClose={() => setActivePost(null)} />
      )}
    </section>
  );
}

export default function SiddetsizIletisimSitesi() {
  const [showBulten, setShowBulten] = useState(false);
  const [showIletisim, setShowIletisim] = useState(false);

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
              <a href="#blog" className="transition hover:text-stone-900">Blog</a>
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
              <button
                onClick={() => setShowIletisim(true)}
                className="mt-8 inline-block rounded-full bg-[#1a2744] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#243359]"
              >
                Benimle İletişime Geçebilirsin
              </button>
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
                  Ardından Müzikist'te topluluk ve projeler koordinatörü olarak gönüllülük programları, topluluk etkinlikleri ve doğa-inziva kampları üzerine çalıştım. Şiddetsiz İletişim Festivali'nde organizasyon ekibinin bir parçası oldum ve o deneyim, bu yolda olmak istediğimi bir kez daha doğruladı.
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
              <button
                onClick={() => setShowIletisim(true)}
                className="rounded-full border border-stone-400 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
              >
                Benimle İletişime Geçebilirsin
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* KAYAN FOTOĞRAF GALERİSİ */}
      <GaleriSerit />

      {/* BLOG BÖLÜMÜ */}
      <BlogBolumu />

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
              <button
                onClick={() => setShowIletisim(true)}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#78350f] transition hover:bg-white/90"
              >
                Benimle İletişime Geçebilirsin
              </button>
            </div>

            <div className="rounded-[2rem] border-2 border-white/60 px-8 py-10 flex flex-col items-start gap-6">
              <h3 className="text-3xl font-bold text-white leading-tight">Neler mi yazıyorum?</h3>
              <button
                onClick={() => setShowBulten(true)}
                className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#78350f] transition hover:bg-white/90"
              >
                Bültene Katılabilirsin
              </button>
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
              href="mailto:hello@zeynepzumbul.com"
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

      {showBulten && <BultenModal onClose={() => setShowBulten(false)} />}
      {showIletisim && <IletisimModal onClose={() => setShowIletisim(false)} />}
    </div>
  );
}
