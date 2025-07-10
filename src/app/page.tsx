import Header from '@/components/header'
import How from '@/components/how'
import PhotoGrid from '@/components/PhotoGrid'

export default function Home() {
  const images = [
    './images/danie-franco-ClHY-KyvI1M-unsplash.jpg',
    './images/tim-mossholder-FRPbQvAwY10-unsplash.jpg',
    './images/tatiana-zanon-MMhazsT2wtM-unsplash.jpg',
    './images/quentin-mahe-a6jCS61X1Hg-unsplash.jpg',
    './images/vladimir-soares-z_8Jqe0Cc-s-unsplash.jpg',
    './images/shimo-yann-7nTFrV1xQGE-unsplash.jpg',
    './images/mohammad-samir-huHXKc_usoA-unsplash.jpg',
    './images/michael-matveev-Bk8zT4gLLt0-unsplash.jpg',
  ]

  return (
    <>
      <Header></Header>

      <PhotoGrid images={images} />
      <How />
    </>
  )
}
