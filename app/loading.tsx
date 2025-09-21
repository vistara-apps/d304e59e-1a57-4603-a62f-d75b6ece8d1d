export default function Loading() {
  return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="text-center space-y-md">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-8 h-8 bg-primary rounded-full" />
        </div>
        <div className="space-y-sm">
          <div className="h-6 bg-muted rounded w-32 mx-auto animate-pulse" />
          <div className="h-4 bg-muted rounded w-48 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
