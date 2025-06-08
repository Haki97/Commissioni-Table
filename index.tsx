import { useEffect, useState } from 'react';
import CommissionTable from '../components/CommissionTable';
import { supabase } from '../lib/supabase';
import type { Commission } from '../lib/supabase';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [commissions, setCommissions] = useState<Commission[]>([]);

  useEffect(() => {
    async function fetchCommissions() {
      try {
        const { data, error } = await supabase
          .from('commissions')
          .select('*')
          .eq('isclosed', false)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCommissions(data || []);
      } catch (error) {
        console.error('Error fetching commissions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCommissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Commission Management</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <CommissionTable initialData={commissions} />
      </main>
    </div>
  );
} 