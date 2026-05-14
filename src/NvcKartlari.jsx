import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, Instagram, Mail } from "lucide-react";

const LANGS = [
  { code: "tr", label: "Türkçe",  rtl: false, cjk: false },
  { code: "en", label: "English", rtl: false, cjk: false },
  { code: "de", label: "Deutsch", rtl: false, cjk: false },
  { code: "fr", label: "Français",rtl: false, cjk: false },
  { code: "es", label: "Español", rtl: false, cjk: false },
  { code: "ar", label: "العربية", rtl: true,  cjk: false },
  { code: "ja", label: "日本語",   rtl: false, cjk: true  },
  { code: "zh", label: "中文",     rtl: false, cjk: true  },
];

const UI = {
  tr: { eyebrow: "Marshall Rosenberg · NVC", t1: "İhtiyaç", t2: "Kartları", sub: "Her insan eyleminin altında evrensel bir ihtiyaç yatar. Kartı çevir, ihtiyacını tanı.", btn: "Kart Çek", hist: "Son çekilen kartlar", foot: "Şiddetsiz İletişim (NVC) — Marshall B. Rosenberg\nİhtiyaçlar ne iyi ne kötüdür; sadece insanîdir.", all: "Tümü", idle: "Kartı Çevir", idleSub: "Butona basarak rastgele bir ihtiyaç kartı çek." },
  en: { eyebrow: "Marshall Rosenberg · NVC", t1: "Needs", t2: "Cards", sub: "Behind every human action lies a universal need. Draw a card and discover yours.", btn: "Draw Card", hist: "Recently drawn", foot: "Nonviolent Communication (NVC) — Marshall B. Rosenberg\nNeeds are neither good nor bad; they are simply human.", all: "All", idle: "Draw a Card", idleSub: "Press the button below to draw a random needs card." },
  de: { eyebrow: "Marshall Rosenberg · GfK", t1: "Bedürfnis", t2: "Karten", sub: "Hinter jeder menschlichen Handlung liegt ein universelles Bedürfnis. Zieh eine Karte.", btn: "Karte ziehen", hist: "Zuletzt gezogen", foot: "Gewaltfreie Kommunikation (GfK) — Marshall B. Rosenberg\nBedürfnisse sind weder gut noch schlecht; sie sind menschlich.", all: "Alle", idle: "Karte ziehen", idleSub: "Drücke die Taste, um eine zufällige Bedürfniskarte zu ziehen." },
  fr: { eyebrow: "Marshall Rosenberg · CNV", t1: "Cartes des", t2: "Besoins", sub: "Derrière chaque acte humain se cache un besoin universel. Tirez une carte.", btn: "Tirer une carte", hist: "Cartes récentes", foot: "Communication NonViolente (CNV) — Marshall B. Rosenberg\nLes besoins ne sont ni bons ni mauvais ; ils sont humains.", all: "Tous", idle: "Tirer une carte", idleSub: "Appuyez sur le bouton pour tirer une carte de besoin au hasard." },
  es: { eyebrow: "Marshall Rosenberg · CNV", t1: "Cartas de", t2: "Necesidades", sub: "Detrás de cada acción humana hay una necesidad universal. Saca una carta.", btn: "Sacar carta", hist: "Cartas recientes", foot: "Comunicación NoViolenta (CNV) — Marshall B. Rosenberg\nLas necesidades no son buenas ni malas; simplemente son humanas.", all: "Todas", idle: "Sacar una carta", idleSub: "Presiona el botón para sacar una carta de necesidad al azar." },
  ar: { eyebrow: "مارشال روزنبرغ · التواصل اللاعنيف", t1: "بطاقات", t2: "الاحتياجات", sub: "وراء كل فعل بشري حاجة إنسانية عالمية. اسحب بطاقة واكتشف احتياجك.", btn: "اسحب بطاقة", hist: "البطاقات الأخيرة", foot: "التواصل اللاعنيف — مارشال ب. روزنبرغ\nالاحتياجات ليست جيدة ولا سيئة؛ هي إنسانية فحسب.", all: "الكل", idle: "اسحب بطاقة", idleSub: "اضغط على الزر أدناه لسحب بطاقة احتياج عشوائية." },
  ja: { eyebrow: "マーシャル・ローゼンバーグ · NVC", t1: "ニーズ", t2: "カード", sub: "すべての行動の背後には普遍的なニーズがあります。カードを引いて気づきを得よう。", btn: "カードを引く", hist: "最近のカード", foot: "非暴力コミュニケーション（NVC）— マーシャル・B・ローゼンバーグ\nニーズは良くも悪くもない、ただ人間的なものです。", all: "すべて", idle: "カードを引く", idleSub: "ボタンを押してランダムにカードを引きましょう。" },
  zh: { eyebrow: "马歇尔·卢森堡 · NVC", t1: "需求", t2: "卡片", sub: "每一个人类行为背后都有一个普遍的需求。抽一张卡片，认识自己的需求。", btn: "抽卡", hist: "最近抽到的", foot: "非暴力沟通（NVC）— 马歇尔·B·卢森堡\n需求无好坏之分，它们只是人类本能。", all: "全部", idle: "抽一张卡", idleSub: "点击下方按钮随机抽取一张需求卡片。" },
};

