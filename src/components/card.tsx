interface CardProps {
  imgUrl: string
  title: string
  text: string
}

export default function Card(props: CardProps) {
  return (
    <div className="card">
      <img src={props.imgUrl} alt="" width={32} />
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </div>
  )
}
