import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = 'https://ylzefbqoxvqwxjougyyd.supabase.co';
const supabaseAnonKey = 'Sb_publishable_VLVWZaHKpOtg9DvSkOdI0w_Npih5_eb';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      const { data } = await supabase
        .from('properties')
        .select('*')
        .eq('is_approved', true);
      setProperties(data || []);
      setLoading(false);
    }
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 md:p-8">
      <header className="max-w-5xl mx-auto flex justify-between items-center py-4 border-b border-slate-800 mb-8">
        <h1 className="text-2xl font-bold text-amber-400">Diyor Estate</h1>
        <div className="flex gap-4">
          <Link href="/agent" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-sm font-medium border border-slate-700">
            Кабинети Агент
          </Link>
          <Link href="/admin" className="bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm">
            Админ Panel
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Эълонҳои фаъол дар Душанбе</h2>

        {loading ? (
          <p className="text-slate-400">Дар ҳоли боргирӣ...</p>
        ) : properties.length === 0 ? (
          <div className="p-8 bg-slate-800/50 border border-slate-800 rounded-2xl text-center text-slate-400">
            Ҳоло ҳеҷ эълони тасдиқшуда нест. Аз кабинети агент хона илова кунед!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((item) => (
              <div key={item.id} className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-2xl font-black text-amber-400 mb-2">${item.price_usd}</p>
                <div className="flex gap-4 text-sm text-slate-400 mb-4">
                  <span>📍 {item.district}</span>
                  <span>🚪 {item.rooms} ҳуҷра</span>
                  <span>📐 {item.area_sqm} м²</span>
                </div>
                <p className="text-slate-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
