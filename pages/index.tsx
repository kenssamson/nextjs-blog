import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.scss'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'

export default function Home({ 
  allPostsData 
}: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm <strong>Ken</strong>. I'm a senior software developer for the University of Chicago, Department of Medicine.</p>
        <p>
          (This is a sample website - you'll be building a site like this on <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(postData => (
            <li className={utilStyles.listItem} key={postData.id}>
              <Link href="/posts/[id]" as={`/posts/${postData.id}`}>
                <a>{postData.title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={postData.date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()

    return {
      props: {
        allPostsData
      }
    }
}
