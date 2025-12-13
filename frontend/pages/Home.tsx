import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Globe, PlayCircle, Users, Loader2 } from 'lucide-react';
import { ExperimentCard } from '../components/ExperimentCard';
import { Button } from '../components/Button';
import { ButtonVariant, Experiment } from '../types';
const API_URL = import.meta.env.VITE_API_URL;

export const Home: React.FC = () => {
  const [featuredExperiments, setFeaturedExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(`${API_URL}/experiments`);
        if (response.ok) {
          const data = await response.json();
          setFeaturedExperiments((data || []).slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch experiments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col">
      {/* hero section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 z-0 opacity-70"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-100 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 blur-3xl opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Master Physics with <span className="text-primary-600">Virtual Labs</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Perform advanced physics experiments directly from your browser. No equipment needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/physics">
                <Button variant={ButtonVariant.PRIMARY} className="px-8 py-3 text-base h-auto rounded-full">
                  Explore Experiments
                </Button>
              </Link>
              <Link to="/about">
                <Button variant={ButtonVariant.OUTLINE} className="px-8 py-3 text-base h-auto rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" /> 50+ Simulations
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" /> Free Access
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="relative rounded-2xl shadow-2xl overflow-hidden border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800" 
                 alt="Physics Simulation" 
                 className="w-full h-auto object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                 <div className="text-white">
                   <p className="font-bold text-lg">Interactive Learning</p>
                   <p className="text-sm opacity-90">Real-time data visualization</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose VirtuLab?</h2>
            <p className="text-slate-600">The most advanced platform for virtual physics education.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Globe className="h-10 w-10 text-primary-600" />, 
                title: "Accessible Anywhere", 
                desc: "Access our lab from any device anywhere in the world. No expensive hardware required." 
              },
              { 
                icon: <PlayCircle className="h-10 w-10 text-primary-600" />, 
                title: "Interactive Simulations", 
                desc: "Manipulate variables in real-time and observe immediate results with accurate physics engines." 
              },
              { 
                icon: <Users className="h-10 w-10 text-primary-600" />, 
                title: "Curriculum Aligned", 
                desc: "Our experiments are designed by educators to match standard university physics curricula." 
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="mb-4 bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* featured experiments */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Experiments</h2>
              <p className="text-slate-600">Start exploring our most popular simulations.</p>
            </div>
            <Link to="/physics" className="hidden md:flex items-center text-primary-600 font-medium hover:text-primary-700">
              View all <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loading ? (
             <div className="flex justify-center py-12"><Loader2 className="animate-spin text-primary-600"/></div>
          ) : featuredExperiments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredExperiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
               <p className="text-slate-500">No experiments available yet.</p>
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link to="/physics">
               <Button variant={ButtonVariant.OUTLINE} className="w-full justify-center">View All Experiments</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section (Removed Auth references) */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start experimenting?</h2>
          <p className="text-primary-200 text-lg mb-8">Join thousands of students and educators using VirtuLab today.</p>
          <Link to="/physics">
            <Button className="bg-white text-primary-900 hover:bg-slate-100 text-lg px-8 py-3 h-auto rounded-full">
              Start Exploring Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};