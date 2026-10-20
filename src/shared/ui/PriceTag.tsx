const formatter = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

type PriceTagProps = {
  price: number;
  size?: 'sm' | 'md';
};

export default function PriceTag({ price, size = 'sm' }: PriceTagProps) {
  return (
    <span
      className={`inline-flex items-start bg-sun font-extrabold leading-none tracking-tight text-ink tabular-nums ${
        size === 'md' ? 'px-2.5 pb-1.5 pt-1 text-xl' : 'px-2 pb-1 pt-1 text-sm'
      }`}
    >
      <sup className="mr-0.5 mt-0.5 text-[0.6em]">$</sup>
      {formatter.format(price)}
    </span>
  );
}
