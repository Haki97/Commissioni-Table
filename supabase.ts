import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Commission = {
  id: string;
  client: string;
  direct: boolean | null;
  titre: boolean | null;
  compromesso: boolean | null;
  estimatedSaleDate: string | null;
  commission: string | null;
  probability: 'bassa' | 'media' | 'alta' | null;
  documents: Array<{ name: string; url: string }> | null;
  created_at: string;
  updated_at: string;
  isclosed: boolean;
};

export const initialCommissions: Commission[] = [
  { id: '1', client: "Abdessamad-Simon", direct: true, titre: true, compromesso: true, estimatedSaleDate: "2025-05-20", commission: "297000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '2', client: "Khadija Mouassine", direct: true, titre: true, compromesso: false, estimatedSaleDate: "2025-06-01", commission: "140000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '3', client: "Tariq-Stephane", direct: false, titre: true, compromesso: false, estimatedSaleDate: "2025-06-20", commission: "110000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '4', client: "Cedric-Fatallah", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-06-20", commission: "154000 Dhs", probability: "media", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '5', client: "Laurant Mounzih", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-07-10", commission: "49000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '6', client: "Stefano-Zemrani", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-06-10", commission: "96000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '7', client: "Derb Hotel", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-07-01", commission: "80000 Dhs", probability: "media", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '8', client: "Fabio-Zenjali", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-06-10", commission: "84000 Dhs", probability: "media", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '9', client: "Riad 138", direct: false, titre: true, compromesso: true, estimatedSaleDate: "2025-06-15", commission: "/", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '10', client: "Casiraghi-Abdelatif", direct: false, titre: false, compromesso: false, estimatedSaleDate: "2025-08-10", commission: "36000 Dhs", probability: "media", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '11', client: "Chritopher", direct: false, titre: true, compromesso: true, estimatedSaleDate: "2025-04-12", commission: "50000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '12', client: "Aguaviva - Yassine", direct: false, titre: true, compromesso: false, estimatedSaleDate: "2025-08-01", commission: "140000 Dhs", probability: "media", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '13', client: "Eric-Hind", direct: true, titre: true, compromesso: true, estimatedSaleDate: "2025-06-10", commission: "54000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '14', client: "Veronique", direct: false, titre: false, compromesso: true, estimatedSaleDate: "2025-06-10", commission: "39000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '15', client: "Jean Michel", direct: false, titre: false, compromesso: true, estimatedSaleDate: "2025-06-15", commission: "54000 Dhs", probability: "80%", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '16', client: "Halima Zemouri-Emmanuel", direct: false, titre: false, compromesso: true, estimatedSaleDate: "2025-06-15", commission: "18000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '17', client: "Julien - Oumamass", direct: false, titre: false, compromesso: true, estimatedSaleDate: "2025-07-15", commission: "39000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '18', client: "Mario et Pierre-El Kassimi", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-06-15", commission: "74000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '19', client: "Virginie", direct: true, titre: false, compromesso: true, estimatedSaleDate: "2025-06-15", commission: "52000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '20', client: "Bernard", direct: false, titre: true, compromesso: false, estimatedSaleDate: "2025-06-20", commission: "10000 Dhs", probability: "alta", documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '21', client: "Amine", direct: null, titre: null, compromesso: null, estimatedSaleDate: null, commission: null, probability: null, documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '22', client: "Massimo Hanane", direct: null, titre: null, compromesso: null, estimatedSaleDate: null, commission: null, probability: null, documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '23', client: "Aurelie-Mahrane", direct: null, titre: null, compromesso: null, estimatedSaleDate: null, commission: null, probability: null, documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '24', client: "Rabia-Reghsatani", direct: null, titre: null, compromesso: null, estimatedSaleDate: null, commission: null, probability: null, documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false },
  { id: '25', client: "Rabia-Reghsatani", direct: null, titre: null, compromesso: null, estimatedSaleDate: null, commission: null, probability: null, documents: [], created_at: new Date().toISOString(), updated_at: new Date().toISOString(), isclosed: false }
]; 