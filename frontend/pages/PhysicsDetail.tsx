import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Download, Clock, BarChart, Loader2 } from 'lucide-react';
import { Button } from '../components/Button';
import { ButtonVariant, Experiment } from '../types'; 

export const PhysicsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const response = await fetch(`http://localhost:8080/experiments/${id}`);
        if (!response.ok) throw new Error('Not found');
        const data = await response.json();
        setExperiment(data);
      } catch (err) {
        console.error("Experiment not found or API error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  
  if (!experiment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Experiment not found</h2>
        <Button onClick={() => navigate('/physics')}>Back to Catalog</Button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/physics" className="inline-flex items-center text-sm text-slate-500 hover:text-primary-600">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Catalog
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{experiment.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {experiment.category}
              </span>
              <span className="text-slate-500 text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1" /> ID: {experiment.id}
              </span>
            </div>

            <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg mb-8 relative group">
               {experiment.videoUrl ? (
                   <div className="flex items-center justify-center h-full text-white">
                      Video Player Placeholder ({experiment.videoUrl})
                   </div>
               ) : (
                   <img 
                    src={experiment.imageUrl || 'https://via.placeholder.com/800x600'} 
                    alt={experiment.title} 
                    className="w-full h-full object-cover" 
                   />
               )}
            </div>

            <div className="prose prose-slate max-w-none">
              <h3 className="text-xl font-bold text-slate-900 mb-3">About this Experiment</h3>
              <p className="text-slate-700 leading-relaxed mb-6 whitespace-pre-wrap">
                {experiment.fullContent}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 sticky top-24">
                <Button className="w-full mb-3 justify-center">Launch Simulation</Button>
                <Button variant={ButtonVariant.OUTLINE} className="w-full justify-center">
                   <Download className="h-4 w-4 mr-2" /> Download Materials
                </Button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};