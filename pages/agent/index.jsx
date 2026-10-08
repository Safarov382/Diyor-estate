import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

const supabaseUrl = 'https://ylzefbqoxvqwxjougyyd.supabase.co';
const supabaseAnonKey = 'Sb_publishable_VLVWZaHKpOtg9DvSkOdI0w_Npih5_eb';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AgentDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    price_usd: '',
    district: 'Исмоили Сомонӣ',
    rooms: '1',
    area_sqm: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(false);

    const { error } = await supabase.from('properties').insert([
      {
        title: formData.title,
        price_usd: parseFloat(formData.price_usd),
        district: formData.district,
        rooms: parseInt(formData.rooms),
        area_sqm: parseFloat(formData.area_sqm),
        description: formData.description,
        is_approved: false
      }
    ]);

    setLoading(false);
    if (!error) {
      setSuccessMsg(true);
      setFormData({
        title: '',
        price_usd: '',
        district: 'Исмоили Сомонӣ',
        rooms: '1',
        area_sqm: '',
        description: ''
      });
    } else {
      alert('Хатогӣ ҳангоми иловакунӣ: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-slate-800 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-amber-400 mb-2 flex items-center gap-2">
          <PlusCircle className="w-7 h-7" /> Илова кардани Хонаи Нав
        </h1>
        <p className="text-slate-400 text-sm mb-6">Маълумоти хонаро ворид кунед. Баъди тасдиқи Админ дар сайт фаъол мешавад.</p>

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6" />
            <span>Хона бо муваффақият илова шуд ва барои санҷиш ба Админ фиристода шуд!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Номи эълон</label>
            <input 
              type="text" required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Масалан: Хонаи 3-ҳуҷрагӣ, 80м²"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Нарх ($ USD)</label>
              <input 
                type="number" required
                value={formData.price_usd}
                onChange={(e) => setFormData({...formData, price_usd: e.target.value})}
                placeholder="55000"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Ноҳия</label>
              <select 
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none">
                <option value="Исмоили Сомонӣ">Исмоили Сомонӣ</option>
                <option value="Шоҳмансур">Шоҳмансур</option>
                <option value="Сино">Сино</option>
                <option value="Фирдавсӣ">Фирдавсӣ</option>
                <option value="Рӯдакӣ">Рӯдакӣ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Шумораи ҳуҷраҳо</label>
              <input 
                type="number" min="1" max="10" required
                value={formData.rooms}
                onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Майдон (м²)</label>
              <input 
                type="number" step="0.1" required
                value={formData.area_sqm}
                onChange={(e) => setFormData({...formData, area_sqm: e.target.value})}
                placeholder="65.5"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Тавсифи пурра</label>
            <textarea 
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Дар бораи таъмир, ошёна, наздикии мактаб ва шароитҳо нависед..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:border-amber-400 outline-none"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2">
            {loading ? 'Дар ҳоли сабт...' : 'Илова кардан ба база'}
          </button>
        </form>
      </div>
    </div>
  );
}
