import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// components/Footer.tsx
import { Github, Linkedin } from "lucide-react";
export default function Footer() {
    return (_jsx("footer", { className: "footer", children: _jsxs("div", { className: "footer-content", children: [_jsxs("p", { children: ["GeoTrio \u00A9 ", new Date().getFullYear(), " \u00A0|\u00A0 Developed by ", _jsx("strong", { children: "Bau David" })] }), _jsxs("div", { className: "footer-icons-inline", children: [_jsx("a", { href: "https://www.linkedin.com/in/david-bau-67a65628b/", target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn", children: _jsx(Linkedin, { className: "footer-icon" }) }), _jsx("a", { href: "https://github.com/DDavidescu", target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub", children: _jsx(Github, { className: "footer-icon" }) })] })] }) }));
}
