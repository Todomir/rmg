import type { NextApiRequest, NextApiResponse } from 'next'

import faunadb from 'faunadb'
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const { Ref, Paginate, Match, Index, Get, Collection } = faunadb.query

interface IDocs {
  data: Array<{ id: string }>
}

interface IMeal {
  data: {
    name: string
    description: string
    ingredients: Array<string>
    instructions: Array<string>
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // fetching document ids
      const docs: IDocs = await client.query(Paginate(Match(Index('allMeals'))))
      const ids = docs.data.map(item => item.id)

      // getting a random id from the query
      const i = Math.round(Math.random() * (ids.length - 1))
      const id = ids[i]

      // fetching the document data
      const doc: IMeal = await client.query(Get(Ref(Collection('meals'), id)))

      res.status(200).json(doc.data)
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    res.status(400).send('Request method must be GET.')
  }
}
