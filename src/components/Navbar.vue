<template>
    <nav class="bg-gray-900 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <!-- 🔹 Logo va Sahifalar -->
            <div class="flex items-center gap-6">
                <router-link to="/" class="text-2xl font-bold text-cyan-400">CryptoSolve</router-link>

                <!-- 🔹 Tablar (yo‘nalish emas, query orqali ishlaydi) -->
                <div class="flex gap-4">
                    <button @click="setTab('problems')" :class="tabClass('problems')">Masalalar</button>
                    <button @click="setTab('leaderboard')" :class="tabClass('leaderboard')">Leaderboard</button>
                </div>
            </div>

            <!-- 🔹 Login / Register / Profile -->
            <div>
                <template v-if="!user">
                    <router-link to="/login"
                        class="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md mr-2">Kirish</router-link>
                    <router-link to="/register"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">Ro‘yxatdan o‘tish</router-link>
                </template>
                <template v-else>
                    <div class="flex items-center gap-4">
                        <span class="text-cyan-300">{{ user.username }}</span>
                        <button @click="logout"
                            class="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md">Chiqish</button>
                    </div>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const user = computed(() => userStore.user);

const router = useRouter();
const route = useRoute();

// **Hozirgi Tabni olish**
const currentTab = computed(() => route.query.tab || 'problems');

// **Tabni o‘zgartirish (Router Query orqali)**
const setTab = (tab) => {
    router.push({ query: { tab } });
};

// **Aktiv tab uchun class**
const tabClass = (tab) => {
    return `px-4 py-2 rounded-md ${currentTab.value === tab ? 'bg-cyan-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}`;
};

const logout = () => {
    userStore.logout();
};
</script>
