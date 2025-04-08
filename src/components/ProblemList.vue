<template>
    <div v-if="problemStore.problems.length" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="problem in problemStore.problems" :key="problem.id"
            class="p-6 bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 rounded-xl shadow-lg hover:shadow-xl 
              hover:from-gray-600 hover:to-gray-700 transition duration-300 transform hover:-translate-y-1 cursor-pointer"
            @click="selectProblem(problem.id)">

            <h3 class="text-xl font-bold text-white mb-2">{{ problem.title }}</h3>
            <p class="text-gray-300">
                <span class="font-semibold">Daraja: </span>
                <span :class="difficultyClass(problem.difficulty)">
                    {{ problem.difficulty }}
                </span>
            </p>
            <p class="mt-2 text-sm text-green-400 font-medium">
                🏆 Points: <span class="font-bold">{{ problem.points }}</span>
            </p>
        </div>
    </div>
    <p v-else class="text-center text-gray-400">⏳ Masalalar yuklanmoqda...</p>
</template>

<script setup>
import { useProblemStore } from '../stores/problemStore';

const problemStore = useProblemStore();

defineProps({
    selectProblem: Function
});

const difficultyClass = (difficulty) => ({
    "Oson": "text-green-400",
    "O'rta": "text-yellow-400",
    "Murakkab": "text-orange-400",
    "Juda qiyin": "text-red-400",
    "Professional": "text-purple-400"
}[difficulty] || "text-white");
</script>
