<template>
    <div class="min-h-screen flex justify-center bg-gray-800 text-white">
        <div class="container mx-auto mt-6 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-5xl">
            <h2 class="text-3xl font-bold text-cyan-400 text-center mb-6">🏆 Leaderboard</h2>

            <div v-if="loading" class="text-center text-gray-400">⏳ Yuklanmoqda...</div>
            <div v-else-if="error" class="text-center text-red-400">{{ error }}</div>
            <div v-else>
                <table class="w-full border-collapse border border-gray-700 rounded-lg overflow-hidden">
                    <thead class="bg-gray-700 text-white">
                        <tr>
                            <th class="py-2 px-4 border border-gray-600">#</th>
                            <th class="py-2 px-4 border border-gray-600 text-left">Foydalanuvchi</th>
                            <th class="py-2 px-4 border border-gray-600 text-left">Guruh</th>
                            <th class="py-2 px-4 border border-gray-600">✅ Yechilgan</th>
                            <th class="py-2 px-4 border border-gray-600">🏆 Ball</th>
                            <th class="py-2 px-4 border border-gray-600">⏳ Oxirgi Yechim</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in leaderboard" :key="user.id"
                            class="hover:bg-gray-700 transition duration-200"
                            :class="{ 'bg-cyan-500 text-white font-bold': index === 0 }">
                            <td class="py-2 px-4 text-center border border-gray-600">{{ index + 1 }}</td>
                            <td class="py-2 px-4 border border-gray-600">{{ user.username }}</td>
                            <td class="py-2 px-4 border border-gray-600">{{ user.group }}</td>
                            <td class="py-2 px-4 text-center border border-gray-600">{{ user.solved_problems }}</td>
                            <td class="py-2 px-4 text-center border border-gray-600">{{ user.total_score }}</td>
                            <td class="py-2 px-4 text-center border border-gray-600 text-sm">
                                {{ formatTime(user.last_submission_time) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useLeaderboardStore } from "../stores/leaderboardStore";

const leaderboardStore = useLeaderboardStore();

const leaderboard = computed(() => leaderboardStore.leaderboard);
const loading = computed(() => leaderboardStore.loading);
const error = computed(() => leaderboardStore.error);

onMounted(() => {
    leaderboardStore.fetchLeaderboard();
});

// ⏳ Vaqtni format qilish
const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
};
</script>
