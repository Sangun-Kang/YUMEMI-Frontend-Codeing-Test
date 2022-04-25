type CardProps = {
  title: string
  paragraph: string
}

const Card = ({ title, paragraph }: CardProps) => (
  <aside>
    <h2>{title}~!!</h2>
    <p>{paragraph}</p>
  </aside>
)

export default Card
