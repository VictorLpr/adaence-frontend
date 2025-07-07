interface Rdv {
  id: number;
  date: string;
  heure: string;
  lieu: string;
  description: string;
}

const prochainsRdvs: Rdv[] = [
  {
    id: 1,
    date: "2025-07-10",
    heure: "14:00",
    lieu: "Maison de retraite Les Lilas",
    description: "Visite hebdomadaire aux résidents",
  },
  {
    id: 2,
    date: "2025-07-12",
    heure: "09:30",
    lieu: "Centre social La Source",
    description: "Atelier mémoire avec les aînés",
  },
  {
    id: 3,
    date: "2025-07-15",
    heure: "16:00",
    lieu: "Parc municipal",
    description: "Promenade accompagnée",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes prochains rendez-vous</h1>
      <ul className="space-y-4">
        {prochainsRdvs.map((rdv) => (
          <li key={rdv.id} className="border rounded-lg p-4 shadow-sm bg-white">
            <div className="font-semibold text-lg">{rdv.description}</div>
            <div className="text-gray-600">{rdv.date} à {rdv.heure}</div>
            <div className="text-gray-500">Lieu : {rdv.lieu}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
