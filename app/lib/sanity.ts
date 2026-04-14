
import { createClient } from 'next-sanity'

const projectId = '57037go6'
const dataset = 'production'
const apiVersion = '2023-05-03'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, 
  useCdn: true, 
})
