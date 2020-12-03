import { print } from 'graphql'

export default function({ $axios }, inject) {
  const postGql = function(gql, variables = {}) {
    return $axios.post('/graphql', { query: print(gql), variables })
      .then(res => res.data.data)
  }
  inject('post', postGql)
}