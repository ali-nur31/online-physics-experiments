import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { Experiment, ButtonVariant } from '../types';
import { Button } from './Button';

interface ExperimentCardProps {
  experiment: Experiment;
}

export const ExperimentCard: React.FC<ExperimentCardProps> = ({ experiment }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img 
          src={experiment.imageUrl} 
          alt={experiment.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary-700 shadow-sm">
          {experiment.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{experiment.date}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
          {experiment.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-grow">
          {experiment.shortDescription}
        </p>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <Link to={`/physics/${experiment.id}`} className="w-full">
            <Button variant={ButtonVariant.GHOST} className="w-full justify-between group-hover:bg-primary-50 group-hover:text-primary-700">
              Start Simulation
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};