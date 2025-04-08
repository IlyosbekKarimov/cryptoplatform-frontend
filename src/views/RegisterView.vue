<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div class="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 class="text-3xl font-extrabold text-cyan-400 text-center mb-6 animate-pulse">
                📝 Ro‘yxatdan o‘tish
            </h2>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Username</label>
                    <input v-model="username" type="text"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        @input="validateUsername" required>
                    <p v-if="usernameError" class="text-red-400 text-sm">{{ usernameError }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">To‘liq Ism</label>
                    <input v-model="fullName" type="text"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium">Guruh</label>
                    <input type="text" v-model="group"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        required>
                </div>

                <div>
                    <label class="block text-sm font-medium">Email</label>
                    <input v-model="email" type="email"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        @input="validateEmail" required>
                    <p v-if="emailError" class="text-red-400 text-sm">{{ emailError }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">Parol</label>
                    <input v-model="password" type="password" autocomplete="new-password"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        @input="validatePassword" required>
                    <p v-if="passwordError" class="text-red-400 text-sm">{{ passwordError }}</p>
                </div>

                <p v-if="errorMessage" class="text-red-400 text-sm text-center">{{ errorMessage }}</p>

                <button type="submit"
                    class="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-bold shadow-md disabled:bg-gray-600 disabled:cursor-not-allowed"
                    :disabled="usernameError || emailError || passwordError || loading">
                    {{ loading ? "🔄 Ro‘yxatdan o‘tyapti..." : "✅ Ro‘yxatdan o‘tish" }}
                </button>
            </form>

            <p class="text-center text-gray-400 text-sm mt-4">
                Allaqachon hisobingiz bormi? <router-link to="/login"
                    class="text-cyan-400 hover:underline">Kirish</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore"; // ✅ Pinia store ishlatiladi

const username = ref("");
const fullName = ref("");
const email = ref("");
const password = ref("");
const usernameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();
const group = ref('');

// ✅ Username tekshirish
const validateUsername = () => {
    usernameError.value = username.value.length >= 3 ? "" : "Username kamida 3 ta belgidan iborat bo‘lishi kerak!";
};

// ✅ Email tekshirish
const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailPattern.test(email.value) ? "" : "Noto‘g‘ri email formati!";
};

// ✅ Parol tekshirish
const validatePassword = () => {
    passwordError.value = password.value.length >= 6 ? "" : "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!";
};

// ✅ Ro‘yxatdan o‘tish funksiyasi
const handleRegister = async () => {
    if (usernameError.value || emailError.value || passwordError.value) return;

    loading.value = true;
    errorMessage.value = "";

    const success = await userStore.register(username.value, fullName.value, email.value, password.value, group.value);
    if (success) {
        router.push("/login");
    } else {
        errorMessage.value = "Ro‘yxatdan o‘tishda xatolik yuz berdi!";
    }
    loading.value = false;
};
</script>
