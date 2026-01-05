type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition px-3 py-2';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-primary-fg hover:opacity-90'
      : 'bg-transparent text-fg hover:bg-muted';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
