<template>
    <div>
        <!-- Olimpiada vaqti komponenti -->
        <!-- <OlimpiadTimer :start-time="olimpiadStart" :end-time="olimpiadEnd" @status-change="handleOlimpiadStatus" /> -->

        <h2 class="text-2xl font-bold mb-4 text-cyan-400">Kriptografiya Masalalari</h2>

        <!-- <div v-if="olimpiadMessage" class="mb-6 p-4 rounded-lg" :class="olimpiadMessageClass">
            {{ olimpiadMessage }}
        </div> -->

        <!-- Masalalar ro‘yxati -->
        <ProblemList :selectProblem="selectProblem" />

        <!-- Tanlangan masala tafsilotlari faqat bitta chiqadi -->
        <ProblemDetail v-if="selectedProblem && isOlimpiadActive" :problem="selectedProblem" :submitSolution="submitSolution"
            @close="selectedProblem = null" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProblemStore } from '../stores/problemStore';
import { useUserStore } from '../stores/userStore';
import { useUserScoreStore } from '../stores/userScoreStore';
import ProblemList from './ProblemList.vue';
import ProblemDetail from './ProblemDetail.vue';
import OlimpiadTimer from './OlimpiadTimer.vue';

const problemStore = useProblemStore();
const userStore = useUserStore();
const userScoreStore = useUserScoreStore();

// olimpiada boshlanish vaqti
const olimpiadStart = new Date('2025-05-01T13:30:00');
const olimpiadEnd = new Date('2025-05-01T16:00:00');

// Tanlangan masala faqat bitta bo‘ladi
const selectedProblem = ref(null);
const isOlimpiadActive = ref(false);
const olimpiadMessage = ref('');
const olimpiadMessageClass = ref('');
const timeUntilStart = ref('');
const timeSinceEnd = ref('');

// Olimpiada holati matni
const olimpiadStatusText = computed(() => {
    const now = new Date();
    if (now < olimpiadStart) {
        return "Olimpiada hali boshlanmadi";
    } else if (now > olimpiadEnd) {
        return "Olimpiada allaqachon tugadi";
    }
    return "";
});

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

// olimpiada holati o'zgarganda
const handleOlimpiadStatus = (status) => {
    isOlimpiadActive.value = status.isActive;
    olimpiadMessage.value = status.message;
    olimpiadMessageClass.value = status.class;
    timeUntilStart.value = status.timeUntilStart;
    timeSinceEnd.value = status.timeSinceEnd;
};

// **🚀 Backenddan masalalarni avtomatik yuklash**
onMounted(() => {
    problemStore.fetchProblems();
});
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5 ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.info-message {
    color: #0052cc;
}
.warning-message {
    color: #fa8c16;
}
.error-message {
    color: #f5222d;
}
.success-message {
    color: #52c41a;
}
</style>