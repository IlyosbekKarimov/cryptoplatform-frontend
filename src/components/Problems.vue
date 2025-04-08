<template>
    <div>
        <h2 class="text-2xl font-bold mb-4 text-cyan-400">Kriptografiya Masalalari</h2>

        <!-- Masalalar ro‘yxati -->
        <ProblemList :selectProblem="selectProblem" />

        <!-- Tanlangan masala tafsilotlari faqat bitta chiqadi -->
        <ProblemDetail v-if="selectedProblem" :problem="selectedProblem" :submitSolution="submitSolution"
            @close="selectedProblem = null" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProblemStore } from '../stores/problemStore';
import { useUserStore } from '../stores/userStore';
import { useUserScoreStore } from '../stores/userScoreStore';
import ProblemList from './ProblemList.vue';
import ProblemDetail from './ProblemDetail.vue';

const problemStore = useProblemStore();
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();

// Tanlangan masala faqat bitta bo‘ladi
const selectedProblem = ref(null);

// Masala tanlash
const selectProblem = (id) => {
    selectedProblem.value = problemStore.problems.find(p => p.id === id);
};

// Yechimni yuborish
const submitSolution = (problem, userAnswer) => {
    if (userAnswer === problem.correctAnswer) {
        userScoreStore.addScore(userStore.user.id, problem);
        alert(`✅ To'g'ri javob! Siz ${problem.points} PTS oldingiz.`);
    } else {
        alert("❌ Noto'g'ri javob! Qaytadan urinib ko'ring.");
    }
};

// **🚀 Backenddan masalalarni avtomatik yuklash**
onMounted(() => {
    problemStore.fetchProblems();
});
</script>
