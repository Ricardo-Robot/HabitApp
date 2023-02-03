interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const progressStayle = {
    width: `${progress}%`,
  };
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <div className="h-3 rounded-xl bg-violet-600 " style={progressStayle} />
    </div>
  );
}
