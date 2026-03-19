import { ArrowRight, Globe, Heart, MessageCircleHeart, Sparkles, Users } from "lucide-react";

export default function SiddetsizIletisimSitesi() {
  const services = [
    {
      title: "Bireysel Seanslar",
      description:
        "Kendi duygularınızı ve ihtiyaçlarınızı daha net duyabilmeniz, zor konuşmalara daha açıklıkla yaklaşabilmeniz için bire bir alan.",
      icon: Heart,
    },
    {
      title: "İlişki ve Yakınlık Alanları",
      description:
        "Çiftler, yakın ilişkiler ve aileler için daha güvenli, duyulmuş ve bağ kuran bir iletişim pratiği geliştirmeye yönelik görüşmeler.",
      icon: MessageCircleHeart,
    },
    {
      title: "Atölyeler & Topluluk Buluşmaları",
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(247,244,238,0.75),_rgba(232,240,233,0.85))]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <header className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">Zeynep</p>
            <p className="text-sm text-stone-500">Topluluk Mimarı · Kolaylaştırıcı · Öğrenme Tasarımcısı</p>
          </div>
          <a
            href="#iletisim"
            className="hidden rounded-full border border-stone-300/80 bg-white/80 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur md:inline-flex"
          >
            Tanışma Görüşmesi
          </a>
        </header>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 md:pb-28 md:pt-10">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/80 px-4 py-2 text-sm text-stone-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Schiedam, Hollanda merkezli • çoğunlukla online
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                Daha şefkatli, net ve bağ kuran ilişkiler için bir alan
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 md:text-xl">
                Zeynep; bireyler, ilişkiler ve topluluklarla şiddetsiz iletişim temelli çalışmalar yürütür. Amaç yalnızca daha iyi konuşmak değil, daha derin duymak, daha sahici temas kurmak ve çatışmaları dönüştürücü bir alana çevirebilmektir.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#iletisim"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3.5 text-sm font-medium text-white shadow-xl shadow-stone-300/30 transition hover:-translate-y-0.5"
                >
                  İletişime Geç
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#hizmetler"
                  className="inline-flex items-center rounded-full border border-stone-300 bg-white/90 px-6 py-3.5 text-sm font-medium shadow-sm backdrop-blur transition hover:-translate-y-0.5"
                >
                  Çalışma Alanları
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/70 bg-white/70 px-4 py-4 text-sm text-stone-600 shadow-sm backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="rounded-[2rem] border border-white/70 bg-white/80 p-4 shadow-2xl shadow-stone-300/20 backdrop-blur md:p-6">
                <div className="rounded-[1.6rem] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 p-8 text-white md:p-10">
                  <p className="text-sm uppercase tracking-[0.24em] text-stone-300">Yaklaşım</p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                    Empati, açıklık ve ihtiyaç temelli temas
                  </h2>
                  <p className="mt-5 text-base leading-7 text-stone-300">
                    Her görüşmede merkezde performans değil insanlık vardır: duygu, ihtiyaç, sınır, rica ve ilişki kalitesi.
                  </p>

                  <div className="mt-8 space-y-3">
                    {principles.map((item) => (
                      <div key={item} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-stone-100 backdrop-blur">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-10">
        <div className="grid gap-4 rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm md:grid-cols-3 md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Kimin için</p>
            <p className="mt-3 text-xl font-semibold">Bireyler, ilişkiler, ekipler ve topluluklar</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Format</p>
            <p className="mt-3 text-xl font-semibold">Online odaklı seanslar, atölyeler ve kolaylaştırıcılık</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-stone-500">Niyet</p>
            <p className="mt-3 text-xl font-semibold">Kopuş yerine temas, savunma yerine açıklık</p>
          </div>
        </div>
      </section>

      <section id="hakkinda" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">Zeynep hakkında</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              İletişimi sadece bir teknik değil, ilişki kurma pratiği olarak ele alır
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-stone-600">
            <p>
              Şiddetsiz İletişim, nasıl daha “doğru” konuşacağımızdan çok, birbirimizi nasıl daha derinden duyabileceğimizle ilgilenir. Zeynep bu yaklaşımı; bireysel dönüşüm, topluluk inşası ve güvenli öğrenme alanlarıyla bir araya getirir.
            </p>
            <p>
              Kurduğu süreçlerde amaç, insanları tek bir doğruya taşımak değil; duyguları, ihtiyaçları ve sınırları görünür kılarak daha dürüst, yumuşak ve canlı ilişkiler kurabilmektir.
            </p>
          </div>
        </div>
      </section>

      <section id="hizmetler" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">Çalışma alanları</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">Birlikte çalışmanın yolları</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-stone-600">
              İhtiyaca göre bire bir süreçler, ilişki odaklı görüşmeler, atölyeler veya topluluk temelli kolaylaştırıcılık sunulabilir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-[2rem] border border-stone-200 bg-[#fcfbf8] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/70"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-4 leading-7 text-stone-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-10 rounded-[2rem] border border-stone-200 bg-[#eef2ea] p-8 md:grid-cols-[0.95fr_1.05fr] md:p-12">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">Süreç nasıl ilerler</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Yavaşlamak, duymak ve yeni bir dil kurmak için tasarlanmış bir akış
            </h2>
          </div>
          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[1.5rem] bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-stone-500">0{index + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-7 text-stone-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="rounded-[2rem] border border-stone-200 bg-[#fcfbf8] px-8 py-12 shadow-sm md:px-14 md:py-16">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-stone-500">Topluluk odağı</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Sadece bireysel dönüşüm değil, birlikte yaşama kültürü
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-600">
              Zeynep’in çalışmaları, bireysel farkındalığın ötesinde; birlikte öğrenme, dinleme kültürü oluşturma ve daha canlı topluluklar kurma niyetini taşır.
            </p>
          </div>
        </div>
      </section>

      <section id="iletisim" className="px-6 pb-20 pt-8 md:pb-28">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] bg-stone-900 px-8 py-12 text-white shadow-2xl shadow-stone-300/30 md:px-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-stone-400">İletişim</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Tanışma görüşmesi veya iş birliği için ulaşın
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
                Bireysel çalışmalar, atölyeler, topluluk buluşmaları ya da kurum içi kolaylaştırıcılık için iletişime geçebilirsiniz.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <a
                href="mailto:merhaba@ornek.com"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 shadow-lg"
              >
                merhaba@ornek.com
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/90"
              >
                <Globe className="h-4 w-4" />
                Instagram / Topluluk Bağlantısı
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
