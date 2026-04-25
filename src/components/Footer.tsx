import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import buildoriaLogo from "@/assets/buildoria-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    [t("footer.product")]: [
      [t("footer.features"), "/features"],
      [t("footer.aiBuilder"), "/ai-builder"],
      [t("footer.marketplace"), "/marketplace"],
      [t("footer.pricingLink"), "/pricing"],
    ],
    [t("footer.company")]: [
      [t("footer.about"), "/about"],
      [t("footer.blog"), "/blog"],
      [t("footer.careers"), "/careers"],
      [t("footer.contact"), "/contact"],
    ],
    [t("footer.legal")]: [
      [t("footer.privacy"), "/privacy"],
      [t("footer.terms"), "/terms"],
      [t("footer.cookies"), "/cookies"],
    ],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={buildoriaLogo} alt="massoAI" className="h-10 w-auto brightness-110" />
              <span className="font-display font-bold text-xl tracking-tight">massoAI</span>
            </div>
            <p className="font-body text-sm text-background/60 leading-relaxed">{t("footer.description")}</p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4 text-background/80">{category}</h4>
              <ul className="space-y-2.5">
                {links.map(([label, path]) => (
                  <li key={label as string}>
                    <Link to={path as string} className="font-body text-sm text-background/50 hover:text-background transition-colors duration-200">
                      {label as string}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-background/40">{t("footer.rights")}</p>
          <span className="font-body text-xs text-background/40">{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
