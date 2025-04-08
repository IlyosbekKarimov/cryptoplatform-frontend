<template>
    <footer class="bg-gray-900 text-white py-6">
        <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <!-- Logo va Matn -->
            <div class="mb-4 md:mb-0">
                <h2 class="text-2xl font-bold text-cyan-400">CryptoSolve</h2>
                <p class="text-gray-400 text-sm">Kriptografiya masalalarini hal qiling va kod yozing!</p>
            </div>

            <!-- Ijtimoiy tarmoqlar -->
            <div class="flex space-x-4">
                <a href="https://t.me/Karimov_I_G" class="text-gray-400 hover:text-cyan-400 transition">
                    <i class="fab fa-telegram-plane text-xl"></i>
                </a>
                <a href="https://github.com/IlyosbekKarimov" class="text-gray-400 hover:text-cyan-400 transition">
                    <i class="fab fa-github text-xl"></i>
                </a>
                <a href="https://www.linkedin.com/in/ilyas-karimov-48bbaa275" class="text-gray-400 hover:text-cyan-400 transition">
                    <i class="fab fa-linkedin text-xl"></i>
                </a>
            </div>
        </div>

        <!-- Copyright -->
        <div class="text-center text-gray-500 text-sm mt-4">
            © {{ new Date().getFullYear() }} CryptoSolve. Barcha huquqlar himoyalangan.
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
