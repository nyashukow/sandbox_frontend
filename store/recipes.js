import gql from 'graphql-tag'

export const state = () => ({
  list: [],
  initialized: false
})

export const getters = {

}

export const mutations = {
  SET_RECIPES(state, list) {
    state.list = list
  },
  INITIALIZE(state) {
    state.initialized = true
  }
}

export const actions = {
  async initRecipes({ state, commit }) {
    if (state.initialized) {
      return
    }
    const { recipes } = await this.$post(
      gql`query($limit: Int){
        recipes(limit: $limit) {
          name
        }
      }`
    )
    commit('SET_RECIPES', recipes)
    commit('INITIALIZE')
  }
}