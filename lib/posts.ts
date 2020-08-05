import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export async function getPostData(id: string) {

  // read markdown file as string
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}

export function getSortedPostsData() {

  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    /* returns an array of post entries:
     [
       { 
         id: <post-id>
         title: <post-title>
         date: <post-date>
       }, ...
     ]
    */
    return {
      id,
      ...(matterResult.data as { date: string; title: string })
    }
  })

  // sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostIds() {
  
  // get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  /* returns an array of ids:
   [ 
     {
       params: {
         id: '<post-name>'
       }
     }, ...
   ]
  */
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
