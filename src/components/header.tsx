'use client'

import React from 'react'

export default function Header(): React.ReactElement {
  return (
    <header className="header-home">
      <div className="presentation">
        <h1>Rétablissons les liens</h1>
        <p>
          Et si vous offriez un peu de votre temps à ceux qui en ont le plus besoin ? Prenez rendez-vous pour partager un moment avec une personne agée isolée
        </p>
      </div>
      <img className="background-img" src="./images/fiqih-pradana-qm-SgY--sVg-unsplash.jpg"></img>
    </header>
  )
}
