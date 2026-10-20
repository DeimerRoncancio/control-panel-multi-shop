type UserAvatarProps = {
  name?: string | null;
  lastnames?: string | null;
  imageUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'h-8 w-8 text-[11px]',
  md: 'h-10 w-10 text-xs',
  lg: 'h-14 w-14 text-base',
};

export default function UserAvatar({
  name,
  lastnames,
  imageUrl,
  size = 'md',
  className = '',
}: UserAvatarProps) {
  const initials = `${name?.[0] ?? ''}${lastnames?.[0] ?? ''}`.toUpperCase();

  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand-soft font-extrabold
        text-brand ${sizes[size]} ${className}`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        initials || '?'
      )}
    </span>
  );
}
