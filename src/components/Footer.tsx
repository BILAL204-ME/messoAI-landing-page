import buildoriaLogo from "@/assets/buildoria-logo.png";

const footerLinks = {
  Producto: ["Características", "IA Builder", "Marketplace", "Precios"],
  Empresa: ["Sobre Nosotros", "Blog", "Carreras", "Contacto"],
  Legal: ["Privacidad", "Términos", "Cookies"],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={buildoriaLogo} alt="Buildoria" className="h-10 w-auto brightness-110" />
              <span className="font-display font-bold text-xl tracking-tight">Buildoria</span>
            </div>
            <p className="font-body text-sm text-background/60 leading-relaxed">
              La plataforma #1 en LatAm para crear sitios web con IA o desarrolladores expertos.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-background/80">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-background/50 hover:text-background transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-background/40">
            © 2026 Buildoria. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-body text-xs text-background/40">Hecho con 🧡 en LatAm</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
