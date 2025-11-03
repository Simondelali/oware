import React from 'react';
import { Gamepad2, Trophy, Users, Sparkles } from 'lucide-react';

export default function GhanaGamesHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">

      {/* Header */}
      <header className="relative backdrop-blur-md bg-white/90 border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Ghana Games
              </span>
            </div>
            <div className="flex gap-6 items-center">
              <a href="#games" className="text-gray-700 hover:text-orange-600 transition font-medium">
                Games
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition font-medium">
                About
              </a>
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-8">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-700">Experience Authentic Ghanaian Gaming</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black leading-tight">
            <span className="block text-gray-900">Play Traditional</span>
            <span className="block bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Ghanaian Games
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Master ancient strategies, challenge players worldwide, and celebrate West African culture through timeless board games brought to the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href="/oware" className="group">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                <Gamepad2 className="w-5 h-5" />
                Play Oware Now
                <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </a>
            <button className="px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-orange-300 text-orange-700 font-bold text-lg hover:bg-white hover:shadow-lg transition-all">
              Learn the Rules
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
            {[
              { icon: Users, label: 'Players Online', value: 'Soon' },
              { icon: Trophy, label: 'Games Played', value: 'Soon' },
              { icon: Gamepad2, label: 'Active Games', value: '1' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Game Collection
          </h2>
          <p className="text-xl text-gray-600">Traditional games, modern experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Oware - Available */}
          <div className="group relative rounded-3xl overflow-hidden bg-white border-2 border-orange-200 hover:border-orange-400 transition-all hover:shadow-2xl hover:scale-[1.02] duration-300">
            {/* Playable Badge */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold shadow-lg">
              ACTIVE
            </div>
            
            <div className="aspect-video bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="text-7xl animate-bounce">🎯</div>
                  <div className="text-white font-bold text-lg tracking-wider">AVAILABLE NOW</div>
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">Oware</h3>
                <p className="text-gray-600 leading-relaxed">
                  Master the ancient art of seed distribution in this strategic two-player board game. Capture stones, outthink opponents, win glory.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <a href="/oware" className="flex-1">
                  <button className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-lg transition-all">
                    Play Now
                  </button>
                </a>
                <button className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:border-orange-300 hover:bg-orange-50 transition-all">
                  Rules
                </button>
              </div>

              {/* Store badges */}
              <div className="flex gap-2 pt-2">
                <a href="#" className="flex-1 hover:opacity-80 transition">
                  <div className="h-12 rounded-lg bg-black flex items-center justify-center gap-2 px-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] text-white leading-tight">Download on the</div>
                      <div className="text-sm font-semibold text-white leading-tight">App Store</div>
                    </div>
                  </div>
                </a>
                <a href="#" className="flex-1 hover:opacity-80 transition">
                  <div className="h-12 rounded-lg bg-black flex items-center justify-center gap-2 px-3">
                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="white">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-[9px] text-white leading-tight">GET IT ON</div>
                      <div className="text-sm font-semibold text-white leading-tight">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Coming Soon Games */}
          {[
            { name: 'Ludo', emoji: '🎲', color: 'from-blue-400 to-purple-500' },
            { name: 'Whot', emoji: '🃏', color: 'from-green-400 to-teal-500' }
          ].map((game) => (
            <div key={game.name} className="relative rounded-3xl overflow-hidden bg-white border-2 border-gray-200">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-50"></div>
              
              <div className={`aspect-video bg-gradient-to-br ${game.color} relative overflow-hidden opacity-40`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="text-7xl opacity-50">{game.emoji}</div>
                    <div className="text-white font-bold text-lg">COMING SOON</div>
                  </div>
                </div>
              </div>

              <div className="relative p-6 space-y-4">
                <div>
                  <h3 className="text-3xl font-black text-gray-400 mb-2">{game.name}</h3>
                  <p className="text-gray-400">
                    Another exciting Ghanaian gaming experience launching soon. Stay tuned for updates!
                  </p>
                </div>

                <button disabled className="w-full px-6 py-3 rounded-xl bg-gray-200 text-gray-400 font-bold cursor-not-allowed">
                  Coming Soon
                </button>

                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2 rounded-lg bg-gray-200 text-xs font-semibold text-gray-400 text-center opacity-50">
                    Coming Soon
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 bg-gradient-to-b from-transparent to-orange-100/50 border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Ghana Games
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Preserving and celebrating traditional Ghanaian games for the digital generation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Games</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/oware" className="text-gray-600 hover:text-orange-600 transition">Oware</a></li>
                <li><span className="text-gray-400">Ludo (Coming Soon)</span></li>
                <li><span className="text-gray-400">Whot (Coming Soon)</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">How to Play</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Strategy Guide</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Game History</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Tournaments</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Community</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Twitter</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Instagram</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">Discord</a></li>
                <li><a href="#" className="text-gray-600 hover:text-orange-600 transition">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-orange-200 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Ghana Games. Preserving African gaming culture.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}