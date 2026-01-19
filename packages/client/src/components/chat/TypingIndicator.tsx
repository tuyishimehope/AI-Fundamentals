const TypingIndicator = () => {
  return (
    <div className="flex gap-2 bg-neutral-100 p-3 self-start rounded-full">
      <Dot />
      <Dot className="[animation-delay:0.2s]" />
      <Dot className="[animation-delay:0.4s]" />
    </div>
  );
};

type DotProps = {
  className?: string;
};
const Dot = ({ className }: DotProps) => (
  <div
    className={`w-2 p-2 bg-neutral-400  rounded-full animate-pulse ${className}`}
  ></div>
);
export default TypingIndicator;
