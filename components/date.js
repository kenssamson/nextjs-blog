import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {

  const postDate = parseISO(dateString)
  const prettyDate = format(postDate, 'LLL d, yyyy')
  return <time dateTime={dateString}>{prettyDate}</time>
}