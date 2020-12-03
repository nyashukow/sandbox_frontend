<template lang="pug">
v-container
  v-data-table(
    :headers="headers"
    :items="items"
    @click:row="({ _id }) => openModelEditor(_id)"
  )
    template(v-slot:top)
      v-toolbar(flat)
        v-spacer
        v-dialog(v-model="dialog" max-width="500")
          template(v-slot:activator="{ on }")
            v-btn(fab color="primary" @click="openModelEditor()")
              v-icon mdi-plus
          v-card
            v-card-title Title
            v-card-text
              v-text-field(v-model="editedModel.name")
            v-card-actions
              v-btn(v-if="editedModel._id" @click="deleteModel()") Delete
              v-spacer
              v-btn(@click="() => { dialog = false }") Cancel
              v-btn(v-if="editedModel._id" @click="updateModel()") Save
              v-btn(v-else @click="createModel()") Save
</template>

<script>
import useRecipesService from "@/hooks/useRecipesService"

export default {
  setup(props, { root }) {
    return {
      ...useRecipesService(root.$post)
    }
  }
};
</script>