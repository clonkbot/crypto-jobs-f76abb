import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface HeaderProps {
  lastUpdate: Date;
  jobCount: number;
}

export default function Header({ lastUpdate, jobCount }: HeaderProps) {
  return (
    <header className="relative border-b border-white/5 mb-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              {/* Animated blockchain icon */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border border-[#00fff7]/50 flex items-center justify-center"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  <div className="w-6 h-6 bg-[#00fff7]/20 border border-[#00fff7]"
                    style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 border border-[#00fff7]/30"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                />
              </div>
              <span className="font-mono text-[#00fff7] text-sm tracking-widest">WEB3.CAREERS</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "'Syncopate', sans-serif" }}
            >
              <span className="text-white">CRYPTO</span>
              <span className="text-[#00fff7]">JOBS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 text-white/50 font-mono text-sm max-w-xl"
            >
              Real-time aggregated opportunities from across the decentralized ecosystem.
              <br />
              <span className="text-[#39ff14]">{jobCount}+ positions</span> indexed and updating live.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-start lg:items-end gap-2"
          >
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-[#39ff14]"
                />
                <span className="font-mono text-xs text-white/60">LIVE SYNC</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <span className="font-mono text-xs text-white/40">
                Updated {formatDistanceToNow(lastUpdate, { addSuffix: true })}
              </span>
            </div>

            {/* Source badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['LinkedIn', 'crypto.jobs', 'web3.career', 'remote3'].map((source, i) => (
                <motion.span
                  key={source}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="px-2 py-1 text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 rounded"
                >
                  {source}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated border glow */}
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-0 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#00fff7] to-transparent"
      />
    </header>
  );
}