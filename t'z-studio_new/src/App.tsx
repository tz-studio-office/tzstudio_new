import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useInView } from 'motion/react';
import { ArrowRight, Menu, X, ArrowUpRight } from 'lucide-react';

function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center p-6"
        >
          <div className="relative flex flex-col items-center gap-16 w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-sans text-7xl md:text-9xl font-black tracking-[-0.08em] text-black text-center leading-none uppercase"
            >
              T'Z <br /> Studio
            </motion.div>
            
            <div className="w-full space-y-8">
              <div className="h-0.5 w-full bg-black/[0.05] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-black rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center font-sans text-[10px] text-black/80 font-black tracking-[0.4em] uppercase">
                <span>Loading Data</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Marquee() {
  return (
    <div className="py-10 md:py-16 overflow-hidden bg-white border-y border-black/[0.03] relative z-10">
      <div className="flex whitespace-nowrap">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-24 px-12"
          >
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Future Systems</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Computational IP</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
            <span className="font-sans text-3xl md:text-5xl font-black uppercase tracking-[-0.05em] text-black/[0.04]">Design Engineering</span>
            <div className="w-1.5 h-1.5 rounded-full bg-black/[0.04]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Vision', id: 'vision' },
    { name: 'Services', id: 'services' },
    { name: 'Lab', id: 'lab' },
    { name: 'About', id: 'about' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-700 px-6 md:px-12 py-8`}>
      <div 
        ref={headerRef}
        className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-700 ${isScrolled ? 'bg-white/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/[0.01] p-4 md:p-5 rounded-full' : 'p-4 md:p-5'}`}
      >
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-4 group cursor-pointer"
        >
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-2xl shadow-black/20"
          >
            <span className="text-white font-black text-lg tracking-tighter">T</span>
          </motion.div>
          <span className="font-sans text-xl font-black tracking-[-0.06em] text-black uppercase">T'Z Studio</span>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <motion.a 
              key={item.name} 
              href={`#${item.id}`} 
              whileHover={{ y: -2 }}
              className="text-[11px] font-black uppercase tracking-[0.25em] text-black/80 hover:text-black transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl shadow-black/20"
          >
            Connect
          </motion.a>
        </nav>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-3 bg-black/[0.05] rounded-full"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[999] p-12 flex flex-col justify-center items-center gap-10"
          >
            {['Vision', 'Services', 'Lab', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="font-sans text-5xl font-black tracking-tight text-black hover:scale-110 transition-all"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Removed BackgroundManager and HUD as requested for a cleaner, white-based aesthetic.

function Hero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="hero" ref={container} className="relative h-[120vh] flex items-center justify-center bg-white">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 text-center max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20"
          >
            <span className="text-[12px] font-black text-black uppercase tracking-[0.5em] border-l-2 border-black pl-6">Design & Engineering Lab</span>
          </motion.div>
          
          <h1 className="font-sans text-[16vw] md:text-[clamp(4rem,10vw,12rem)] font-black leading-[0.85] tracking-[-0.08em] text-black uppercase">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Building <br />
              Intelligent <br />
              Systems.
            </motion.div>
          </h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="mt-24 flex flex-col items-center gap-12"
          >
            <p className="text-2xl md:text-4xl font-black text-black/80 max-w-5xl leading-[1.2] tracking-tight uppercase">
              For Human Potential. <br />
              <span className="text-black/40 text-xl md:text-2xl mt-8 block normal-case font-medium">
                教育、AI設計、業務自動化を通じて<br />
                持続可能な成長構造を設計します。
              </span>
            </p>
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full border border-black/[0.08] flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-black/60 rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 bg-white rounded-[5rem] p-12 md:p-24 border-2 border-black/[0.05] shadow-[0_60px_150px_rgba(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div className="relative z-10 space-y-20">
              <span className="text-[12px] font-black text-black uppercase tracking-[0.6em] border-l-4 border-black pl-6">01. PHILOSOPHY</span>
              <h2 className="font-sans text-6xl md:text-8xl lg:text-[clamp(4rem,6.5vw,8rem)] font-black leading-[0.85] tracking-[-0.08em] text-black uppercase">
                Designing <br />
                Systems <br />
                <span className="text-black/[0.1]">For Human</span> <br />
                Growth.
              </h2>
              <p className="text-2xl md:text-4xl font-black text-black max-w-4xl tracking-tight leading-[1.2] uppercase">
                教育、AI、IP設計を通じて、<br />
                人とアイデアが持続的に成長する構造をつくる。
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 bg-white rounded-[4rem] p-12 md:p-16 border-2 border-black/[0.05] shadow-[0_40px_100px_rgba(0,0,0,0.03)] relative flex flex-col justify-center overflow-hidden group"
            >
              <span className="absolute top-12 left-12 text-[11px] font-black text-black uppercase tracking-[0.6em]">APPROACH</span>
              <div className="relative z-10">
                <p className="text-xl md:text-[clamp(1.2rem,1.8vw,1.8rem)] font-black text-black tracking-tighter leading-[1.2] uppercase">
                  構造を設計し、<br />
                  人の可能性を最大化する。
                </p>
              </div>
              <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-black/[0.02] pointer-events-none">A</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-black text-white rounded-[4rem] p-12 md:p-16 relative flex flex-col justify-center overflow-hidden shadow-2xl shadow-black/40 group"
            >
              <span className="absolute top-12 left-12 text-[11px] font-black text-white/60 uppercase tracking-[0.6em]">FOCUS</span>
              <div className="relative z-10 space-y-4">
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">Education</p>
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">AI Systems</p>
                <p className="text-2xl md:text-[clamp(1.2rem,1.8vw,2rem)] font-black tracking-[-0.05em] leading-none uppercase hover:translate-x-2 transition-transform duration-500 cursor-default whitespace-nowrap">IP Development</p>
              </div>
              <div className="absolute -right-8 -bottom-8 text-[12rem] font-black text-white/[0.03] pointer-events-none">F</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    id: "education",
    title: "Education Design",
    desc: "教育設計 / 英語指導 / 思考トレーニング。オンライン・対面レッスン、集団・マンツーマン対応。",
    detail: {
      title: "EDUCATION DESIGN",
      subtitle: "計画とやり方で、結果は変わる。",
      description: "英語学習は、時間の長さではなく、計画と実行方法で決まります。T'Z Studioでは、目標から逆算した学習計画と、最適な実行方法を組み合わせ、持続可能な成長を支援します。",
      experienceTitle: "教育領域における実践経験",
      experienceDesc: "T'Z Studioの教育アプローチは、多様な教育現場での実践経験を基盤としています。",
      experiences: [
        "公文式教室 英語講師 / 教室運営",
        "RIZAP ENGLISH 正社員トレーナー",
        "武田塾 校舎長",
        "都内私立高校 英検対策指導",
        "中高一貫校 ESS活動顧問",
        "社会人向けマンツーマン指導"
      ],
      closing: "幼少期教育から大学受験、社会人教育まで、幅広い層への指導経験をもとに構築されています。",
      results: {
        title: "Results / Achievements",
        items: [
          { category: "University Entrance", content: ["GMARCH合格事例", "英語偏差値向上事例"] },
          { category: "EIKEN", content: ["準1級・2級・準2級 多数合格"] },
          { category: "TOEIC", content: ["200点以上スコア向上事例", "800点突破事例"] }
        ],
        closing: "成果は偶然ではなく、計画と方法に基づく継続的な改善の結果です。"
      },
      program: {
        title: "Program Overview",
        desc: "現在、コーチングを基盤とした学習計画・実行管理プログラムを提供しています。",
        sections: [
          { label: "対象", items: ["大学受験対策", "英検（準2級〜準1級）", "TOEICスコア向上", "留学準備", "社会人向け実践英語"] },
          { label: "形式", items: ["オンライン（Zoom / Google Meet）", "全国対応", "週2回（1回60分）"] },
          { label: "料金目安", items: ["月額 39,800円〜"], note: "※目標・頻度により調整されます。 ※質問対応はセッション内および定期フィードバックにて行います。" }
        ]
      },
      structure: {
        title: "Program Structure",
        desc: "本プログラムは、以下の構造で進行します。",
        items: [
          {
            number: "01",
            title: "現状分析",
            content: "現在の英語力・課題・目標を整理し、成長に必要な要素を明確化します。"
          },
          {
            number: "02",
            title: "逆算計画設計",
            content: "試験日や目標スコアから逆算し、短期・中期・長期の学習計画を構築します。日々の学習内容も具体化し、継続可能なスケジュールへ落とし込みます。"
          },
          {
            number: "03",
            title: "実行セッション（週2回）",
            content: "課題確認・理解定着・弱点補強を行います。単なる解説ではなく、「やり方」の精度を毎回確認します。"
          },
          {
            number: "04",
            title: "定期フィードバック",
            content: "進捗状況を確認し、必要に応じて計画を修正します。常に最短距離で成果に向かう構造を維持します。"
          }
        ],
        closing: "本プログラムは、単なる授業ではなく、成果到達までの伴走を前提としています。"
      },
      consultation: {
        title: "Consultation",
        subtitle: "英語学習を「自己流」から\n「成果設計型」へ。",
        desc: "まずは30\u00A0分の無料相談で、現在地の整理と目標達成までのロードマップをご提案します。",
        contentTitle: "無料相談（30分）の内容",
        contentDesc: "無料相談では、以下を行います。",
        items: [
          { title: "現状分析", content: "現在の英語力・学習状況・目標を整理します。" },
          { title: "課題の可視化", content: "伸び悩みの原因や、改善すべきポイントを明確にします。" },
          { title: "簡易ロードマップ提示", content: "目標達成までのおおよその期間と、学習設計の方向性をご提案します。" },
          { title: "プログラム適合判断", content: "T'Z Studioのプログラムが適しているかをお伝えします。" }
        ],
        notes: [
          "※オンライン（Zoom / Google Meet）",
          "※所要時間：約30分",
          "※全国対応"
        ],
        closing: "無理な勧誘は行いません。ご相談のみでも問題ありません。目標や状況によっては、他の選択肢をご提案する場合もございます。",
        buttonLabel: "無料相談を申し込む"
      }
    }
  },
  {
    id: "production",
    title: "Production",
    desc: "AIを活用した事業構造の実装。Website設計、業務自動化、AIコンテンツ制作まで構造設計から実装までを一貫して行います。",
    detail: {
      title: "AI-DRIVEN PRODUCTION",
      subtitle: "設計から実装まで、伴走します。",
      description: "構想を、実行へ。T'Z Studioは、単なるアドバイザーでも制作代行でもありません。AIを活用した事業構造を、設計から実装まで伴走します。ツールを導入することが目的ではありません。事業が継続的に回る「構造」をつくることが目的です。",
      experienceTitle: "Implementation Experience",
      experienceDesc: "これまで複数の事業において、AIを活用した構造設計および実装に関与してきました。",
      experiences: [
        "Stripe決済付き受発注サイト構築",
        "AI活用Webサイト設計",
        "Google Apps Scriptによる業務自動化",
        "AI文章生成を活用した記事生成システム設計",
        "事業導線の再構築"
      ],
      closing: "※守秘義務の関係上、特定企業名の公開は行っておりません。",
      results: {
        title: "What We Do",
        items: [
          { category: "Structure Design", content: ["サービス導線設計", "価格構造設計", "業務フロー再設計"] },
          { category: "AI Integration", content: ["AI活用戦略設計", "コンテンツ自動生成設計", "業務効率化構造設計"] },
          { category: "Automation", content: ["業務プロセス自動化設計", "問い合わせ〜納品までの流れ最適化", "Google Apps Script等による改善提案"] }
        ],
        closing: "単なるツール紹介ではなく、実装可能な形に落とし込みます。"
      },
      engagementModel: {
        title: "Engagement Model",
        desc: "ご支援は以下の流れで行います。",
        items: [
          {
            number: "01",
            title: "初回診断セッション",
            price: "60分 / 5,000円（税込）",
            content: "現状整理、課題分析、導入の方向性をご提案します。"
          },
          {
            number: "02",
            title: "構造設計フェーズ",
            price: "55,000円〜",
            content: "事業構造・業務設計・AI導入設計を具体的な実行計画に落とし込みます。"
          },
          {
            number: "03",
            title: "伴走サポート（月額）",
            price: "29,800円〜",
            content: "・月2回オンラインセッション ・改善提案 ・実装ディレクション ・簡易チャットサポート。単発ではなく、継続的な改善を前提とします。"
          }
        ]
      },
      optionalBuild: {
        title: "Optional Build Support",
        content: "サイト構築やプラットフォーム実装を弊社にご依頼いただく場合は、別途お見積りとなります。制作のみの受注は行っておらず、構造設計を前提としたプロジェクトとして承ります。"
      },
      targetAudience: {
        title: "Who This Is For",
        items: [
          "AIを導入したいが何から始めれば良いかわからない",
          "ツールは知っているが構造化できない",
          "外注するとブラックボックスになるのが不安",
          "事業を自分で理解しながら成長させたい",
          "業務効率化と収益構造を同時に改善したい"
        ]
      },
      consultation: {
        title: "Consultation",
        subtitle: "AI導入・構造診断セッション\n60\u00A0分 / 5,000円（税込）",
        desc: "まずは現状整理から始めます。",
        buttonLabel: "初回診断セッションを申し込む"
      }
    }
  }
];

function Services({ onServiceClick }: { onServiceClick: (service: any) => void }) {
  return (
    <section id="services" className="py-24 md:py-32 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] font-black text-black mb-6 block uppercase tracking-[0.6em] border-l-4 border-black pl-6">02. CAPABILITIES</span>
            <h2 className="font-sans text-7xl md:text-[8vw] font-black tracking-[-0.1em] text-black uppercase leading-none">Services.</h2>
          </motion.div>
          <div className="max-w-xl">
            <p className="text-black font-black text-xl md:text-2xl leading-[1.3] tracking-tight uppercase">
              We engineer specialized <br /> computational design solutions <br /> for the next digital era.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onServiceClick(s)}
              className="group relative bg-white p-10 md:p-12 rounded-[3rem] border-2 border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.02)] cursor-pointer overflow-hidden transition-all duration-700 hover:border-black hover:shadow-[0_40px_100px_rgba(0,0,0,0.06)]"
            >
              <div className="relative z-20 space-y-10 transition-colors duration-700 group-hover:text-white">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-black text-black/60 group-hover:text-white/60 uppercase tracking-[0.5em]">S-{i + 101}</span>
                  <div className="w-12 h-12 rounded-full border-2 border-black/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                    <ArrowUpRight size={20} className="text-black group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-black tracking-[-0.08em] uppercase leading-tight">
                  {s.title}
                </h3>
                
                <p className="leading-relaxed text-base font-black tracking-tight uppercase opacity-90">
                  {s.desc}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
              
              <span className="absolute -bottom-4 -right-4 text-[8rem] font-black text-black/[0.02] group-hover:text-white/[0.04] transition-colors duration-700 leading-none pointer-events-none">
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const labExperiments = [
  {
    number: "01",
    title: "AI Content Publishing System",
    shortTitle: "AI Content System",
    summary: "情報取得から投稿まで自動化",
    description: "コンテンツ制作を「毎回作る」から「仕組みで回す」へ移行する実験を行っています。",
    doing: [
      "外部ニュース／情報の自動取得",
      "AIによる要約・整形",
      "記事フォーマットへの変換",
      "Webサイトへの自動投稿",
      "投稿データの分析"
    ],
    themes: [
      "生成精度の安定化",
      "人の編集をどこまで減らせるか",
      "SEOへの影響",
      "投稿頻度と品質のバランス"
    ],
    result: "現在、投稿作業時間を約70%削減する構造を実装中。"
  },
  {
    number: "02",
    title: "Business Automation System",
    shortTitle: "Business Automation",
    summary: "業務プロセスの構造化",
    description: "小規模事業者や非エンジニアでも導入できる実装レベルの自動化構造を検証しています。",
    doing: [
      "見積書の自動生成",
      "定型メール返信の自動化",
      "顧客データ整理",
      "業務フローの自動処理設計",
      "決済フローの構造化"
    ],
    themes: [
      "属人化の排除",
      "手作業時間の削減率",
      "ミス削減",
      "導入難易度の最小化"
    ],
    result: "一部業務において作業時間を半分以下に削減。"
  },
  {
    number: "03",
    title: "Education Performance Model",
    shortTitle: "Education Model",
    summary: "逆算型成果設計",
    description: "英語学習を「努力量」ではなく「構造と実行管理」で成果を出すモデルを改善しています。",
    doing: [
      "学習開始時の現状分析",
      "試験日から逆算したスケジュール設計",
      "課題設計と実行管理",
      "セッションごとの改善フィードバック",
      "成果データの記録と分析"
    ],
    themes: [
      "継続率向上",
      "短期スコア上昇率",
      "課題量と成果の相関",
      "学習負荷の最適化"
    ],
    result: "短期集中設計によりスコア改善速度が向上。"
  },
  {
    number: "04",
    title: "IP Growth & Multi-Channel Analysis",
    shortTitle: "IP Growth",
    summary: "データ管理型コンテンツ運用",
    description: "コンテンツ運用を「感覚」ではなく「データと改善ループ」で管理する実験を行っています。",
    doing: [
      "YouTube / SNS複数アカウント運用",
      "投稿ごとの再生・維持率データ収集",
      "タイトル／構成のAB検証",
      "フォーマット改善",
      "成長要因の数値分析"
    ],
    themes: [
      "維持率と登録率の相関",
      "投稿時間と拡散率",
      "フォーマット変更の影響",
      "成長曲線の再現性"
    ],
    result: "維持率改善により登録率が上昇傾向。"
  }
];

function LabModal({ isOpen, onClose, initialIndex }: { isOpen: boolean, onClose: () => void, initialIndex: number }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const exp = labExperiments[activeIndex];

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-8"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header / Tabs */}
            <div className="p-6 md:p-10 border-b border-black/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-white sticky top-0 z-10">
              <div className="flex flex-wrap gap-2 md:gap-4">
                {labExperiments.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                      activeIndex === idx 
                        ? 'bg-black text-white shadow-xl shadow-black/20' 
                        : 'bg-black/[0.03] text-black/40 hover:bg-black/[0.08]'
                    }`}
                  >
                    {item.shortTitle}
                  </button>
                ))}
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-black/[0.05] flex items-center justify-center hover:bg-black hover:text-white transition-all group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-16"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <span className="text-6xl font-black text-black/10">{exp.number}</span>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">{exp.title}</h3>
                  </div>
                  <p className="text-xl md:text-2xl font-black text-black/80 leading-relaxed max-w-3xl">{exp.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-8">
                    <span className="text-[11px] font-black text-black/40 uppercase tracking-[0.5em] block border-b border-black/10 pb-6">実際にやっていること</span>
                    <ul className="space-y-4">
                      {exp.doing.map((item, j) => (
                        <li key={j} className="text-base font-black text-black/70 flex items-start gap-4">
                          <span className="w-2 h-2 rounded-full bg-black/20 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-8">
                    <span className="text-[11px] font-black text-black/40 uppercase tracking-[0.5em] block border-b border-black/10 pb-6">現在の検証テーマ</span>
                    <ul className="space-y-4">
                      {exp.themes.map((item, j) => (
                        <li key={j} className="text-base font-black text-black/70 flex items-start gap-4">
                          <span className="w-2 h-2 rounded-full bg-black/20 mt-2 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-12 border-t border-black/5">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1.5 h-6 bg-black rounded-full" />
                    <span className="text-[11px] font-black text-black uppercase tracking-[0.5em]">Result / Insight</span>
                  </div>
                  <div className="bg-black/[0.02] p-8 md:p-12 rounded-[2rem] border border-black/[0.05]">
                    <p className="text-xl font-black text-black leading-relaxed">
                      {exp.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Lab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="lab" className="py-24 md:py-32 bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] font-black text-black mb-6 block uppercase tracking-[0.6em] border-l-4 border-black pl-6">03. THE ARCHIVE</span>
            <h2 className="font-sans text-7xl md:text-[8vw] font-black tracking-[-0.1em] text-black uppercase leading-none">Lab.</h2>
            <p className="mt-8 text-black/60 font-black text-sm uppercase tracking-widest">Ongoing Experiments & Implementation</p>
          </motion.div>
          <div className="max-w-xl">
            <p className="text-black font-black text-xl md:text-2xl leading-[1.3] tracking-tight uppercase">
              T'Z Studioは、思想だけでなく、実際に構造を組み、動かし、改善しています。ここでは現在進行中の実装内容を公開しています。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labExperiments.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setSelectedIndex(i);
                setIsModalOpen(true);
              }}
              className="group p-8 border-2 border-black/[0.05] rounded-[2rem] space-y-6 hover:border-black transition-all duration-500 cursor-pointer bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
            >
              <div className="flex justify-between items-start">
                <span className="text-2xl font-black text-black/10 group-hover:text-black/20 transition-colors">{exp.number}</span>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:border-black transition-all duration-500">
                  <ArrowUpRight size={16} className="text-black group-hover:text-white group-hover:rotate-45 transition-all duration-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-black uppercase tracking-tight leading-tight">{exp.shortTitle}</h3>
                <p className="text-xs font-black text-black/40 uppercase tracking-widest leading-relaxed">
                  → {exp.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <LabModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialIndex={selectedIndex} 
      />
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12 mb-32">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[11px] font-black text-black/60 uppercase tracking-[0.6em]"
          >
            04. THE STUDIO
          </motion.span>
          <h2 className="font-sans text-8xl md:text-[clamp(4rem,12vw,14rem)] font-black tracking-[-0.08em] text-black uppercase leading-[0.75]">
            The <br />
            <span className="text-black/[0.08]">Studio.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <p className="text-3xl md:text-5xl font-black leading-[1.3] text-black tracking-tight">
              T'Z Studioは、<br />
              検証し、改善し続けます。
            </p>
            <p className="text-xl md:text-2xl font-black text-black/60 leading-relaxed uppercase">
              教育、AI、IP。<br />
              異なる領域を横断しながら、<br />
              成長構造そのものを設計します。
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">FOUNDER</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Masashi Takano</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">STRATEGY DIRECTOR</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Koz</p>
            </div>
            <div className="p-10 rounded-[3rem] bg-white border border-black/[0.01] shadow-[0_40px_100px_rgba(0,0,0,0.03)]">
              <span className="text-[10px] font-black text-black/60 mb-4 block uppercase tracking-[0.4em]">CREATIVE DIRECTOR</span>
              <p className="text-2xl font-black text-black tracking-[-0.06em] uppercase">Karen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;
    
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.details || errorMessage;
        } catch (e) {
          // If not JSON, get text
          const text = await response.text();
          errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      alert(`Failed to send message: ${error.message}`);
      setStatus('idle');
    }
  };

  return (
    <section id="contact" className="py-32 md:py-64 px-6 md:px-12 relative overflow-hidden bg-white scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-black/[0.01] shadow-[0_50px_150px_rgba(0,0,0,0.05)] p-12 md:p-32 rounded-[5rem] relative overflow-hidden">
          <div className="flex flex-col gap-20">
            <div className="space-y-8">
              <span className="text-[11px] font-black text-black/60 uppercase tracking-[0.6em]">05. CONNECT</span>
              <h2 className="font-sans text-7xl md:text-9xl font-black tracking-[-0.08em] leading-[0.8] text-black uppercase">
                Contact.
              </h2>
            </div>

            <div className="max-w-4xl w-full">
              {status === 'success' ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20">
                  <p className="text-6xl font-black tracking-[-0.08em] mb-6 text-black uppercase">Thank you.</p>
                  <p className="text-black/80 font-black text-3xl tracking-tight uppercase">We will respond shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                  <div className="relative group">
                    <input type="text" required className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 tracking-tight uppercase" id="name" placeholder="Your Name" />
                  </div>
                  <div className="relative group">
                    <input type="email" required className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 tracking-tight uppercase" id="email" placeholder="Email Address" />
                  </div>
                  <div className="relative group">
                    <textarea required rows={3} className="w-full bg-black/[0.02] border-b-2 border-black/10 p-8 text-2xl font-black text-black focus:outline-none focus:border-black transition-all placeholder:text-black/40 resize-none tracking-tight uppercase" id="message" placeholder="Your Message" />
                  </div>
                  <button 
                    disabled={status === 'submitting'} 
                    type="submit" 
                    className="group self-start flex items-center gap-10 bg-black text-white px-16 py-8 rounded-full hover:scale-105 transition-all disabled:opacity-50 shadow-2xl shadow-black/40"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">{status === 'submitting' ? 'Processing...' : 'Send Message'}</span>
                    <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 md:px-12 relative overflow-hidden bg-white border-t border-black/[0.03]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="font-sans text-2xl font-black tracking-tighter text-black">T'Z Studio</div>
        <div className="flex gap-10">
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">Instagram</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">Twitter</a>
          <a href="#" className="text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors">LinkedIn</a>
        </div>
        <div className="text-xs font-black text-black/20 uppercase tracking-widest">
          © 2024 T'Z Studio.
        </div>
      </div>
    </footer>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('a, button, .group'));
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-black pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center mix-blend-difference ${isHovered ? 'scale-[2.5] bg-white border-white' : 'scale-100'}`}
    >
      <div className={`w-1 h-1 bg-white rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  );
}

function ServiceDetail({ service, onClose }: { service: any, onClose: () => void }) {
  if (!service || !service.detail) return null;
  const d = service.detail;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[10001] bg-white overflow-y-auto p-6 md:p-12"
    >
      <div className="max-w-7xl mx-auto relative">
        <button 
          onClick={onClose}
          className="fixed top-8 right-8 md:top-12 md:right-12 z-[10002] w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={32} />
        </button>

        <div className="pt-24 md:pt-32 space-y-24 pb-32">
          <div className="space-y-8">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[12px] font-black text-black uppercase tracking-[0.6em] border-l-4 border-black pl-6 block"
            >
              SERVICE DETAIL
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-sans text-6xl md:text-9xl font-black tracking-[-0.08em] text-black uppercase leading-[0.85]"
            >
              {d.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-4xl font-black text-black/40 uppercase tracking-tight"
            >
              {d.subtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <p className="text-2xl md:text-3xl font-black leading-relaxed text-black">
                {d.description}
              </p>

              {d.results && (
                <div className="space-y-12 pt-12 border-t border-black/10">
                  <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/60">
                    {d.results.title}
                  </h3>
                  <div className="space-y-10">
                    {d.results.items && d.results.items.map((item: any, i: number) => (
                      <div key={i} className="space-y-4">
                        <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.4em] block">{item.category}</span>
                        <div className="space-y-2">
                          {item.content && item.content.map((c: string, j: number) => (
                            <p key={j} className="text-xl font-black text-black uppercase">{c}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg font-black text-black/60 italic">
                    {d.results.closing}
                  </p>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-12"
            >
              <div className="bg-black/[0.02] p-12 rounded-[4rem] border border-black/[0.05] space-y-12">
                <div className="space-y-8">
                  <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/60 border-b border-black/10 pb-4">
                    {d.experienceTitle}
                  </h3>
                  <p className="text-lg font-black text-black/80">
                    {d.experienceDesc}
                  </p>
                  <ul className="space-y-6">
                    {d.experiences && d.experiences.map((exp: string, i: number) => (
                      <li key={i} className="flex items-start gap-4 text-xl font-black text-black uppercase tracking-tight">
                        <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0" />
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg font-black text-black/60 leading-relaxed italic border-t border-black/5 pt-8">
                  {d.closing}
                </p>
              </div>
            </motion.div>
          </div>

          {d.program && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-black p-10 md:p-16 rounded-[3rem] text-white space-y-12"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white/40">
                  {d.program.title}
                </h3>
                <p className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {d.program.desc}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {d.program.sections && d.program.sections.map((section: any, i: number) => (
                  <div key={i} className="space-y-6">
                    <span className="text-sm md:text-base font-black text-white/60 uppercase tracking-widest block border-b border-white/10 pb-4">{section.label}</span>
                    <div className="space-y-3">
                      {section.items && section.items.map((item: string, j: number) => (
                        <p key={j} className="text-xl font-black uppercase tracking-tight">{item}</p>
                      ))}
                    </div>
                    {section.note && (
                      <p className="text-sm font-black text-white/40 leading-relaxed">
                        {section.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {d.structure && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="space-y-16 py-12"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/40">
                  {d.structure.title}
                </h3>
                <p className="text-2xl md:text-3xl font-black text-black leading-tight">
                  {d.structure.desc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {d.structure.items && d.structure.items.map((item: any, i: number) => (
                  <div key={i} className="flex gap-8 p-10 bg-black/[0.02] rounded-[3rem] border border-black/[0.05]">
                    <span className="text-4xl font-black text-black/10 leading-none">{item.number}</span>
                    <div className="space-y-4">
                      <h4 className="text-xl font-black uppercase tracking-tight text-black">{item.title}</h4>
                      <p className="text-lg font-black text-black/60 leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xl font-black text-black/40 italic text-center pt-8">
                {d.structure.closing}
              </p>
            </motion.div>
          )}

          {d.engagementModel && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="space-y-16 py-12"
            >
              <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/40">
                  {d.engagementModel.title}
                </h3>
                <p className="text-2xl md:text-3xl font-black text-black leading-tight">
                  {d.engagementModel.desc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {d.engagementModel.items && d.engagementModel.items.map((item: any, i: number) => (
                  <div key={i} className="p-10 bg-black/[0.02] rounded-[3rem] border border-black/[0.05] space-y-8 flex flex-col">
                    <div className="flex justify-between items-start">
                      <span className="text-4xl font-black text-black/10 leading-none">{item.number}</span>
                      <span className="text-sm md:text-base font-black px-4 py-2 bg-black text-white rounded-full uppercase tracking-wider">{item.price}</span>
                    </div>
                    <div className="space-y-4 flex-grow">
                      <h4 className="text-xl font-black uppercase tracking-tight text-black">{item.title}</h4>
                      <p className="text-base font-black text-black/60 leading-relaxed whitespace-pre-wrap">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xl font-black text-black/40 italic text-center pt-8">
                単発ではなく、継続的な改善を前提とします。
              </p>
            </motion.div>
          )}

          {d.optionalBuild && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56 }}
              className="p-10 md:p-16 bg-black text-white rounded-[3rem] space-y-8"
            >
              <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white/40">
                {d.optionalBuild.title}
              </h3>
              <p className="text-xl md:text-2xl font-black leading-relaxed">
                {d.optionalBuild.content}
              </p>
            </motion.div>
          )}

          {d.roles && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12"
            >
              <div className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/40">
                  {d.roles.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {d.roles.items && d.roles.items.map((role: string, i: number) => (
                    <div key={i} className="p-6 border border-black rounded-2xl flex items-center justify-center text-center">
                      <span className="text-lg font-black uppercase tracking-tight">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-2xl md:text-3xl font-black text-black leading-relaxed italic">
                  {d.roles.desc}
                </p>
              </div>
            </motion.div>
          )}

          {d.whyUs && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.56 }}
              className="bg-black p-10 md:p-16 rounded-[3rem] text-white space-y-12"
            >
              <h3 className="text-xl font-black uppercase tracking-[0.4em] text-white/40">
                {d.whyUs.title}
              </h3>
              <div className="space-y-8">
                {d.whyUs.items && d.whyUs.items.map((item: any, i: number) => (
                  <div key={i} className={`flex items-start gap-6 ${item.type === 'solution' ? 'text-white' : 'text-white/40'}`}>
                    {item.type === 'solution' ? (
                      <div className="w-3 h-3 bg-white rounded-full mt-3 flex-shrink-0" />
                    ) : (
                      <div className="w-3 h-[2px] bg-white/20 mt-4 flex-shrink-0" />
                    )}
                    <p className="text-xl md:text-2xl font-black uppercase tracking-tight leading-tight">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {d.targetAudience && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.57 }}
              className="py-12 space-y-12"
            >
              <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black/40">
                {d.targetAudience.title}
              </h3>
              <div className="flex flex-wrap gap-4">
                {d.targetAudience.items && d.targetAudience.items.map((item: string, i: number) => (
                  <div key={i} className="px-8 py-4 bg-black text-white rounded-full text-lg font-black uppercase tracking-tight">
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {d.consultation && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-10 md:p-20 border-2 border-black rounded-[3rem] space-y-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <h3 className="text-xl font-black uppercase tracking-[0.4em] text-black">
                    {d.consultation.title}
                  </h3>
                  <div className="space-y-4">
                    <p className="text-2xl md:text-4xl font-black text-black leading-tight whitespace-pre-wrap">
                      {d.consultation.subtitle}
                    </p>
                    <p className="text-xl md:text-2xl font-black text-black/60 leading-relaxed">
                      {d.consultation.desc}
                    </p>
                  </div>
                </div>
                
                {(d.consultation.contentTitle || d.consultation.items || d.consultation.notes) && (
                  <div className="bg-black/[0.02] p-10 rounded-[2.5rem] border border-black/[0.05] space-y-10">
                    {d.consultation.contentTitle && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-black uppercase tracking-[0.2em] text-black">{d.consultation.contentTitle}</h4>
                        <p className="text-black/60 font-black">{d.consultation.contentDesc}</p>
                      </div>
                    )}
                    {d.consultation.items && (
                      <div className="space-y-6">
                        {d.consultation.items.map((item: any, i: number) => (
                          <div key={i} className="flex gap-4">
                            <span className="text-black/20 font-black">{i + 1}.</span>
                            <div className="space-y-1">
                              <p className="font-black text-black uppercase tracking-tight">{item.title}</p>
                              <p className="text-sm font-black text-black/60">{item.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {d.consultation.notes && (
                      <div className="pt-6 border-t border-black/5 flex flex-wrap gap-4">
                        {d.consultation.notes.map((note: string, i: number) => (
                          <span key={i} className="text-[10px] font-black text-black/40 uppercase tracking-widest">{note}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-12 border-t border-black/5">
                <p className="text-lg font-black text-black/60 leading-relaxed max-w-2xl">
                  {d.consultation.closing}
                </p>
                <button 
                  onClick={async () => {
                    const subject = `【T'Z Studio】お問い合わせ: ${d.title}`;
                    try {
                      const response = await fetch('/api/contact', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                          name: 'Service Detail Inquiry', 
                          email: 'info@t-z-studio.com', 
                          message: `Inquiry for ${d.title}`,
                          subject 
                        })
                      });
                      
                      if (response.ok) {
                        alert('お問い合わせを送信しました。');
                        onClose();
                      } else {
                        let errorMessage = 'Failed to send inquiry';
                        try {
                          const errorData = await response.json();
                          errorMessage = errorData.message || errorData.details || errorMessage;
                        } catch (e) {
                          const text = await response.text();
                          errorMessage = text || errorMessage;
                        }
                        throw new Error(errorMessage);
                      }
                    } catch (error: any) {
                      console.error('Error sending inquiry:', error);
                      alert(`送信に失敗しました: ${error.message}`);
                    }
                  }}
                  className="w-full md:w-auto px-12 py-6 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] hover:scale-[1.05] transition-transform flex items-center justify-center gap-4 text-lg"
                >
                  {d.consultation.buttonLabel}
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  return (
    <div className="relative bg-white selection:bg-black selection:text-white font-sans overflow-x-hidden">
      <CustomCursor />
      
      {/* Premium Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] grain mix-blend-multiply" />
      
      <Preloader />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left z-[2000] bg-black"
        style={{ scaleX }}
      />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <Vision />
        <Marquee />
        <Services onServiceClick={setSelectedService} />
        <Lab />
        <About />
        <Contact />
        <Footer />
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetail 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
