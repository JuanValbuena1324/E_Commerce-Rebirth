import Link from 'next/link';

const columns = [
  {
    title: 'Marca',
    links: [
      { label: 'Acerca de', href: '#' },
      { label: 'Lookbook',  href: '#' },
      { label: 'Prensa',    href: '#' },
    ],
  },
  {
    title: 'Compañía',
    links: [
      { label: 'Tienda', href: '/shop' },
      { label: 'Empleo', href: '#' },
    ],
  },
  {
    title: 'Servicio Al Cliente',
    links: [
      { label: 'Contáctanos',     href: '#' },
      { label: 'Formas de Envío', href: '#' },
      { label: 'Medios de Pago',  href: '#' },
    ],
  },
  {
    title: 'Términos y Condiciones',
    links: [
      { label: 'Política',             href: '#' },
      { label: 'Tratamiento de Datos', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-offwhite border-t border-brand-light px-6 md:px-10 py-10
                       grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8">
      {/* Register promo — full width on mobile */}
      <div className="col-span-2 md:col-span-1 border-b md:border-b-0 md:border-r border-brand-light pb-6 md:pb-0 md:pr-8">
        <p className="font-cinzel text-[10px] font-bold tracking-widest uppercase text-brand-black mb-1">
          Registrate
        </p>
        <p className="text-[11px] text-brand-mid leading-relaxed">
          Regístrate y recibe un 10% descuento en su primera compra
        </p>
      </div>

      {columns.map((col) => (
        <div key={col.title}>
          <p className="font-cinzel text-[9px] font-bold tracking-[0.2em] uppercase text-brand-black mb-3">
            {col.title}
          </p>
          {col.links.map((l) => (
            <Link key={l.label} href={l.href}
              className="block text-[11px] text-brand-mid hover:text-brand-black uppercase tracking-[0.05em] mb-1 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      ))}
    </footer>
  );
}
