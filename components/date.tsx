import { parseISO, format } from 'date-fns'

export default function Date({ dateString }: { dateString: string }) {

  const parsedDate = parseISO(dateString)
  return <time dateTime={dateString}>{format(parsedDate, 'LLLL d, yyyy')}</time>
}