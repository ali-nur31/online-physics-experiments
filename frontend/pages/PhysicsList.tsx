import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Loader2 } from 'lucide-react';
import { ExperimentCard } from '../components/ExperimentCard';
import { Experiment } from '../types';
const API_URL = process.env.REACT_APP_API_URL;

export const PhysicsList: React.FC = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiments = async () => {
      try {
        const response = await fetch(`${API_URL}/experiments`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setExperiments(data || []);
      } catch (err) {
        console.error(err);
        setError('Не удалось подключиться к серверу. Убедись, что Docker запущен.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiments();
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(experiments.map(e => e.category)));
  }, [experiments]);

  const filteredExperiments = useMemo(() => {
    return experiments.filter(exp => {
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            exp.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? exp.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, experiments]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin h-8 w-8 text-primary-600" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <p className="text-red-500 text-lg font-semibold mb-2">{error}</p>
       <p className="text-slate-500">Try reloading the page.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Physics Simulations Catalog</h1>
          <p className="text-slate-600 max-w-2xl">
            Filter by category or search for specific topics.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* search */}
          <div className="relative w-full md:w-96">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
             </div>
             <input
                type="text"
                placeholder="Search experiments..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          {/* filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
             <Filter className="h-5 w-5 text-slate-400 hidden md:block mr-2" />
             <button onClick={() => setSelectedCategory(null)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === null ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}>All</button>
             {categories.map(cat => (
               <button key={cat} onClick={() => setSelectedCategory(cat)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{cat}</button>
             ))}
          </div>
        </div>

        {/* grid */}
        {filteredExperiments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExperiments.map(exp => (
              <ExperimentCard key={exp.id} experiment={exp} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No experiments available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};