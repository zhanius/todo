<template>
  <div class="font-prompt mt-5 lg:mt-8">
    <ul v-if="tasks.length">
      <li v-for="(task, index) in tasks" :key="index" class="flex items-start justify-between flex-nowrap sm:mb-1 lg:mb-3">
        <button @click="$emit('toggle-task', index)"
          class="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 lg:h-8 lg:w-8 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-white active:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black my-3 border-2"
        >
          <img v-if="task.done" src="https://img.icons8.com/?size=64&id=W9RS5YNuHAdG&format=png" alt="Done Icon" class="lg:w-8 lg:h-8 w-5 h-5 md:w-6 md:h-6" />
          <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Sun_white_icon.svg/1200px-Sun_white_icon.svg.png" alt="Not Done Icon" class="lg:w-8 lg:h-8 w-5 h-5 md:w-6 md:h-6" />
        </button>

        <div :class="['flex-grow ml-3 md:ml-4 lg:ml-5 xl:ml-9', { 'line-through': task.done }, 'break-words']">
          <h1 class="lg:text-2xl sm:text-xl text-lg h-auto max-w-44 sm:max-w-80 md:max-w-sm lg:max-w-xl xl:max-w-3xl py-3 text-md">
            {{ task.text }}
          </h1>
        </div>

        <div class="flex justify-between w-40 sm:w-44 lg:w-56 md:w-64 xl:w-72" >
          <h3 class="max-w-4xl text-green-700 text-xs lg:text-sm py-5">
            {{ task.time }} · {{ task.date }}
          </h3>
          <button @click="$emit('edit-task', index)" class="py-3">
            <img title="Edit" src="https://img.icons8.com/?size=50&id=8192&format=png" class="lg:w-7 w-5 md:w-6" />
          </button>
          <button @click="$emit('delete-task', index)" class="py-3">
            <img title="Delete" src="https://img.icons8.com/?size=24&id=99961&format=png" class="w-5 lg:w-7 md:w-6" />
          </button>
        </div>
      </li>
    </ul>

    <div v-else class="text-xl ml-2">
      Your to do list is currently empty.
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
}
</script>
