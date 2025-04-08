import { defineStore } from "pinia";
import api from '../lib/axios';

export const useProblemStore = defineStore("problems", {
    state: () => ({
        problems: [], // Masalalar ro‘yxati
        loading: false,
        error: null,
    }),

    actions: {
        // 🚀 Backenddan masalalarni olish
        async fetchProblems() {
            this.loading = true;
            this.error = null;
            try {
                const response = await api.get("/api/problems/");
                this.problems = response.data; // 🔥 API dan kelgan ma'lumotlar
            } catch (error) {
                this.error = "❌ Masalalarni yuklashda xatolik!";
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
    },
});
