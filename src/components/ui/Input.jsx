import clsx from 'clsx';

const Input = ({
  label,
  type = 'text',
  error,
  className = '',
  id,
  required,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-white/80"
        >
          {label}
          {required && <span className="text-fitcity ml-0.5">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={clsx(
          'w-full min-w-0 appearance-none rounded-xl border bg-white/5 px-4 py-3 text-white placeholder:text-white/40',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-fitcity/60',
          error
            ? 'border-red-500/60 focus:border-red-500'
            : 'border-white/10 hover:border-white/20 focus:border-fitcity/60'
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Input;
