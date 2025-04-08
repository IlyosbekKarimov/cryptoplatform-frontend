<template>
    <div class="min-h-screen flex justify-center items-start bg-gray-900 text-white">
        <div class="container mx-auto mt-6 p-6 bg-gray-800 rounded-lg shadow-md w-full max-w-6xl">
            <component :is="currentComponent" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Sahifa komponentlari
import Problems from '../components/Problems.vue';
import Leaderboard from '../components/Leaderboard.vue';

const route = useRoute();

// Hozirgi sahifa (tab) komponenti
const currentComponent = computed(() => {
    const tab = route.query.tab || 'problems'; // <-- Default tab qo‘shildi
    switch (tab) {
        case 'leaderboard':
            return Leaderboard;
        default:
            return Problems;
    }
});
</script>
