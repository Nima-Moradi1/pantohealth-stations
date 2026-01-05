type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = '', ...props }: SelectProps) {
  return (
    <select
      className={`h-10 w-full rounded-md border border-border bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
}
