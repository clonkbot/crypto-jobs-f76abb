import { motion } from 'framer-motion';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

const categories = [
  { value: 'all', label: 'ALL' },
  { value: 'engineering', label: 'ENGINEERING' },
  { value: 'design', label: 'DESIGN' },
  { value: 'marketing', label: 'MARKETING' },
  { value: 'community', label: 'COMMUNITY' },
  { value: 'product', label: 'PRODUCT' },
  { value: 'operations', label: 'OPS' },
];

const types = [
  { value: 'all', label: 'ALL TYPES' },
  { value: 'full-time', label: 'FULL-TIME' },
  { value: 'part-time', label: 'PART-TIME' },
  { value: 'contract', label: 'CONTRACT' },
  { value: 'freelance', label: 'FREELANCE' },
];

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8 space-y-4"
    >
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-5 h-5 text-[#00fff7]/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search positions, companies, or skills..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-lg font-mono text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00fff7]/50 focus:ring-1 focus:ring-[#00fff7]/20 transition-all"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <span className="text-[10px] font-mono text-white/20 border border-white/10 px-2 py-1 rounded">
            CTRL+K
          </span>
        </div>
      </div>

      {/* Category & Type Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Categories */}
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => onFilterChange({ category: cat.value })}
                className={`px-4 py-2 font-mono text-xs tracking-wider transition-all border rounded ${
                  filters.category === cat.value
                    ? 'bg-[#00fff7]/10 border-[#00fff7]/50 text-[#00fff7]'
                    : 'bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Job Type Select */}
        <div className="relative">
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className="appearance-none px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded font-mono text-xs text-white/70 focus:outline-none focus:border-[#00fff7]/50 cursor-pointer"
          >
            {types.map((type) => (
              <option key={type.value} value={type.value} className="bg-[#0a0a0b]">
                {type.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}