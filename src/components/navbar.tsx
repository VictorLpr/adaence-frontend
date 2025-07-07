'use client'

import Link from 'next/link'
import {useState} from 'react'
import {House, Accessibility, BookOpen, HandHelping, Menu, X} from 'lucide-react'
import {usePathname} from 'next/navigation'
import '../styles/navbar.css'

export default function Navbar(): React.ReactElement {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = (): void => setMenuOpen(!menuOpen)
  const closeMenu = (): void => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-title">
        🍵Time<span>Well</span>Spent
      </div>

      <button className="burger" onClick={toggleMenu}>
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link href="/" onClick={closeMenu} className={pathname === '/' ? 'disabled' : ''}>
            <House /> Accueil
          </Link>
        </li>
        <li>
          <Link href="/visite" onClick={closeMenu} className={pathname === '/visite' ? 'disabled' : ''}>
            <Accessibility /> Je rends visite
          </Link>
        </li>
        <li>
          <Link href="/guide" onClick={closeMenu}>
            <BookOpen /> Guide du partage
          </Link>
        </li>
        <li>
          <Link href="/benevole" onClick={closeMenu} className={pathname === '/benevole' ? 'disabled' : ''}>
            <HandHelping /> Devenir bénévole
          </Link>
        </li>
        <li className="don-mobile">
          <div className="don">
            <Link href="/don">Faire un don 🫶 </Link>
          </div>
        </li>
      </ul>

      <div className="don-desktop">
        <div className="don">
          <Link href="/don">Faire un don 🫶 </Link>
        </div>
      </div>
    </nav>
  )
}
