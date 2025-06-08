import { useEffect, useState } from 'react';
import CommissionTable from '../components/CommissionTable';
import { supabase } from '../lib/supabase';
import type { Commission } from '../lib/supabase';
import Link from 'next/link';

export default function ClosedDeals() {
  const [loading, setLoading] = useState(true);
  const [closedDeals, setClosedDeals] = useState<Commission[]>([]);

  useEffect(() => {
    const fetchClosedDeals = async () => {
      const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .eq('isclosed', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching closed deals:', error);
      } else {
        setClosedDeals(data || []);
      }
      setLoading(false);
    };

    fetchClosedDeals();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Closed Deals</h1>
          <Link href="/" className="self-start px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            ← Back to Commissions
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-xl">Loading...</div>
        ) : (
          <CommissionTable initialData={closedDeals} isClosedDealsPage />
        )}
      </main>
    </div>
  );
} 