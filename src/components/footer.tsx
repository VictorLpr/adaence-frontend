import {Facebook, Instagram, Linkedin, Twitch} from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-10 w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-gray-600 pb-8">
        <div className="max-w-sm">
          <h3 className="text-(--primary-color) text-lg font-semibold mb-4">ADAENCE</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Notre mission est de recréer du lien avec les personnes âgées isolées, en leur offrant des moments de partage, d'écoute et de présence.
          </p>
          <div className="flex space-x-4">
            <div className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
              <Facebook size={20} />
            </div>
            <div className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
              <Instagram size={20} />
            </div>
            <div className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
              <Linkedin size={20} />
            </div>
            <div className="p-2 bg-gray-600 rounded-full hover:bg-gray-500 transition-colors cursor-pointer">
              <Twitch size={20} />
            </div>
          </div>
        </div>

        <div className="max-w-sm">
          <h3 className="text-(--primary-color) text-lg font-semibold mb-4">INFORMATIONS UTILES</h3>
          <ul className="list-none p-0 flex flex-col items-start space-y-3">
            <li>
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">
                Liste des activités
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">
                Nous contacter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 text-sm hover:text-white transition-colors">
                Mentions légales
              </a>
            </li>
          </ul>
        </div>

        <div className="max-w-sm">
          <h3 className="text-(--primary-color) text-lg font-semibold mb-4">CONTACT</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            116 Rue du Faubourg Saint-Martin
            <br />
            75010 Paris, France
            <br />
            Email:{' '}
            <a href="mailto:contact@adaence.fr" className="text-gray-300 hover:text-white transition-colors">
              contact@adaence.fr
            </a>
            <br />
            Tél: +33 1 23 45 67 89
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-5">
        © 2025 Adaence. Tous droits réservés. <br />
        Ce site a été développé dans le cadre d'un projet pour ADA Tech School.
      </div>
    </footer>
  )
}
