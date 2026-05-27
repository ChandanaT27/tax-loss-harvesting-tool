const Skeleton = ({ className = '' }) => (
  <div className={`shimmer-bg rounded-lg ${className}`} />
);

export const SkeletonCard = () => (
  <div className="glass-card rounded-2xl p-6 shadow-glass">
    <Skeleton className="h-5 w-40 mb-6" />
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-white/5">
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-28" />
      </div>
    </div>
  </div>
);

export const SkeletonTable = () => (
  <div className="glass-card rounded-2xl shadow-glass overflow-hidden">
    <div className="p-6 border-b border-white/5">
      <Skeleton className="h-6 w-48" />
    </div>
    <div className="divide-y divide-white/5">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-28" />
          <div className="ml-auto flex gap-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skeleton;
