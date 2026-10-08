import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Building2, Users, PhoneCall, CheckCircle, 
  Clock
} from 'lucide-react';

const supabaseUrl = 'https://ylzefbqoxvqwxjougyyd.supabase.co';
const supabaseAnonKey = 'Sb_publishable_VLVWZaHKpOtg9DvSkOdI0w_Npih5_eb';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminCRM() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'leads') {
      const { data } = await supabase.from('crm_leads').select('*, agents(full_name)').order('created_at', { ascending: false });
      setLeads(data || []);
    } else if (activeTab === 'properties') {
      const { data } = await supabase.from('properties').select('*, agents(full_name)').order('created_at', { ascending: false });
      setProperties(data || []);
    } else if (activeTab === 'agents') {
      const { data } = await supabase.from('agents').select('*').order('created_at', { ascending: false });
      setAgents(data || []);
    }
    setLoading(false);
  };

  const handleApproveProperty = async (id, isApproved) => {
    await supabase.from('properties').update({ is_approved: isApproved }).eq('id', id);
    fetchData();
  };

  const handleLeadStatusChange = async (id, newStatus) => {
    await supabase.from('crm_leads').update({ status: newStatus }).eq('id', id);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-amber-400 flex items-center gap-2">
            <Building2 className="w-8 h-8" /> DIYOR ESTATE — Super Admin
          </h1>
          <p className="text-slate-400 text-
