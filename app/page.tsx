'use client';

import React, { useState, useEffect } from 'react';

type PageId = 'home' | 'story';

// ==========================================
// CONFIGURATION
// ==========================================
const DISCORD_SERVER_ID = "864416237123534869";
const DISCORD_INVITE_URL = "https://discord.gg/27Zd42VfGG";
const MINECRAFT_SERVER_IP = "kumiverse.my.id";
const DONATION_URL = "https://tako.id/erzalija";

// Reusable Bento Card Component dengan Efek Hover & Border Glassmorphism
const BentoCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-[#1c1d24]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-orange-500/30 shadow-xl shadow-black/20 ${className}`}>
    {children}
  </div>
);

// KOMPONEN UNTUK EFEK ANIMASI ANGKA MENGHITUNG
function AnimatedCounter({ value, duration = 1000 }: { value: number | string; duration?: number }) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/\D/g, ''), 10) : value;
    if (isNaN(numericValue) || numericValue === 0) return;

    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (numericValue - startValue) + startValue));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  if (typeof value === 'string' && (value === '---' || value.includes('+'))) {
    return <span>{value === '---' ? '---' : count + '+'}</span>;
  }
  return <span>{count.toLocaleString('id-ID')}</span>;
}

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>('home');
  
  // State data real-time asli
  const [totalMembers, setTotalMembers] = useState<number | string>('---');
  const [onlineMembers, setOnlineMembers] = useState<number>(0);
  const [mcPlayers, setMcPlayers] = useState<number>(0);
  const [mcMaxPlayers, setMcMaxPlayers] = useState<number>(0);
  const [isMcOnline, setIsMcOnline] = useState<boolean>(false);

  // EFFECT UNTUK REAL-TIME DATA (DISCORD & MINECRAFT API)
  useEffect(() => {
    async function fetchServerData() {
      try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (response.ok) {
          const data = await response.json();
          const online = data.presence_count || 0;
          setOnlineMembers(online);
          setTotalMembers(online ? Math.floor(online * 3.5) : '1,240+'); 
        }
      } catch (error) {
        console.error("Gagal mengambil data Discord:", error);
      }

      try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${MINECRAFT_SERVER_IP}`);
        if (response.ok) {
          const data = await response.json();
          setIsMcOnline(data.online);
          if (data.online && data.players) {
            setMcPlayers(data.players.online);
            setMcMaxPlayers(data.players.max);
          } else {
            setMcPlayers(0);
            setMcMaxPlayers(100);
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data Minecraft:", error);
      }
    }

    fetchServerData();
    const interval = setInterval(fetchServerData, 30000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { title: 'Active Voice Channels', desc: 'Ruang obrolan suara jernih untuk mabar, dengerin musik, atau sekadar deep talk malam hari.' },
    { title: 'Custom Self-Roles', desc: 'Pilih role kamu sendiri sesuai game favorit, hobi, daerah, hingga gender untuk personalisasi profil.' },
    { title: 'Regular Giveaways', desc: 'Event bagi-bagi hadiah berkala mulai dari Discord Nitro, item in-game Minecraft, hingga role eksklusif.' },
    { title: 'Premium Bots Setup', desc: 'Didukung bot custom untuk pendaftaran, sistem level, pemutar musik 24/7, dan minigames seru.' },
  ];

  const mcFeatures = [
    { title: 'Survival Eco', desc: 'Ekonomi seimbang dengan sistem toko, pekerjaan, dan klaim wilayah (land claim) aman.' },
    { title: 'Cross-Platform', desc: 'Pemain Java Edition dan Bedrock Edition (HP/Konsol) bisa bermain bersama dalam satu map.' },
    { title: 'Weekly Events', desc: 'Event rutin seperti boss fight, kompetisi membangun, hingga perang faksi berhadiah menarik.' }
  ];

  return (
    <div style={{ scrollBehavior: 'smooth' }} className="min-h-screen bg-[#0f1015] text-gray-200 antialiased relative w-full overflow-x-hidden font-sans flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      
      {/* BACKGROUND DECORATIVE BLURS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-orange-600/10 rounded-full blur-[60px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-orange-600/10 rounded-full blur-[60px] sm:blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <header className="w-full px-4 pt-4 flex justify-center z-10">
        <nav className="w-full max-w-5xl px-4 sm:px-6 py-2 flex justify-between items-center bg-transparent">
          <div className="text-lg sm:text-xl font-bold tracking-wider text-white">
            Kumi<span className="text-orange-500">verse</span>
          </div>
          <div className="flex gap-2">
            {(['home', 'story'] as PageId[]).map((page) => (
              <button
                key={page}
                onClick={() => setActivePage(page)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 capitalize ${
                  activePage === page
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {page === 'story' ? 'Our Story' : page}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* MAIN CENTERED CONTAINER */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-10 sm:py-14 max-w-5xl w-full mx-auto z-10">
        
        {/* PAGE 1: HOME */}
        {activePage === 'home' && (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto animate-fade-in">
            
            {/* ROW 1: HERO CONTAINER (POLOS / TANPA CARD) */}
            <div className="md:col-span-2 flex flex-col justify-center p-6 space-y-3">
              <div>
                <span className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">Komunitas Discord & Minecraft</span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-3 leading-tight">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Kumiverse</span>
                </h1>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                Tempat berkumpulnya para gamers, kreator, dan developers. Hangout santai, mabar kompetitif, hingga membangun peradaban di server Minecraft eksklusif kami.
              </p>
            </div>

            {/* ROW 1: ACTION JOIN (PAKAI CARD) */}
            <BentoCard className="bg-gradient-to-br from-orange-600 to-orange-700 border-none text-center justify-center items-center p-8">
              <div className="space-y-4 w-full">
                <h3 className="text-xl font-black text-white tracking-wide">Ready to Connect?</h3>
                <p className="text-xs text-orange-100/80 leading-relaxed">
                  Gabung ke ekosistem server Discord kami secara instan hari ini.
                </p>
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-white text-orange-600 font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl hover:bg-gray-100 transform hover:-translate-y-0.5"
                >
                  Join Discord Server
                </a>
              </div>
            </BentoCard>

            {/* ROW 2: LIVE STATS PANELS (PAKAI CARD) */}
            <BentoCard className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1c1d24]/40 border-white/5">
              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-white">
                  <AnimatedCounter value={totalMembers} />
                </div>
                <div className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Estimated Total</div>
              </div>
              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-green-400 flex items-center justify-center gap-2 tabular-nums">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 
                  <AnimatedCounter value={onlineMembers} />
                </div>
                <div className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Online Now</div>
              </div>
              <div className="text-center p-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-400 tabular-nums">
                  <AnimatedCounter value={mcPlayers} />/<AnimatedCounter value={mcMaxPlayers} />
                </div>
                <div className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">MC Players</div>
              </div>
              <div className="text-center p-2">
                <div className="text-xl sm:text-3xl font-extrabold text-white truncate">
                  {isMcOnline ? 'ONLINE' : 'OFFLINE'}
                </div>
                <div className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">MC Server</div>
              </div>
            </BentoCard>

            {/* ROW 3: FUNDING/DONATION SUPPORT (PINDAH KE ATAS DI BAWAH REALTIME STATS) */}
            <BentoCard className="md:col-span-3 bg-gradient-to-br from-orange-600/10 to-transparent border-orange-500/20 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="space-y-1 text-center md:text-left">
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Dukung Operasional Server
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
                  Semua donasi dari kamu dialokasikan langsung untuk biaya sewa dedicated server bulanan agar performa in-game tetap lancar 24/7 tanpa lag.
                </p>
              </div>
              <a
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all duration-300 shadow-md transform hover:-translate-y-0.5"
              >
                Donasi via Tako.id
              </a>
            </BentoCard>

            {/* ROW 4: CORE HUBS - DISCORD */}
            <BentoCard>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Kumiverse Discord</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sektor utama tempat interaksi harian terjadi. Terbagi ke dalam berbagai kategori teks dan suara yang dikelola secara rapi dan aman.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-orange-400 font-semibold">
                <span>Active Community</span>
              </div>
            </BentoCard>

            {/* ROW 4: CORE HUBS - MINECRAFT */}
            <BentoCard className="md:col-span-2">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Minecraft Dedicated Server</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Dunia sandbox custom tanpa batasan. Dibangun di atas infrastruktur server berkinerja tinggi untuk memastikan gameplay yang lancar dan minim lag.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-2">
                <span className="bg-orange-500/10 text-orange-400 font-mono text-[11px] px-3 py-1 rounded-full border border-orange-500/20 font-bold">
                  IP: {MINECRAFT_SERVER_IP}
                </span>
                <span className="text-[11px] text-gray-500 font-mono">v1.21.11</span>
              </div>
            </BentoCard>

            {/* ROW 5: DISCORD FEATURES */}
            <BentoCard className="md:col-span-2">
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-white tracking-wide">Discord Features</h2>
                <p className="text-xs text-gray-400">Fasilitas terbaik yang kami sediakan untuk kenyamanan bersosialisasi.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {features.map((feat, i) => (
                  <div key={i} className="bg-[#1c1d24]/40 border border-white/5 rounded-2xl p-4">
                    <h4 className="text-xs font-bold text-white mb-1">{feat.title}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{feat.desc}</p>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* ROW 5: IN-GAME MECHANICS */}
            <BentoCard>
              <div className="mb-4">
                <h2 className="text-lg font-extrabold text-white tracking-wide">Mechanics</h2>
                <p className="text-xs text-gray-400">Sistem permainan server MC.</p>
              </div>
              <div className="space-y-3">
                {mcFeatures.map((mFeat, i) => (
                  <div key={i} className="bg-[#1c1d24]/40 border-l-2 border-orange-500 rounded-r-xl p-3">
                    <h4 className="text-xs font-bold text-white">{mFeat.title}</h4>
                    <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">{mFeat.desc}</p>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* ROW 6: HOW TO JOIN STEP GUIDE */}
            <BentoCard className="md:col-span-3">
              <h3 className="text-lg font-bold text-white mb-6 text-center md:text-left">Cara Bergabung & Bermain</h3>
              <div className="grid md:grid-cols-3 gap-6 relative">
                <div className="space-y-1 border-b border-white/5 pb-4 md:border-b-0 md:pb-0">
                  <div className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider">Step 01</div>
                  <h4 className="text-sm font-bold text-white">Masuk Discord</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Klik tombol join di atas untuk masuk ke ekosistem server Discord Kumiverse secara instan.</p>
                </div>
                <div className="space-y-1 border-b border-white/5 pb-4 md:border-b-0 md:pb-0 md:border-l md:border-white/5 md:pl-6">
                  <div className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider">Step 02</div>
                  <h4 className="text-sm font-bold text-white">Verifikasi & Pilih Role</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Selesaikan verifikasi captcha keamanan dan klaim role Minecraft di channel self-roles.</p>
                </div>
                <div className="space-y-1 md:border-l md:border-white/5 md:pl-6">
                  <div className="text-[10px] font-mono text-orange-500 font-bold uppercase tracking-wider">Step 03</div>
                  <h4 className="text-sm font-bold text-white">Klaim Whitelist & Main</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Masukkan username Minecraft kamu di channel khusus whitelist, buka game-mu, dan selamat bermain.</p>
                </div>
              </div>
            </BentoCard>

          </div>
        )}

        {/* PAGE 2: HISTORY */}
        {activePage === 'story' && (
          <div className="w-full max-w-2xl mx-auto space-y-10 animate-fade-in text-center flex flex-col items-center">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                The <span className="text-orange-500">Origin</span> Story
              </h1>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
                Bagaimana sebuah obrolan kecil bertransformasi menjadi sebuah ekosistem komunitas yang solid.
              </p>
            </div>

            <div className="w-full bg-[#1c1d24]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 text-left space-y-8 relative shadow-xl shadow-black/20">
              <div className="absolute left-[31px] sm:left-[47px] top-10 bottom-10 w-[2px] bg-gradient-to-b from-orange-500 to-transparent opacity-30" />
              
              <div className="relative flex gap-4 sm:gap-6 items-start group">
                <div className="z-10 w-3.5 h-3.5 rounded-full bg-orange-500 mt-1.5 shadow-lg shadow-orange-500/50 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Awal Mula: Cuma Group Chat Biasa</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Semuanya berawal dari sebuah group chat kecil beranggotakan beberapa teman dekat untuk sekadar mengobrol santai dan berbagi cerita setiap hari.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-4 sm:gap-6 items-start group">
                <div className="z-10 w-3.5 h-3.5 rounded-full bg-orange-500 mt-1.5 shadow-lg shadow-orange-500/50 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Mulai Membuka Diri</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Karena keseruan yang ada, kami memutuskan untuk memindahkan obrolan ke Discord dan mulai mengajak teman dari teman untuk bergabung dan meramaikan suasana.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-4 sm:gap-6 items-start group">
                <div className="z-10 w-3.5 h-3.5 rounded-full bg-orange-500 mt-1.5 shadow-lg shadow-orange-500/50 flex-shrink-0" />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Terbentuknya Kumiverse</h4>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Hingga akhirnya, tempat ini bertransformasi total menjadi <strong className="text-white">Kumiverse</strong>—sebuah server komunitas publik lengkap dengan server Minecraft tersendiri untuk bermain bersama.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* CLEAN FOOTER */}
      <footer className="w-full py-6 text-center text-xs text-gray-500 tracking-wide border-t border-white/10 bg-[#0a0a0a]/30 backdrop-blur-sm z-10">
        &copy; {new Date().getFullYear()} Kumiverse Discord Community.
      </footer>

      {/* Animasi Fade In */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}