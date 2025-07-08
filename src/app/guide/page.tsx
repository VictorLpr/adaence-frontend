'use client'

import {Eye, Handshake, Coffee, Clock, ShieldCheck, Smile, Ghost, HeartHandshake, LucideIcon} from 'lucide-react'

import {Card, CardContent} from '@/components/ui/card'

const guidePoints: {
  keyword: string
  icon: LucideIcon
  description: string
}[] = [
  {
    keyword: 'Présence',
    icon: Eye,
    description: 'Être pleinement là, même pour un court instant. Écouter, observer, ressentir sans distraction. La vraie connexion commence par l’attention.',
  },
  {
    keyword: 'Respect',
    icon: Handshake,
    description:
      "Accueillir l'autre sans jugement, avec bienveillance. Chacun a son histoire, son rythme, ses envies. Le respect est la base de toute rencontre.",
  },
  {
    keyword: 'Simplicité',
    icon: Coffee,
    description: 'Un café, une marche, un sourire. Pas besoin d’en faire trop : la simplicité crée les liens les plus sincères.',
  },
  {
    keyword: 'Temps',
    icon: Clock,
    description: 'Offrir un peu de son temps, c’est offrir beaucoup. Ce geste, même ponctuel, peut illuminer une journée entière.',
  },
  {
    keyword: 'Confiance',
    icon: ShieldCheck,
    description: 'Instaurer un climat de sécurité et de confiance. La parole est libre, l’écoute est discrète, les intentions sont claires.',
  },
  {
    keyword: 'Joie',
    icon: Smile,
    description: 'Partager un moment, c’est aussi partager une émotion. Rire, s’émouvoir, se détendre. La joie est contagieuse, dans le bon sens du terme.',
  },
  {
    keyword: 'Discrétion',
    icon: Ghost,
    description: 'Être présent sans s’imposer. Savoir rester discret sur ce que l’on voit ou entend, et respecter l’intimité de chacun.',
  },
  {
    keyword: 'Engagement',
    icon: HeartHandshake,
    description: 'Être volontaire, c’est un engagement libre mais sincère. Même petit, il compte. Votre présence a de la valeur.',
  },
]

export default function GuideDuPartage() {
  return (
    <section className="flex flex-col max-w-5xl mx-3">
      <h2 className="text-3xl font-bold mb-6 text-center">Le Guide du Partage</h2>
      <p className="text-center">Ces 8 valeurs définissent l’esprit de notre communauté. Elles guident chaque rencontre, chaque moment partagé.</p>
      <div className="flex flex-col gap-6 p-2">
        {guidePoints.map(({keyword, icon: Icon, description}) => (
          <Card key={keyword} className=" flex flex-col shadow-md hover:shadow-lg transition overflow-hidden">
            <CardContent className="flex gap-4 items-center rounded-2xl">
              <div className="pl-2 text-(--accent-color) rounded-full">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg text-(--secondary-color) font-semibold mb-1">{keyword}</h3>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
