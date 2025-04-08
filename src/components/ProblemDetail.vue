<template>
    <div v-if="problem" class="mt-6 p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 mb-8">
        <h3 class="text-2xl font-bold text-white">{{ problem.title }}</h3>
        <p class="mt-3 text-gray-300">🔢 Input: {{ problem.input }}</p>
        <div class="mt-3 text-gray-300" v-html="problem.description"></div>
        <p class="mt-3 text-green-400 font-semibold">🏆 Ball: {{ problem.points }}</p>
        <p class="text-blue-400 font-semibold">📊 Qiyinlik: {{ problem.difficulty }}</p>

        <!-- Foydalanuvchi javobi -->
        <div class="mt-4">
            <input v-model="userAnswer" class="px-4 py-2 rounded bg-gray-600 text-white w-full"
                placeholder="Javobingizni kiriting..." :disabled="solvedProblems[problem.id]" />

            <button @click="submitSolution" :disabled="solvedProblems[problem.id] || loading"
                class="mt-2 px-5 py-2 rounded-md shadow-md transition"
                :class="solvedProblems[problem.id] ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'">
                {{ loading ? "⏳ Tekshirilmoqda..." : (solvedProblems[problem.id] ? "✅ Hal qilindi" : "✅ Yechimni tekshirish") }}
            </button>
        </div>

        <p v-if="message" class="mt-3 text-lg font-semibold" :class="messageClass">{{ message }}</p>

        <button @click="$emit('close')"
            class="mt-4 px-5 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition">
            🔙 Orqaga
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProblemStore } from "../stores/problemStore";
import { useUserStore } from "../stores/userStore";
import { useUserScoreStore } from "../stores/userScoreStore";
import api from '../lib/axios';

const problemStore = useProblemStore();
const userStore = useUserStore();
const scoreStore = useUserScoreStore();

const props = defineProps({ problem: Object });

const userAnswer = ref("");
const solvedProblems = ref(JSON.parse(localStorage.getItem("solvedProblems")) || {});
const loading = ref(false);
const message = ref("");
const messageClass = computed(() => (message.value.includes("❌") ? "text-red-500" : "text-green-400"));

const submitSolution = async () => {
    console.log("📤 Yuborilayotgan problem_id:", props.problem.id);
    console.log("📤 Yuborilayotgan javob:", userAnswer.value);

    if (!props.problem || !props.problem.id) {
        message.value = "❌ Xatolik: Problem ID topilmadi!";
        return;
    }

    loading.value = true;
    message.value = "";

    try {
        const response = await api.post("/api/submissions/", {
            problem: props.problem.id, // ✅ problem_id o‘rniga problem
            answer: userAnswer.value
        }, {
            headers: { Authorization: `Token ${userStore.token}` }
        });

        console.log("✅ Backend javobi:", response.data);

        if (response.data.is_correct) {
            solvedProblems.value[props.problem.id] = true;
            localStorage.setItem("solvedProblems", JSON.stringify(solvedProblems.value));
            scoreStore.fetchScores(); // 🔄 Ballarni yangilash
            message.value = `✅ To‘g‘ri javob! Siz ${props.problem.points} PTS oldingiz.`;
        } else {
            message.value = "❌ Noto'g'ri javob! Qaytadan urinib ko'ring.";
        }
    } catch (error) {
        console.error("❌ API xatosi:", error.response ? error.response.data : error.message);
        message.value = "❌ Xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.";
    }

    loading.value = false;
};


</script>
