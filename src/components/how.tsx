import Card from './card'

export default function How() {
  return (
    <section className="how">
      <h1>comment ça marche</h1>
      <p>Offrir un peu de votre temps, c'est offrir beaucoup. Découvrez comment planifier une visite en toute simplicité.</p>
      <div className="cards">
        <Card
          imgUrl="./images/loupe.png"
          title="1. Choisissez une rencontre"
          text="Parcourez les profils de nos aînés et trouvez la personne avec qui vous aimeriez partager un moment chaleureux."
        />
        <Card
          imgUrl="./images/memo.png"
          title="2. Remplissez le formulaire"
          text="Indiquez vos disponibilités et vos envies. Cela nous aide à organiser une rencontre adaptée et en toute confiance."
        />
        <Card
          imgUrl="./images/waving.png"
          title="3. Partagez un moment"
          text="Rendez visite à la personne âgée dans un cadre bienveillant. Une discussion, une balade ou simplement l'aider à une tâche ! Chaque moment compte."
        />
        <Card
          imgUrl="./images/heart.png"
          title="4. Créez du lien"
          text="Si le courant passe, vous pouvez revenir ! Ensemble, tissons des liens durables et combattons l'isolement pas à pas."
        />
      </div>
    </section>
  )
}