const C = [
  // VAROLUŞ
  { g: "🌾", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Beslenme", en: "Nourishment", de: "Nahrung", fr: "Nourriture", es: "Nutrición", ar: "التغذية", ja: "栄養", zh: "营养" }, sub: { tr: "Yiyecek, su, bedenin temel ihtiyaçları", en: "Food, water, basic physical needs", de: "Nahrung, Wasser, körperliche Grundbedürfnisse", fr: "Nourriture, eau, besoins physiques fondamentaux", es: "Comida, agua, necesidades físicas básicas", ar: "الطعام والماء والاحتياجات الأساسية", ja: "食べ物、水、基本的なニーズ", zh: "食物、水、基本需求" } },
  { g: "🏡", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Barınak", en: "Shelter", de: "Unterkunft", fr: "Abri", es: "Refugio", ar: "المأوى", ja: "住まい", zh: "庇护" }, sub: { tr: "Güvenli, korunaklı bir alan, ev hissi", en: "A safe, protective space, sense of home", de: "Ein sicherer Ort, Heimgefühl", fr: "Un espace sûr, sentiment de chez soi", es: "Un espacio seguro, sensación de hogar", ar: "مكان آمن، شعور بالوطن", ja: "安全な空間、家の感覚", zh: "安全空间，家的感觉" } },
  { g: "🌙", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Dinlenme", en: "Rest", de: "Ruhe", fr: "Repos", es: "Descanso", ar: "الراحة", ja: "休息", zh: "休息" }, sub: { tr: "Uyku, yenilenme, bedensel toparlanma", en: "Sleep, renewal, physical recovery", de: "Schlaf, Erholung, Regeneration", fr: "Sommeil, renouveau, récupération", es: "Sueño, renovación, recuperación", ar: "النوم والتجديد والتعافي", ja: "睡眠、回復、再生", zh: "睡眠、更新、恢复" } },
  { g: "🌀", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Hareket", en: "Movement", de: "Bewegung", fr: "Mouvement", es: "Movimiento", ar: "الحركة", ja: "運動", zh: "运动" }, sub: { tr: "Beden özgürlüğü, egzersiz, dans", en: "Physical freedom, exercise, dance", de: "Körperfreiheit, Bewegung, Tanz", fr: "Liberté physique, exercice, danse", es: "Libertad física, ejercicio, baile", ar: "الحرية الجسدية، التمرين، الرقص", ja: "体の自由、運動、ダンス", zh: "身体自由、运动、舞蹈" } },
  { g: "🤲", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Dokunuş", en: "Touch", de: "Berührung", fr: "Contact", es: "Contacto", ar: "اللمس", ja: "触れ合い", zh: "触碰" }, sub: { tr: "Fiziksel temas, şefkatli bir el", en: "Physical contact, a gentle hand", de: "Körperkontakt, sanfte Berührung", fr: "Contact physique, une main douce", es: "Contacto físico, una mano cariñosa", ar: "التواصل الجسدي، لمسة لطيفة", ja: "身体的接触、優しい手", zh: "身体接触，温柔触碰" } },
  { g: "🛡️", c: "#9b7f5e", cat: { tr: "Varoluş", en: "Existence", de: "Existenz", fr: "Existence", es: "Existencia", ar: "الوجود", ja: "生存", zh: "存在" }, name: { tr: "Güvenlik", en: "Safety", de: "Sicherheit", fr: "Sécurité", es: "Seguridad", ar: "الأمان", ja: "安全", zh: "安全" }, sub: { tr: "Tehlikeden korunma, fiziksel bütünlük", en: "Protection from danger, physical integrity", de: "Schutz vor Gefahr, körperliche Unversehrtheit", fr: "Protection du danger, intégrité physique", es: "Protección del peligro, integridad física", ar: "الحماية من الخطر، السلامة الجسدية", ja: "危険からの保護、身体的安全", zh: "免受危险，身体完整" } },
  // BAĞLANTI
  { g: "♡", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Sevgi", en: "Love", de: "Liebe", fr: "Amour", es: "Amor", ar: "الحب", ja: "愛", zh: "爱" }, sub: { tr: "Koşulsuz kabul, sıcaklık, bağlılık", en: "Unconditional acceptance, warmth, belonging", de: "Bedingungslose Akzeptanz, Wärme, Zugehörigkeit", fr: "Acceptation inconditionnelle, chaleur, appartenance", es: "Aceptación incondicional, calidez, pertenencia", ar: "القبول غير المشروط، الدفء، الانتماء", ja: "無条件の受容、温かさ、絆", zh: "无条件接受，温暖，归属" } },
  { g: "🌿", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Aidiyet", en: "Belonging", de: "Zugehörigkeit", fr: "Appartenance", es: "Pertenencia", ar: "الانتماء", ja: "帰属感", zh: "归属感" }, sub: { tr: "Bir yere, bir topluluğa dahil olmak", en: "Being part of a place or community", de: "Teil einer Gemeinschaft sein", fr: "Faire partie d'une communauté", es: "Ser parte de una comunidad", ar: "الانتماء إلى مجتمع", ja: "コミュニティの一員であること", zh: "成为社区的一部分" } },
  { g: "◎", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Empati", en: "Empathy", de: "Empathie", fr: "Empathie", es: "Empatía", ar: "التعاطف", ja: "共感", zh: "同理心" }, sub: { tr: "Gerçekten anlaşıldığını hissetmek", en: "Feeling truly understood", de: "Wirklich verstanden werden", fr: "Se sentir vraiment compris", es: "Sentirse verdaderamente comprendido", ar: "الشعور بأنك مفهوم حقاً", ja: "本当に理解されること", zh: "感到真正被理解" } },
  { g: "🕊️", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Yakınlık", en: "Intimacy", de: "Intimität", fr: "Intimité", es: "Intimidad", ar: "الحميمية", ja: "親密さ", zh: "亲密" }, sub: { tr: "Duygusal derinlik, içtenlik, açıklık", en: "Emotional depth, sincerity, openness", de: "Emotionale Tiefe, Aufrichtigkeit, Offenheit", fr: "Profondeur émotionnelle, sincérité, ouverture", es: "Profundidad emocional, sinceridad, apertura", ar: "العمق العاطفي والصدق والانفتاح", ja: "感情の深さ、誠実さ、開放性", zh: "情感深度、真诚、开放" } },
  { g: "✦", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Görülmek", en: "Being Seen", de: "Gesehen werden", fr: "Être vu", es: "Ser visto", ar: "أن تُرى", ja: "見てもらうこと", zh: "被看见" }, sub: { tr: "Varlığının fark edilmesi, tanınma", en: "Having your presence noticed and recognized", de: "Wahrgenommen und anerkannt werden", fr: "Être remarqué et reconnu", es: "Que tu presencia sea notada", ar: "ملاحظة وجودك والاعتراف به", ja: "存在に気づかれ認められること", zh: "你的存在被注意和认可" } },
  { g: "◈", c: "#8b5e5e", cat: { tr: "Bağlantı", en: "Connection", de: "Verbindung", fr: "Connexion", es: "Conexión", ar: "التواصل", ja: "つながり", zh: "连接" }, name: { tr: "Katkı", en: "Contribution", de: "Beitrag", fr: "Contribution", es: "Contribución", ar: "المساهمة", ja: "貢献", zh: "贡献" }, sub: { tr: "Başkasının hayatına değer katmak", en: "Adding value to another's life", de: "Zum Leben anderer beitragen", fr: "Apporter de la valeur à la vie des autres", es: "Añadir valor a la vida de los demás", ar: "إضافة قيمة لحياة الآخرين", ja: "他者の人生に価値をもたらすこと", zh: "为他人的生活增添价值" } },
  // ÖZERKLİK
  { g: "🌬️", c: "#5c7a6b", cat: { tr: "Özerklik", en: "Autonomy", de: "Autonomie", fr: "Autonomie", es: "Autonomía", ar: "الاستقلالية", ja: "自律", zh: "自主" }, name: { tr: "Özgürlük", en: "Freedom", de: "Freiheit", fr: "Liberté", es: "Libertad", ar: "الحرية", ja: "自由", zh: "自由" }, sub: { tr: "Kendi kararlarını verme hakkı", en: "The right to make your own choices", de: "Das Recht, eigene Entscheidungen zu treffen", fr: "Le droit de faire ses propres choix", es: "El derecho a tomar tus propias decisiones", ar: "الحق في اتخاذ قراراتك الخاصة", ja: "自分の選択をする権利", zh: "做出自己选择的权利" } },
  { g: "✧", c: "#5c7a6b", cat: { tr: "Özerklik", en: "Autonomy", de: "Autonomie", fr: "Autonomie", es: "Autonomía", ar: "الاستقلالية", ja: "自律", zh: "自主" }, name: { tr: "Seçim", en: "Choice", de: "Wahl", fr: "Choix", es: "Elección", ar: "الاختيار", ja: "選択", zh: "选择" }, sub: { tr: "Alternatiflere sahip olmak, seçebilmek", en: "Having alternatives, being able to choose", de: "Alternativen haben, wählen können", fr: "Avoir des alternatives, pouvoir choisir", es: "Tener alternativas, poder elegir", ar: "امتلاك البدائل، القدرة على الاختيار", ja: "選択肢を持ち、選べること", zh: "拥有选择，能够决定" } },
  { g: "◇", c: "#5c7a6b", cat: { tr: "Özerklik", en: "Autonomy", de: "Autonomie", fr: "Autonomie", es: "Autonomía", ar: "الاستقلالية", ja: "自律", zh: "自主" }, name: { tr: "Özgünlük", en: "Authenticity", de: "Authentizität", fr: "Authenticité", es: "Autenticidad", ar: "الأصالة", ja: "真正性", zh: "真实性" }, sub: { tr: "Gerçek benliğini ifade edebilmek", en: "Expressing your true self", de: "Das wahre Selbst ausdrücken", fr: "Exprimer son vrai moi", es: "Expresar tu verdadero yo", ar: "التعبير عن ذاتك الحقيقية", ja: "本当の自分を表現すること", zh: "表达真实自我" } },
  { g: "✺", c: "#5c7a6b", cat: { tr: "Özerklik", en: "Autonomy", de: "Autonomie", fr: "Autonomie", es: "Autonomía", ar: "الاستقلالية", ja: "自律", zh: "自主" }, name: { tr: "Yaratıcılık", en: "Creativity", de: "Kreativität", fr: "Créativité", es: "Creatividad", ar: "الإبداع", ja: "創造性", zh: "创造力" }, sub: { tr: "Hayal kurma, icat etme, yaratma özgürlüğü", en: "Freedom to dream, invent, and create", de: "Freiheit zu träumen und zu schaffen", fr: "Liberté de rêver et de créer", es: "Libertad para soñar y crear", ar: "حرية الحلم والإبداع", ja: "夢見て、創造する自由", zh: "梦想、创造的自由" } },
  { g: "🌙", c: "#5c7a6b", cat: { tr: "Özerklik", en: "Autonomy", de: "Autonomie", fr: "Autonomie", es: "Autonomía", ar: "الاستقلالية", ja: "自律", zh: "自主" }, name: { tr: "Mahremiyet", en: "Privacy", de: "Privatsphäre", fr: "Intimité", es: "Privacidad", ar: "الخصوصية", ja: "プライバシー", zh: "隐私" }, sub: { tr: "Kendi alanın, yalnız kalabilme hakkı", en: "Your own space, the right to be alone", de: "Eigener Raum, das Recht auf Einsamkeit", fr: "Son propre espace, le droit d'être seul", es: "Tu propio espacio, el derecho a estar solo", ar: "مساحتك الخاصة، الحق في العزلة", ja: "自分の空間、一人でいる権利", zh: "自己的空间，独处的权利" } },
  // ANLAM
  { g: "☀", c: "#6b6b99", cat: { tr: "Anlam", en: "Meaning", de: "Sinn", fr: "Sens", es: "Significado", ar: "المعنى", ja: "意味", zh: "意义" }, name: { tr: "Amaç", en: "Purpose", de: "Zweck", fr: "But", es: "Propósito", ar: "الهدف", ja: "目的", zh: "目的" }, sub: { tr: "Hayatının bir anlamı ve yönü olması", en: "Having meaning and direction in life", de: "Sinn und Richtung im Leben haben", fr: "Avoir un sens et une direction dans la vie", es: "Tener significado y dirección en la vida", ar: "امتلاك معنى واتجاه في الحياة", ja: "人生に意味と方向性を持つこと", zh: "生活有意义和方向" } },
  { g: "🌱", c: "#6b6b99", cat: { tr: "Anlam", en: "Meaning", de: "Sinn", fr: "Sens", es: "Significado", ar: "المعنى", ja: "意味", zh: "意义" }, name: { tr: "Büyüme", en: "Growth", de: "Wachstum", fr: "Croissance", es: "Crecimiento", ar: "النمو", ja: "成長", zh: "成长" }, sub: { tr: "Öğrenmek, gelişmek, dönüşmek", en: "Learning, developing, transforming", de: "Lernen, entwickeln, transformieren", fr: "Apprendre, se développer, se transformer", es: "Aprender, desarrollarse, transformarse", ar: "التعلم والتطور والتحول", ja: "学び、成長し、変革すること", zh: "学习、发展、转化" } },
  { g: "○", c: "#6b6b99", cat: { tr: "Anlam", en: "Meaning", de: "Sinn", fr: "Sens", es: "Significado", ar: "المعنى", ja: "意味", zh: "意义" }, name: { tr: "Farkındalık", en: "Awareness", de: "Bewusstsein", fr: "Conscience", es: "Conciencia", ar: "الوعي", ja: "気づき", zh: "觉知" }, sub: { tr: "Şimdiki anda var olmak, uyanık kalmak", en: "Being present, staying awake to the moment", de: "Im Moment präsent sein, wach bleiben", fr: "Être présent, éveillé à l'instant", es: "Estar presente, despierto al momento", ar: "الحضور في اللحظة، البقاء يقظاً", ja: "今この瞬間に存在し、目覚めていること", zh: "活在当下，保持清醒" } },
  { g: "✦", c: "#6b6b99", cat: { tr: "Anlam", en: "Meaning", de: "Sinn", fr: "Sens", es: "Significado", ar: "المعنى", ja: "意味", zh: "意义" }, name: { tr: "Onur", en: "Dignity", de: "Würde", fr: "Dignité", es: "Dignidad", ar: "الكرامة", ja: "尊厳", zh: "尊严" }, sub: { tr: "Kendine ve emeğine saygı görmek", en: "Being respected for who you are and what you do", de: "Für das, was man ist und tut, respektiert werden", fr: "Être respecté pour ce que l'on est", es: "Ser respetado por quien eres", ar: "أن تُحترم لما أنت عليه", ja: "自分の存在と行為が尊重されること", zh: "因你是谁和你做什么而受到尊重" } },
  // OYUN
  { g: "☼", c: "#8b7342", cat: { tr: "Oyun", en: "Play", de: "Spiel", fr: "Jeu", es: "Juego", ar: "اللعب", ja: "遊び", zh: "玩耍" }, name: { tr: "Neşe", en: "Joy", de: "Freude", fr: "Joie", es: "Alegría", ar: "الفرح", ja: "喜び", zh: "喜悦" }, sub: { tr: "Hafiflik, kahkaha, sevinç anları", en: "Lightness, laughter, moments of happiness", de: "Leichtigkeit, Lachen, Freudemomente", fr: "Légèreté, rires, moments de bonheur", es: "Ligereza, risa, momentos de felicidad", ar: "الخفة والضحك ولحظات السعادة", ja: "軽やかさ、笑い、喜びの瞬間", zh: "轻盈、笑声、幸福时刻" } },
  { g: "✿", c: "#8b7342", cat: { tr: "Oyun", en: "Play", de: "Spiel", fr: "Jeu", es: "Juego", ar: "اللعب", ja: "遊び", zh: "玩耍" }, name: { tr: "Oyun", en: "Play", de: "Spiel", fr: "Jeu", es: "Juego", ar: "اللعب", ja: "遊び", zh: "游戏" }, sub: { tr: "Serbestçe oynamak, şakalaşmak", en: "Playing freely, joking, being light-hearted", de: "Frei spielen, scherzen, leicht sein", fr: "Jouer librement, plaisanter", es: "Jugar libremente, bromear", ar: "اللعب بحرية والمزاح", ja: "自由に遊び、冗談を言うこと", zh: "自由玩耍、开玩笑" } },
  { g: "✺", c: "#8b7342", cat: { tr: "Oyun", en: "Play", de: "Spiel", fr: "Jeu", es: "Juego", ar: "اللعب", ja: "遊び", zh: "玩耍" }, name: { tr: "Coşku", en: "Enthusiasm", de: "Begeisterung", fr: "Enthousiasme", es: "Entusiasmo", ar: "الحماس", ja: "情熱", zh: "热情" }, sub: { tr: "Tutku, heves, içten gelen enerji", en: "Passion, eagerness, energy from within", de: "Leidenschaft, Eifer, innere Energie", fr: "Passion, ardeur, énergie intérieure", es: "Pasión, entusiasmo, energía interior", ar: "الشغف والحماس والطاقة الداخلية", ja: "情熱、熱意、内側からのエネルギー", zh: "激情、热忱、内在能量" } },
  // REFAH
  { g: "◯", c: "#5b7a8b", cat: { tr: "Refah", en: "Wellbeing", de: "Wohlbefinden", fr: "Bien-être", es: "Bienestar", ar: "الرفاه", ja: "幸福", zh: "幸福" }, name: { tr: "Huzur", en: "Peace", de: "Frieden", fr: "Paix", es: "Paz", ar: "السلام", ja: "平和", zh: "平静" }, sub: { tr: "İçsel dinginlik, sükûnet, denge", en: "Inner calm, serenity, balance", de: "Innere Ruhe, Gelassenheit, Gleichgewicht", fr: "Calme intérieur, sérénité, équilibre", es: "Calma interior, serenidad, equilibrio", ar: "الهدوء الداخلي والسكينة والتوازن", ja: "内なる静けさ、平静さ、バランス", zh: "内心平静、宁静、平衡" } },
  { g: "❋", c: "#5b7a8b", cat: { tr: "Refah", en: "Wellbeing", de: "Wohlbefinden", fr: "Bien-être", es: "Bienestar", ar: "الرفاه", ja: "幸福", zh: "幸福" }, name: { tr: "Şükran", en: "Gratitude", de: "Dankbarkeit", fr: "Gratitude", es: "Gratitud", ar: "الامتنان", ja: "感謝", zh: "感恩" }, sub: { tr: "Minnettarlık, takdir, fark etme", en: "Thankfulness, appreciation, noticing the good", de: "Dankbarkeit, Wertschätzung", fr: "Reconnaissance, appréciation", es: "Agradecimiento, apreciación", ar: "الامتنان والتقدير", ja: "感謝と良いものへの気づき", zh: "感激、欣赏、注意到美好" } },
  { g: "🌸", c: "#5b7a8b", cat: { tr: "Refah", en: "Wellbeing", de: "Wohlbefinden", fr: "Bien-être", es: "Bienestar", ar: "الرفاه", ja: "幸福", zh: "幸福" }, name: { tr: "Şefkat", en: "Compassion", de: "Mitgefühl", fr: "Compassion", es: "Compasión", ar: "الرحمة", ja: "思いやり", zh: "慈悲" }, sub: { tr: "Hem kendine hem başkasına yumuşak olmak", en: "Being gentle with yourself and others", de: "Sanft zu sich und anderen sein", fr: "Être doux envers soi-même et les autres", es: "Ser amable contigo mismo y con los demás", ar: "أن تكون لطيفاً مع نفسك ومع الآخرين", ja: "自分にも他者にも優しくあること", zh: "对自己和他人温柔" } },
  { g: "∞", c: "#5b7a8b", cat: { tr: "Refah", en: "Wellbeing", de: "Wohlbefinden", fr: "Bien-être", es: "Bienestar", ar: "الرفاه", ja: "幸福", zh: "幸福" }, name: { tr: "Kabul", en: "Acceptance", de: "Akzeptanz", fr: "Acceptation", es: "Aceptación", ar: "القبول", ja: "受容", zh: "接受" }, sub: { tr: "Olduğu gibi kabul görmek, yargılanmamak", en: "Being accepted as you are, without judgment", de: "So akzeptiert werden, wie man ist", fr: "Être accepté tel qu'on est, sans jugement", es: "Ser aceptado como eres, sin juicio", ar: "أن تُقبل كما أنت دون حكم", ja: "ありのままに受け入れられること", zh: "被接受本来的样子" } },
  // GÜVEN
  { g: "⚖", c: "#7a6b8b", cat: { tr: "Güven", en: "Trust", de: "Vertrauen", fr: "Confiance", es: "Confianza", ar: "الثقة", ja: "信頼", zh: "信任" }, name: { tr: "Adalet", en: "Fairness", de: "Gerechtigkeit", fr: "Justice", es: "Justicia", ar: "العدل", ja: "公正", zh: "公平" }, sub: { tr: "Eşit, dürüst ve hakkaniyetli muamele", en: "Equal, honest and fair treatment", de: "Gleichberechtigte, faire Behandlung", fr: "Traitement égal, honnête et équitable", es: "Trato igual, honesto y justo", ar: "معاملة متساوية وصادقة وعادلة", ja: "平等で公正な扱い", zh: "平等、诚实和公正的对待" } },
  { g: "▲", c: "#7a6b8b", cat: { tr: "Güven", en: "Trust", de: "Vertrauen", fr: "Confiance", es: "Confianza", ar: "الثقة", ja: "信頼", zh: "信任" }, name: { tr: "İstikrar", en: "Stability", de: "Stabilität", fr: "Stabilité", es: "Estabilidad", ar: "الاستقرار", ja: "安定", zh: "稳定" }, sub: { tr: "Tutarlılık, sürekliliği olan ilişkiler", en: "Consistency, lasting and reliable relationships", de: "Beständigkeit, dauerhafte Beziehungen", fr: "Cohérence, relations durables et fiables", es: "Consistencia, relaciones duraderas", ar: "الاتساق والعلاقات الموثوقة", ja: "一貫性、信頼できる関係", zh: "一致性，持久可靠的关系" } },
  { g: "◇", c: "#7a6b8b", cat: { tr: "Güven", en: "Trust", de: "Vertrauen", fr: "Confiance", es: "Confianza", ar: "الثقة", ja: "信頼", zh: "信任" }, name: { tr: "Saygı", en: "Respect", de: "Respekt", fr: "Respect", es: "Respeto", ar: "الاحترام", ja: "尊重", zh: "尊重" }, sub: { tr: "Değerli biri olarak görülmek", en: "Being seen as someone of value", de: "Als wertvolle Person gesehen werden", fr: "Être vu comme une personne de valeur", es: "Ser visto como alguien valioso", ar: "أن تُرى كشخص ذو قيمة", ja: "価値ある存在として見られること", zh: "被视为有价值的人" } },
];

// All card-specific styles scoped under .nvc-page to avoid conflicts
const NVC_CSS = `
  :root {
    --nvc-bg: #faf6f0;
    --nvc-ink: #2c2416;
    --nvc-ink2: #6b5c47;
    --nvc-ink3: #a0917e;
    --nvc-cream: #fffdf8;
    --nvc-border: #e0d5c5;
  }

  .nvc-page {
    background: var(--nvc-bg);
    color: var(--nvc-ink);
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .nvc-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  .nvc-page::after {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 35% at 15% 10%, rgba(180,155,120,0.10) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 85% 85%, rgba(140,160,140,0.08) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .nvc-content {
    position: relative;
    z-index: 1;
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.5rem 1.5rem 3rem;
    gap: 1.75rem;
  }

  .nvc-inner {
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.75rem;
  }

  /* Language Dropdown */
  .nvc-lang-dropdown { position: relative; display: inline-block; }

  .nvc-lang-trigger {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    letter-spacing: 0.03em;
    padding: 7px 16px 7px 14px;
    border-radius: 30px;
    border: 1px solid var(--nvc-border);
    background: var(--nvc-cream);
    color: var(--nvc-ink2);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5em;
    transition: all 0.18s ease;
    user-select: none;
    white-space: nowrap;
  }
  .nvc-lang-trigger:hover { border-color: var(--nvc-ink3); color: var(--nvc-ink); }
  .nvc-lang-dropdown.open .nvc-lang-trigger { border-color: var(--nvc-ink); color: var(--nvc-ink); background: #f2ece2; }

  .nvc-lang-arrow {
    font-size: 0.6rem; opacity: 0.45;
    transition: transform 0.2s ease; display: inline-block;
  }
  .nvc-lang-dropdown.open .nvc-lang-arrow { transform: rotate(180deg); }

  .nvc-lang-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(-4px);
    background: var(--nvc-cream);
    border: 1px solid var(--nvc-border);
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(44,36,22,0.13), 0 2px 8px rgba(44,36,22,0.06);
    padding: 6px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px;
    min-width: 210px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    z-index: 100;
  }
  .nvc-lang-dropdown.open .nvc-lang-menu {
    opacity: 1; pointer-events: all;
    transform: translateX(-50%) translateY(0);
  }

  .nvc-lang-option {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem; font-weight: 400;
    padding: 8px 14px; border-radius: 9px;
    cursor: pointer; color: var(--nvc-ink2);
    transition: all 0.15s ease;
    white-space: nowrap; text-align: center;
  }
  .nvc-lang-option:hover { background: var(--nvc-bg); color: var(--nvc-ink); }
  .nvc-lang-option.active { background: var(--nvc-ink); color: var(--nvc-cream); }

  /* Header */
  .nvc-header { text-align: center; }

  .nvc-eyebrow {
    font-size: 0.68rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--nvc-ink3);
    font-weight: 500; margin-bottom: 0.5rem;
    font-family: 'DM Sans', sans-serif;
  }

  .nvc-h1 {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(2rem, 6vw, 3.2rem);
    font-weight: 700;
    line-height: 1.08;
    color: var(--nvc-ink);
    letter-spacing: -0.02em;
    margin: 0;
  }
  .nvc-h1 em { font-style: normal; color: var(--nvc-ink2); }

  .nvc-subtitle {
    margin-top: 0.6rem; color: var(--nvc-ink3);
    font-size: 0.88rem; font-weight: 400;
    line-height: 1.65; max-width: 380px;
    margin-left: auto; margin-right: auto;
    font-family: 'DM Sans', sans-serif;
  }

  /* Divider */
  .nvc-divider {
    width: 60px; height: 1px;
    background: linear-gradient(90deg, transparent, var(--nvc-border), transparent);
  }

  /* Filters */
  .nvc-filters {
    display: flex; flex-wrap: wrap;
    justify-content: center; gap: 0.4rem;
  }

  .nvc-chip {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem; font-weight: 500;
    letter-spacing: 0.02em;
    padding: 5px 14px; border-radius: 30px;
    border: 1px solid var(--nvc-border);
    background: var(--nvc-cream); color: var(--nvc-ink2);
    cursor: pointer; transition: all 0.2s ease; user-select: none;
  }
  .nvc-chip:hover { border-color: var(--nvc-ink3); color: var(--nvc-ink); }
  .nvc-chip.active { background: var(--nvc-ink); border-color: var(--nvc-ink); color: var(--nvc-cream); }

  /* Card Stage */
  .nvc-stage {
    width: 100%; display: flex;
    justify-content: center; align-items: center;
    min-height: 230px; perspective: 1200px;
  }

  .nvc-card-wrap {
    width: 340px; height: 210px;
    position: relative; cursor: default;
  }

  .nvc-card-face {
    width: 100%; height: 100%;
    border-radius: 16px;
    background: var(--nvc-cream);
    border: 1px solid var(--nvc-border);
    box-shadow:
      0 2px 6px rgba(44,36,22,0.06),
      0 8px 32px rgba(44,36,22,0.10),
      0 0 0 1px rgba(255,255,255,0.7) inset;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 2rem 2.5rem; text-align: center;
    position: relative; overflow: hidden;
    transition: background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease;
  }

  .nvc-card-face::before, .nvc-card-face::after {
    content: '✦'; position: absolute;
    font-size: 0.5rem; color: var(--nvc-ink3); opacity: 0.3;
  }
  .nvc-card-face::before { top: 14px; left: 16px; }
  .nvc-card-face::after  { bottom: 14px; right: 16px; }

  .nvc-card-wrap.idle .nvc-card-face {
    background: linear-gradient(145deg, #fdfaf5, #f5ede0);
  }

  .nvc-card-bar {
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px; border-radius: 16px 16px 0 0;
    opacity: 0; transition: opacity 0.5s ease, background 0.5s ease;
  }
  .nvc-card-wrap:not(.idle) .nvc-card-bar { opacity: 1; }

  .nvc-card-category {
    position: absolute; top: 13px; right: 15px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.6rem; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--nvc-ink3);
    font-weight: 600; opacity: 0;
    transition: opacity 0.5s 0.2s ease;
  }
  .nvc-card-wrap:not(.idle) .nvc-card-category { opacity: 1; }

  .nvc-card-glyph {
    font-size: 2rem; line-height: 1; margin-bottom: 0.6rem;
    transition: transform 0.3s ease;
    filter: drop-shadow(0 2px 6px rgba(44,36,22,0.15));
  }
  .nvc-card-wrap:hover:not(.idle) .nvc-card-glyph { transform: scale(1.12) rotate(-4deg); }

  .nvc-card-name {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.75rem; font-weight: 700;
    color: var(--nvc-ink); line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .nvc-card-sub {
    margin-top: 0.4rem; font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem; color: var(--nvc-ink3);
    font-weight: 400; line-height: 1.55; max-width: 240px;
  }

  /* RTL */
  .nvc-page.rtl-mode { direction: rtl; }
  .nvc-page.rtl-mode .nvc-card-category { right: auto; left: 15px; }
  .nvc-page.rtl-mode .nvc-card-face::before { left: auto; right: 16px; }
  .nvc-page.rtl-mode .nvc-card-face::after  { right: auto; left: 16px; }

  .nvc-card-wrap.spinning .nvc-card-face {
    animation: nvcCardFlip 0.9s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes nvcCardFlip {
    0%   { transform: rotateY(0) scale(1); }
    25%  { transform: rotateY(90deg) scale(0.88); }
    50%  { transform: rotateY(180deg) scale(0.82); }
    75%  { transform: rotateY(270deg) scale(0.9); }
    100% { transform: rotateY(360deg) scale(1); }
  }

  /* Spin Button */
  .nvc-spin-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.85rem 2.8rem; border-radius: 50px;
    border: 1px solid #1a2744; background: #1a2744;
    color: #fffdf8; cursor: pointer; position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
    box-shadow: 0 4px 16px rgba(26,39,68,0.22);
  }
  .nvc-spin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(26,39,68,0.28);
    background: #243359;
  }
  .nvc-spin-btn:active { transform: translateY(0) scale(0.97); }
  .nvc-spin-btn.disabled { opacity: 0.45; pointer-events: none; }

  .nvc-btn-dot {
    display: inline-block; width: 5px; height: 5px;
    border-radius: 50%; background: currentColor;
    margin-right: 0.6em; vertical-align: middle; opacity: 0.65;
    transition: transform 0.3s ease;
  }
  .nvc-spin-btn:hover .nvc-btn-dot { transform: scale(1.8); }

  /* History */
  .nvc-history { width: 100%; }
  .nvc-history-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.68rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--nvc-ink3);
    margin-bottom: 0.6rem; font-weight: 600;
  }
  .nvc-history-list { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .nvc-h-chip {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem; padding: 4px 13px;
    border-radius: 20px; border: 1px solid var(--nvc-border);
    background: var(--nvc-cream); color: var(--nvc-ink2);
    animation: nvcPopIn 0.25s ease;
  }

  @keyframes nvcPopIn {
    from { opacity: 0; transform: scale(0.75) translateY(4px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes nvcPetalFly {
    0%   { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
    100% { opacity: 0; transform: translate(var(--tx),var(--ty)) rotate(var(--tr)) scale(0.4); }
  }

  .nvc-attribution {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem; color: var(--nvc-ink3);
    text-align: center; line-height: 1.7; font-weight: 400;
  }
`;

function spawnPetals() {
  const emojis = ["🌸", "✦", "❋", "✿", "◈", "✧"];
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  for (let i = 0; i < 12; i++) {
    const p = document.createElement("div");
    const angle = Math.random() * 2 * Math.PI;
    const dist = 80 + Math.random() * 160;
    p.style.cssText = `position:fixed;left:${cx + (Math.random() - 0.5) * 60}px;top:${cy + (Math.random() - 0.5) * 40}px;--tx:${Math.cos(angle) * dist}px;--ty:${Math.sin(angle) * dist}px;--tr:${(Math.random() - 0.5) * 360}deg;animation:nvcPetalFly ${0.9 + Math.random() * 0.7}s ${Math.random() * 0.15}s linear forwards;pointer-events:none;z-index:9999;font-size:1rem;`;
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

// Same style as BlogNavbar in App.jsx
function NvcNavbar() {
  return (
    <header className="bg-white px-8 md:px-16 py-4 border-b border-stone-100" style={{ position: "relative", zIndex: 10 }}>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Ana Sayfa
        </Link>
        <div className="text-right">
          <p className="text-base font-semibold tracking-tight text-stone-900">Zeynep Zümbül</p>
          <p className="text-xs text-stone-500 mt-0.5">İhtiyaç Kartları</p>
        </div>
      </div>
    </header>
  );
}

// Same footer as main site
function NvcFooter() {
  return (
    <footer className="bg-white px-8 md:px-16 py-16 md:py-20" style={{ position: "relative", zIndex: 10 }}>
      <div className="mx-auto max-w-xl flex flex-col items-center gap-8">
        <p className="text-2xl font-bold tracking-tight text-stone-900">Zeynep Zümbül</p>
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
        <hr className="w-full border-stone-200" />
        <p className="text-sm text-stone-400">2026 &copy; Zeynep Zümbül</p>
      </div>
    </footer>
  );
}

export default function NvcKartlari() {
  const [lang, setLangCode] = useState("tr");
  const [activeCat, setActiveCat] = useState(null);
  const [hist, setHist] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState(null);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef(null);
  const currentRef = useRef(null);

  useEffect(() => { currentRef.current = current; }, [current]);

  useEffect(() => {
    const handler = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const langObj = LANGS.find((l) => l.code === lang);
  const t = UI[lang];

  const pool = useCallback(() => {
    return !activeCat ? C : C.filter((c) => c.cat[lang] === activeCat);
  }, [activeCat, lang]);

  const spin = useCallback(() => {
    if (spinning) return;
    const p = pool();
    if (!p.length) return;
    setSpinning(true);

    const curr = currentRef.current;
    let pick;
    do {
      pick = p[Math.floor(Math.random() * p.length)];
    } while (pick === curr && p.length > 1);

    setTimeout(() => {
      setCurrent(pick);
      setHist((prev) => [pick, ...prev].slice(0, 10));
      spawnPetals();
      setSpinning(false);
    }, 920);
  }, [spinning, pool]);

  const handleLangChange = (code) => {
    setLangCode(code);
    setActiveCat(null);
    setLangMenuOpen(false);
  };

  const cats = [...new Set(C.map((c) => c.cat[lang]))];
  const isIdle = !current;

  const cardWrapClass = [
    "nvc-card-wrap",
    isIdle ? "idle" : "",
    spinning ? "spinning" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const cardFaceStyle = current
    ? {
        background: `linear-gradient(155deg, #fffdf8 0%, ${current.c}10 100%)`,
        borderColor: current.c + "30",
        boxShadow: `0 2px 6px rgba(44,36,22,0.06), 0 8px 36px ${current.c}22, 0 0 0 1px rgba(255,255,255,0.7) inset`,
      }
    : {};

  const cardBarStyle = current
    ? { background: `linear-gradient(90deg, ${current.c}99, ${current.c})` }
    : {};

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NVC_CSS }} />
      <div className={`nvc-page${langObj?.rtl ? " rtl-mode" : ""}`}>

        <NvcNavbar />

        <div className="nvc-content">
          <div className="nvc-inner">

            {/* Language Dropdown */}
            <div
              ref={langDropdownRef}
              className={`nvc-lang-dropdown${langMenuOpen ? " open" : ""}`}
            >
              <div
                className="nvc-lang-trigger"
                onClick={() => setLangMenuOpen((o) => !o)}
              >
                <span>{langObj?.label}</span>
                <span className="nvc-lang-arrow">▼</span>
              </div>
              <div className="nvc-lang-menu">
                {LANGS.map((l) => (
                  <div
                    key={l.code}
                    className={`nvc-lang-option${l.code === lang ? " active" : ""}`}
                    onClick={() => handleLangChange(l.code)}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Header */}
            <header className="nvc-header">
              <div className="nvc-eyebrow">{t.eyebrow}</div>
              <h1
                className="nvc-h1"
                dangerouslySetInnerHTML={{ __html: `${t.t1} <em>${t.t2}</em>` }}
              />
              <p className="nvc-subtitle">{t.sub}</p>
            </header>

            <div className="nvc-divider" />

            {/* Category Filters */}
            <div className="nvc-filters">
              <div
                className={`nvc-chip${!activeCat ? " active" : ""}`}
                onClick={() => setActiveCat(null)}
              >
                {t.all}
              </div>
              {cats.map((cat) => (
                <div
                  key={cat}
                  className={`nvc-chip${activeCat === cat ? " active" : ""}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* Card Stage */}
            <div className="nvc-stage">
              <div className={cardWrapClass}>
                <div className="nvc-card-face" style={cardFaceStyle}>
                  <div className="nvc-card-bar" style={cardBarStyle} />
                  <div className="nvc-card-category">
                    {current?.cat[lang] ?? ""}
                  </div>
                  <div className="nvc-card-glyph">
                    {current ? current.g : "◈"}
                  </div>
                  <div className="nvc-card-name">
                    {current ? current.name[lang] : t.idle}
                  </div>
                  <div className="nvc-card-sub">
                    {current ? current.sub[lang] : t.idleSub}
                  </div>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <button
              className={`nvc-spin-btn${spinning ? " disabled" : ""}`}
              onClick={spin}
            >
              <span className="nvc-btn-dot" />
              {t.btn}
            </button>

            {/* History */}
            {hist.length > 0 && (
              <div className="nvc-history">
                <div className="nvc-history-label">{t.hist}</div>
                <div className="nvc-history-list">
                  {hist.map((h, i) => (
                    <div
                      key={`${h.name.tr}-${i}`}
                      className="nvc-h-chip"
                      style={i > 0 ? { animation: "none" } : {}}
                    >
                      {h.g} {h.name[lang]}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="nvc-divider" />

            {/* NVC Attribution */}
            <p
              className="nvc-attribution"
              dangerouslySetInnerHTML={{ __html: t.foot.replace("\n", "<br>") }}
            />

          </div>
        </div>

        <NvcFooter />
      </div>
    </>
  );
}
