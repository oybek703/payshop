import Header from '../components/header'
import Footer from '@/components/footer'
import { GetServerSideProps } from 'next'
import { ICountry } from '@/interfaces/ip-detection.interfaces'
import useActions from '@/hooks/useActions'
import { useEffect } from 'react'

export default function Home({ country }: HomeProps) {
  const { setCountry } = useActions()
  useEffect(() => {
    setCountry(country)
  }, [country])
  return (
    <div>
      <Header {...country} />
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // const { data } = await axios.get(`https://api.ipregistry.co?key=${process.env.IPREGISTRY_KEY}`)
  return {
    props: {
      country: {
        name: 'Uzbekistan',
        flag: '/images/flag.png'
        // name: data.location.country.name,
        // flag: data.location.country.flag.emojitwo
      }
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  country: ICountry
}
