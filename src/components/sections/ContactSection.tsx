"use client";

import { Card } from "@/components/ui/card";

export default function ContactSection() {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-600 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Card className="bg-black/30 backdrop-blur-sm border border-white/10 p-8">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-white text-sm font-medium">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Your name"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-white text-sm font-medium">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-white text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  placeholder="Your message"
                  rows={5}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </Card>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              <p className="text-gray-300">Feel free to reach out through any of these channels.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-teal-400">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <a href="mailto:hello@example.com" className="text-white hover:text-teal-400 transition-colors">hello@example.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-teal-400">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Phone</div>
                  <a href="tel:+11234567890" className="text-white hover:text-teal-400 transition-colors">+1 (123) 456-7890</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-teal-400">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white">San Francisco, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 