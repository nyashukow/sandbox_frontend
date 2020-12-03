import gql from 'graphql-tag'
import { ref, reactive, onBeforeMount, watch } from "@vue/composition-api";

export default function useRecipesService(post) {
  const items = ref([])
  const headers = reactive([
    { text: "Name", value: "name" }
  ])
  const dialog = ref(false)
  const editedModel = ref(null)
  const defaultModel = Object.freeze({
    name: ''
  })

  const resetModel = function () {
    editedModel.value = reactive(JSON.parse(JSON.stringify(defaultModel)))
  }

  const getModels = async function () {
    const { recipes } = await post(
      gql`query{
        recipes {
          _id
          name
        }
      }`
    )
    return recipes
  }
  const getModel = async function (id) {
    const { recipe } = await post(
      gql`query($id: String!){
        recipe(id: $id) {
          _id
          name
        }
      }`,
      { id }
    )
    return recipe
  }
  const createModel = async function () {
    const { addRecipe: recipe } = await post(
      gql`mutation($name: String!){
        addRecipe(recipe: { name: $name }) {
          name
        }
      }`,
      { name: editedModel.value.name }
    )
    items.value = items.value.concat(recipe)
    return recipe
  }
  const updateModel = async function () {
    const { updateRecipe: recipe } = await post(
      gql`mutation($id: String!, $name: String!){
        updateRecipe(recipe: { _id: $id, name: $name }) {
          _id
          name
        }
      }`,
      { 
        id: editedModel.value._id,
        name: editedModel.value.name 
      }
    )
    items.value = items.value.map(item => item._id === recipe._id ? recipe : item)
    dialog.value = false
    return recipe
  }
  const deleteModel = async function () {
    const { deleteRecipe: recipe } = await post(
      gql`mutation($id: String!){
        deleteRecipe(id: $id) {
          name
        }
      }`,
      { id: editedModel.value._id }
    )
    items.value = items.value.filter(item => item._id !== editedModel.value._id)
    dialog.value = false
    return recipe
  }

  const openModelEditor = async function (id = null) {
    if (id) {
      editedModel.value = await getModel(id)
    }
    dialog.value = true
  }

  onBeforeMount(async () => {
    resetModel()
    items.value = await getModels()
  })

  watch(dialog, (value) => {
    if (!value) {
      resetModel()
    }
  })

  return {
    headers,
    items,
    createModel,
    updateModel,
    deleteModel,
    dialog,
    editedModel,
    openModelEditor
  }
}