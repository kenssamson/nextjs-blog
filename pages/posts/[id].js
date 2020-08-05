import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.scss'
import { getAllPostIds, getPostData } from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - {postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <h3 className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </h3>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
