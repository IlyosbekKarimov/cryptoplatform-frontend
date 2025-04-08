<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div class="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
            <h2 class="text-3xl font-extrabold text-cyan-400 text-center mb-6 animate-pulse">
                🔐 Decrypt & Enter
            </h2>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">Username</label>
                    <input v-model="username" type="text" autocomplete="username"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        @input="validateUsername" required>
                    <p v-if="usernameError" class="text-red-400 text-sm">{{ usernameError }}</p>
                </div>

                <div>
                    <label class="block text-sm font-medium">Parol</label>
                    <input v-model="password" type="password" autocomplete="current-password"
                        class="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                        @input="validatePassword" required>
                    <p v-if="passwordError" class="text-red-400 text-sm">{{ passwordError }}</p>
                </div>

                <!-- Xatolik chiqishi uchun blok -->
                <p v-if="errorMessage" class="text-red-400 text-sm text-center">{{ errorMessage }}</p>

                <!-- Tugma login paytida disable bo‘ladi -->
                <button type="submit"
                    class="w-full cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-md font-bold shadow-md disabled:bg-gray-600 disabled:cursor-not-allowed"
                    :disabled="usernameError || passwordError || loading">
                    {{ loading ? "🔄 Yuklanmoqda..." : "🔓 Kirish" }}
                </button>
            </form>

            <p class="text-center text-gray-400 text-sm mt-4">
                Hisobingiz yo‘qmi? <router-link to="/register" class="text-cyan-400 hover:underline">Ro‘yxatdan
                    o‘tish</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore"; // Pinia store

const username = ref("");
const password = ref("");
const usernameError = ref("");
const passwordError = ref("");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();
const userStore = useUserStore();

// ✅ Username tekshirish
const validateUsername = () => {
  usernameError.value = username.value.length >= 3 ? "" : "Username kamida 3 ta belgidan iborat bo‘lishi kerak!";
};

// ✅ Parolni tekshirish
const validatePassword = () => {
  passwordError.value =
    password.value.length >= 6 ? "" : "Parol kamida 6 ta belgidan iborat bo‘lishi kerak!";
};

// ✅ Login qilish funksiyasi
const handleLogin = async () => {
  if (usernameError.value || passwordError.value) return;

  loading.value = true;
  errorMessage.value = "";

  const success = await userStore.login(username.value, password.value);
  if (success) {
    router.push("/dashboard");
  } else {
    errorMessage.value = "Username yoki parol noto‘g‘ri!";
  }
  loading.value = false;
};
</script>
