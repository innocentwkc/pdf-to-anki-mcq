<template>
  <div class="w-full flex">
    <input type="file" @change="loadFile" class="mb-4" />
    <div v-if="mcqs && mcqs.length > 0" class="container mx-auto p-4">
      <div class="mcq bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p class="question-text text-2xl text-justify mb-4">{{ currentQuestion.question }}</p>
        <div class="mb-4 ml-6 answer-text" v-for="(option, key) in currentQuestion.options" :key="key">
          <input type="radio" :name="'question' + currentQuestionIndex" :id="'question' + currentQuestionIndex + key" :value="key" v-model="userAnswers[currentQuestionIndex]" class="mr-2">
          <label :for="'question' + currentQuestionIndex + key" class="text-md">{{ option }}</label>
        </div>
        <div v-if="answersChecked" class="text-md my-2">
          <p v-if="userAnswers[currentQuestionIndex] === currentQuestion.answer" class="text-green-500">Correct!</p>
          <p v-else class="text-red-500">Incorrect. Correct Answer: <span class="font-semibold">{{ currentQuestion.answer }}</span></p>
        </div>
        <div class="flex justify-between">
          <button @click="previousQuestion" :disabled="currentQuestionIndex === 0" class="btn btn-secondary">Previous</button>
          <button @click="nextQuestion" :disabled="currentQuestionIndex === mcqs.length - 1" class="btn btn-primary">Next</button>
        </div>
      </div>
      <button @click="checkAnswers" class="btn btn-accent">Check Answer</button>
    </div>
    <div v-else class="container mx-auto p-4">
      Loading MCQs...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const mcqs = ref([]);
const currentQuestionIndex = ref(0);
const userAnswers = ref({});
const answersChecked = ref(false);

// Load MCQs from your JSON file (adjust the path as needed)
onMounted(async () => {
  const response = await fetch('/output.json');
  mcqs.value = await response.json();
});

const currentQuestion = computed(() => mcqs.value[currentQuestionIndex.value]);

// Function to handle file selection
const loadFile = async (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/json") {
    const reader = new FileReader();
    reader.onload = (e) => {
      mcqs.value = JSON.parse(e.target.result);
      currentQuestionIndex.value = 0;
      answersChecked.value = false;
    };
    reader.readAsText(file);
  } else {
    alert("Please select a valid JSON file.");
  }
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < mcqs.value.length - 1) {
    currentQuestionIndex.value++;
    answersChecked.value = false; // Reset the answer check when moving to the next question
  }
};

const previousQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    answersChecked.value = false; // Reset the answer check when moving to the previous question
  }
};

const checkAnswers = () => {
  answersChecked.value = true;
};

</script>

<style>

.question-text {
  font-size: 1.6rem;
}
.answer-text {
  font-size: 1.1rem;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
}
</style>
