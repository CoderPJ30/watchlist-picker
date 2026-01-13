import { useState } from "react";

export default function RandomPage({ items }) {
  const [filter, setFilter] = useState("all");
  const [pick, setPick] = useState(null);

  const getRandom = () => {
    const filtered = filter === "all" ? items : items.filter(i => i.type === filter);
    if (!filtered.length) return;
    setPick(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            <span className="text-3xl">🎲</span>
            Random Picker
          </h2>
          <p className="text-slate-600 text-sm">Can't decide what to watch? Let us pick for you!</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* Left Side - Filter Card */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:sticky lg:top-24">
            <h3 className="text-base font-semibold text-slate-800 mb-3">Filter Options</h3>

            <div className="flex flex-col gap-2 mb-4">
              <label className="w-full">
                <input
                  type="radio"
                  name="type"
                  defaultChecked
                  onClick={() => setFilter("all")}
                  className="peer sr-only"
                />
                <div className="cursor-pointer border-2 border-slate-200 rounded-lg p-3 transition-all duration-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:shadow-md hover:border-slate-300 flex items-center gap-3">
                  <div className="text-2xl">🎬</div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-700">All</div>
                    <div className="text-xs text-slate-500">Movies & Shows</div>
                  </div>
                </div>
              </label>

              <label className="w-full">
                <input
                  type="radio"
                  name="type"
                  onClick={() => setFilter("movie")}
                  className="peer sr-only"
                />
                <div className="cursor-pointer border-2 border-slate-200 rounded-lg p-3 transition-all duration-200 peer-checked:border-purple-500 peer-checked:bg-purple-50 peer-checked:shadow-md hover:border-slate-300 flex items-center gap-3">
                  <div className="text-2xl">🎥</div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-700">Movies</div>
                    <div className="text-xs text-slate-500">Films only</div>
                  </div>
                </div>
              </label>

              <label className="w-full">
                <input
                  type="radio"
                  name="type"
                  onClick={() => setFilter("show")}
                  className="peer sr-only"
                />
                <div className="cursor-pointer border-2 border-slate-200 rounded-lg p-3 transition-all duration-200 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:shadow-md hover:border-slate-300 flex items-center gap-3">
                  <div className="text-2xl">📺</div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-700">Shows</div>
                    <div className="text-xs text-slate-500">TV series</div>
                  </div>
                </div>
              </label>
            </div>

            <button
              onClick={getRandom}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-5 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <span className="text-xl">🎲</span>
              Pick Something For Me!
            </button>
          </div>

          {/* Right Side - Result Display */}
          <div className="min-h-[400px] flex items-center justify-center">
            {pick ? (
              <div className="animate-fadeIn w-full max-w-xs mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                  {/* Image Container */}
                  <div className="relative h-80 bg-gradient-to-br from-slate-100 to-slate-200">
                    <img
                      src={pick.image}
                      alt={pick.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"%3E%3Crect fill="%23e2e8f0" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="60" fill="%2394a3b8"%3E🎬%3C/text%3E%3C/svg%3E';
                      }}
                    />

                    {/* Type Badge */}
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                        <span>{pick.type === 'movie' ? '🎥' : '📺'}</span>
                        {pick.type === 'movie' ? 'Movie' : 'Show'}
                      </span>
                    </div>

                    {/* Decorative Ribbon */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="text-center">
                      <div className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium mb-1.5">
                        ✨ Your Pick
                      </div>
                      <h3 className="text-lg font-bold text-slate-800 mb-0.5 line-clamp-2">
                        {pick.name}
                      </h3>
                      <p className="text-slate-500 text-xs">
                        Time to watch!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-3 animate-bounce">🎬</div>
                <p className="text-slate-500">Click the button to get a random pick!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>

  );
}