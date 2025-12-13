import React from 'react';
import { Button } from '../components/Button';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600 mb-8">
            Have questions about our platform?
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900">Support</h3>
              <p className="text-slate-600">help@virtulab.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Sales</h3>
              <p className="text-slate-600">sales@virtulab.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Office</h3>
              <p className="text-slate-600">
                123 Physics<br />
                Bishkek, Kyrgyzstan
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
              <input type="text" id="name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
              <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm px-3 py-2 border" placeholder="How can we help?"></textarea>
            </div>
            <Button className="w-full justify-center">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};