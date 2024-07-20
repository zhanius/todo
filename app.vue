<template>
  <div class="bg-[rgb(255,249,237)] w-full min-h-screen p-9 lg:p-20">
    <header class="flex items-center justify-between">
      <div>
        <h3 class="text-lg font-rubik flex items-center sm:text-3xl lg:text-4xl sm:text-xl">
          <img src="https://img.icons8.com/?size=64&id=33chAaLguV4A&format=png" class="mr-3" />
          To do - your daily checklist!
        </h3>
      </div>
    </header>

    <div class="font-prompt flex items-center mt-8 sm:mt-14 md:mt-14 lg:mt-14 justify-between">
      <input type="text" placeholder="Enter your todo..." v-model="inputValue"
        class="outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black py-2 md:py-1.5 sm:py-3 lg:py-2 md:text-xl text-md px-5 lg:text-2xl sm:text-xl w-7/12 sm:w-8/12 md:w-9/12 lg:w-9/12 xl:w-10/12 border-3 placeholder-black placeholder-opacity-50 placeholder font-medium" />
      <button title="Date and time" @click="showDateModal = true"
        class="shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-3 px-3 py-1 md:py-0">
        <img src="https://img.icons8.com/?size=30&id=59758&format=png" class="w-8 sm:w-10 md:w-10 lg:w-12" />
      </button>

      <button :disabled="!selectedDate || !selectedTime || !inputValue" @click="addTask"
        class="bg-[rgb(255,164,164)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] border-black border-3 shadow-[5px_5px_0px_rgba(0,0,0,1)] lg:px-7 lg:py-2 md:px-6 md:py-1 sm:px-7 sm:py-3 lg:font-bold font-extrabold md:font-bold text-md px-4 py-2 lg:text-2xl md:text-2xl xl:text-2xl"
        :class="{
          'opacity-50 cursor-not-allowed':
            !selectedDate || !selectedTime || !inputValue,
        }">
        Add
      </button>
    </div>

    <List :tasks="tasks" @edit-task="openEditModal" @toggle-task="toggleDone" @delete-task="deleteTask" />

    <!-- date -->
    <div v-if="showDateModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        class="bg-[rgb(255,249,237)] lg:p-8 p-6 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black border-3 font-prompt font-semibold">
        <h2 class="lg:text-2xl text-xl mb-4">Select Date</h2>
        <input type="date" v-model="selectedDate" class="border border-gray-300 p-2 mb-4 w-56" />
        <div class="flex justify-between">
          <button @click="showDateModal = false"
            class="bg-red-600 text-white md:px-3 md:py-1 px-2 lg:px-4 lg:py-2 mr-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black border-3 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Cancel
          </button>
          <button @click="nextToTimePicker"
            class="bg-blue-600 text-white md:px-3 md:py-1 px-2 lg:px-4 lg:py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black border-3 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- time -->
    <div v-if="showTimeModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        class="bg-[rgb(255,249,237)] lg:p-8 p-6 shadow-[5px_5px_0px_rgba(0,0,0,1)] border-black border-3 font-prompt font-semibold">
        <h2 class="lg:text-2xl text-xl mb-4">Select Time</h2>
        <input type="time" v-model="selectedTime" class="border border-gray-300 p-2 mb-4 w-56" />
        <div class="flex justify-between">
          <button @click="showTimeModal = false"
            class="bg-red-600 text-white md:px-3 md:py-1 px-2 lg:px-4 lg:py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] border-black border-3 mr-2 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Cancel
          </button>
          <button @click="confirmDateTime"
            class="bg-green-600 text-white px-2 md:px-3 md:py-1 lg:px-4 lg:py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] border-black border-3 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- edit -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        class="bg-[rgb(255,249,237)] p-5 lg:p-8 lg:p-8 shadow-[5px_5px_0px_rgba(0,0,0,1)] border-black border-3 font-prompt font-semibold">
        <h2 class="lg:text-2xl text-xl mb-4">Edit Task</h2>
        <input type="text" v-model="editTaskValue"
          class="border border-gray-300 p-2 mb-4 outline-none font-medium w-80" />
        <div class="flex justify-between">
          <button @click="showEditModal = false"
            class="bg-red-600 text-white md:px-3 md:py-1 px-2 lg:px-4 lg:py-2 mr-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black border-3 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Cancel
          </button>
          <button @click="confirmEdit"
            class="bg-green-600 text-white xl:px-4 md:px-3 md:py-1 px-2 lg:px-4 lg:py-2 shadow-[5px_5px_0px_rgba(0,0,0,1)] bg-[rgb(255,228,228)] border-black border-3 active:shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "./components/list.vue";

export default {
  components: {
    List,
  },
  data() {
    return {
      tasks: [],
      inputValue: "",
      selectedDate: null,
      selectedTime: null,
      showDateModal: false,
      showTimeModal: false,
      showEditModal: false,
      editTaskValue: "",
      editTaskIndex: null,
    };
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    addTask() {
      this.tasks.push({
        text: this.inputValue,
        date: this.selectedDate,
        time: this.selectedTime,
        done: false,
      });
      this.inputValue = "";
      this.selectedDate = null;
      this.selectedTime = null;
      this.saveTasks();
    },
    openEditModal(index) {
      this.editTaskIndex = index;
      this.editTaskValue = this.tasks[index].text;
      this.showEditModal = true;
    },
    confirmEdit() {
      if (this.editTaskIndex !== null) {
        this.tasks[this.editTaskIndex].text = this.editTaskValue;
        this.editTaskIndex = null;
        this.editTaskValue = "";
        this.showEditModal = false;
        this.saveTasks();
      }
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },
    nextToTimePicker() {
      this.showDateModal = false;
      this.showTimeModal = true;
    },
    confirmDateTime() {
      this.showTimeModal = false;
    },
    saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    loadTasks() {
      const savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
    toggleDone(index) {
      const updatedTasks = [...this.tasks];
      updatedTasks[index].done = !updatedTasks[index].done;
      this.saveTasks();
    },
  },
};
</script>
