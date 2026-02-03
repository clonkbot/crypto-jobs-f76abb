import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
  index: number;
}

const categoryColors: Record<Job['category'], string> = {
  engineering: '#00fff7',
  design: '#ff6b9d',
  marketing: '#ffb800',
  community: '#39ff14',
  product: '#a78bfa',
  operations: '#f97316',
};

const typeLabels: Record<Job['type'], string> = {
  'full-time': 'FT',
  'part-time': 'PT',
  contract: 'CTR',
  freelance: 'FRL',
};

export default function JobCard({ job, index }: JobCardProps) {
  const categoryColor = categoryColors[job.category];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: Math.min(index * 0.05, 0.5) }}
      whileHover={{ y: -4 }}
      className={`group relative bg-white/[0.02] border border-white/10 rounded-lg p-5 cursor-pointer overflow-hidden transition-colors hover:border-white/20 ${
        job.featured ? 'ring-1 ring-[#ffb800]/30' : ''
      }`}
    >
      {/* Hover glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"
      />

      {/* Featured badge */}
      {job.featured && (
        <div className="absolute top-0 right-0">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ffb800] blur-sm opacity-30" />
            <div className="relative bg-[#ffb800] text-black font-mono text-[10px] font-bold px-2 py-1 rounded-bl">
              FEATURED
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Company Logo Placeholder */}
        <div
          className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center font-mono text-sm font-bold shrink-0"
          style={{ backgroundColor: `${categoryColor}10`, color: categoryColor }}
        >
          {job.logo}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-mono text-[10px] px-2 py-0.5 rounded border"
              style={{
                color: categoryColor,
                borderColor: `${categoryColor}40`,
                backgroundColor: `${categoryColor}10`,
              }}
            >
              {job.category.toUpperCase()}
            </span>
            <span className="font-mono text-[10px] text-white/40 border border-white/10 px-2 py-0.5 rounded">
              {typeLabels[job.type]}
            </span>
          </div>
          <h3 className="font-semibold text-white truncate group-hover:text-[#00fff7] transition-colors">
            {job.title}
          </h3>
        </div>
      </div>

      {/* Company & Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-white/70">{job.company}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-white/50">{job.location}</span>
          {job.remote && (
            <span className="font-mono text-[10px] text-[#39ff14] bg-[#39ff14]/10 px-1.5 py-0.5 rounded">
              REMOTE
            </span>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="font-mono text-sm text-[#00fff7]">{job.salary}</div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
          <span>{job.source}</span>
          <span>·</span>
          <span>{formatDistanceToNow(job.postedAt, { addSuffix: true })}</span>
        </div>
      </div>

      {/* Animated border on hover */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        style={{ backgroundColor: categoryColor }}
      />
    </motion.article>
  );
}