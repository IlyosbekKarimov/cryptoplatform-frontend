import { defineStore } from "pinia";
import api from '../lib/axios';
import { useUserStore } from "./userStore"; // ✅ Foydalanuvchi store-ni import qilish

export const useLeaderboardStore = defineStore("leaderboard", {
    state: () => ({
        leaderboard: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchLeaderboard() {
            this.loading = true;
            this.error = null;

            const userStore = useUserStore(); // ✅ User store
            const token = userStore.token; // ✅ Token olish

            try {
                const response = await api.get("/api/leaderboard/", {
                    headers: { Authorization: `Token ${token}` } // ✅ Token qo‘shish
                });
                this.leaderboard = response.data; // 🔥 Ma’lumotlarni saqlash
            } catch (error) {
                console.error("❌ Leaderboard yuklashda xatolik:", error);
                this.error = "Leaderboard yuklab bo‘lmadi!";
            } finally {
                this.loading = false;
            }
        }
    }
});
