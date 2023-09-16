import Image from "next/image"

import { useKeenSlider  } from 'keen-slider/react'

import { HomeContainer, Product } from "@/styles/pages/home"

import camiseta1 from '../assets/camisetas/1.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Stripe from "stripe"
import Link from "next/link"
import Head from "next/head"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [ sliderRef ] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">

        {
          products.map(product => {
            return (
              <Link key={product.id}  href={`/product/${product.id}`} prefetch={false}>
                <Product className="keen-slider__slide">
                  {/* TODO: Simular carregamento de imagem */}
                  {/* https://nextjs.org/docs/pages/api-reference/components/image-legacy#blurdataurl */}
                  {/* https://github.com/woltapp/blurhash */}
                  <Image src={product.imageUrl} width={520} height={480} alt="" />

                  <footer>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </footer>
                </Product>
              </Link>
            )
          })
        }
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.filter(product => product.active).map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images.length > 0 ? product.images[0] : camiseta1,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount ?? 0) / 100)
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}
