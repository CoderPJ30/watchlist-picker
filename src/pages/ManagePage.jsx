import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, deleteDoc,doc } from "firebase/firestore";
import { handleFileUpload } from "../utils/bulk-inset";

export default function ManagePage({ items }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("movie");

  const addItem = async () => {
    if (!name || !image) return;
    await addDoc(collection(db, "watchlist"), {
      name,
      image,
      type,
      createdAt: Date.now(),
    });
    setName("");
    setImage("");
  };

  const removeItem = async (id) => {
    await deleteDoc(doc(db, 'watchlist', id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 flex items-center gap-3">
            {/* <span className="text-4xl">🎬</span> */}
            My Watchlist
          </h2>
          <p className="text-slate-600">Manage your movies and TV shows</p>
        </div>

        {/* Add Item Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Item</h3>

          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <input
              className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter title..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Image URL..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <select
              className="border border-slate-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white cursor-pointer"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="movie">🎥 Movie</option>
              <option value="show">📺 TV Show</option>
            </select>
            <button
              onClick={addItem}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              ✨ Add Item
            </button>
          </div>

          {/* Bulk Upload Section */}
          <div className="mt-6 p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">📂</span>
              <p className="font-semibold text-slate-700">Bulk Upload</p>
            </div>
            <p className="text-sm text-slate-600 mb-3">Import multiple items from a JSON file</p>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
            />
          </div>
        </div>

        {/* Items Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-800">
              Your Collection <span className="text-slate-500 text-base font-normal">({items.length} items)</span>
            </h3>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🍿</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No items yet</h3>
              <p className="text-slate-500">Start adding movies and shows to your watchlist!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  <div className="relative aspect-2/3 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"%3E%3Crect fill="%23e2e8f0" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="60" fill="%2394a3b8"%3E🎬%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {item.type === 'movie' ? '🎥' : '📺'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-slate-800 line-clamp-2 mb-2 min-h-[2.5rem]">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-full text-red-500 hover:text-white hover:bg-red-500 border border-red-500 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
