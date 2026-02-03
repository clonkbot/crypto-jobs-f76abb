import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobCard from './components/JobCard';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import { Job, FilterState } from './types';
import { generateJobs } from './data/jobs';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    type: 'all',
    search: '',
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const initialJobs = generateJobs(24);
    setJobs(initialJobs);
    setFilteredJobs(initialJobs);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newJob = generateJobs(1)[0];
      setJobs(prev => {
        const updated = [newJob, ...prev.slice(0, 49)];
        return updated;
      });
      setLastUpdate(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Filter jobs
  useEffect(() => {
    let result = [...jobs];

    if (filters.category !== 'all') {
      result = result.filter(job => job.category === filters.category);
    }
    if (filters.type !== 'all') {
      result = result.filter(job => job.type === filters.type);
    }
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        job =>
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search) ||
          job.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }

    setFilteredJobs(result);
  }, [jobs, filters]);

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(#00fff7 1px, transparent 1px), linear-gradient(90deg, #00fff7 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }} />

      {/* Scan line effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]" style={{
        background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,247,0.03) 2px, rgba(0,255,247,0.03) 4px)`,
      }} />

      {/* Gradient orbs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] opacity-20 blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00fff7 0%, transparent 70%)' }} />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] opacity-15 blur-[100px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #39ff14 0%, transparent 70%)' }} />

      <div className="relative z-10">
        <Header lastUpdate={lastUpdate} jobCount={jobs.length} />

        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 mb-8 font-mono text-xs"
          >
            <span className="text-[#00fff7]">
              <span className="text-white/40">SHOWING</span> {filteredJobs.length} <span className="text-white/40">OF</span> {jobs.length}
            </span>
            <span className="text-[#39ff14] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#39ff14] animate-pulse" />
              LIVE FEED
            </span>
          </motion.div>

          {/* Job grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-[#00fff7] font-mono text-6xl mb-4 opacity-20">404</div>
              <p className="text-white/40 font-mono">NO MATCHING POSITIONS FOUND</p>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/5 py-6 mt-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-white/30 text-xs font-mono tracking-wider">
              Requested by <a href="https://twitter.com/depaydayNFT" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00fff7] transition-colors">@depaydayNFT</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#00fff7] transition-colors">@clonkbot</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;