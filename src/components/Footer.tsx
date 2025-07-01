// components/Footer.tsx
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          GeoTrio © {new Date().getFullYear()} &nbsp;|&nbsp; Developed by <strong>Bau David</strong>
        </p>
        <div className="footer-icons-inline">
          <a href="https://www.linkedin.com/in/david-bau-67a65628b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="footer-icon" />
          </a>
          <a href="https://github.com/DDavidescu" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="footer-icon" />
          </a>
        </div>
      </div>
    </footer>
  )
}
