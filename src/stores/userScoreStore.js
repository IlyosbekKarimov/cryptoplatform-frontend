import { defineStore } from "pinia";
import api from "../lib/axios";
import { useUserStore } from "./userStore";

export const useUserScoreStore = defineStore("userScore", {
    state: () => ({
        scores: {},
        loading: false,
        error: null,
    }),

    actions: {
        // 🔥 **Leaderboardni olish**
        async fetchScores() {
            const userStore = useUserStore();

            if (!userStore.token) {
                console.error("🚨 fetchScores() xatosi: Token yo‘q!");
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const response = await api.get("/api/leaderboard/", {
                    headers: { Authorization: `Token ${userStore.token}` },
                });

                console.log("📌 Leaderboard yangilandi:", response.data);

                this.scores = response.data.reduce((acc, user) => {
                    acc[user.username] = user.score;
                    return acc;
                }, {});
            } catch (error) {
                this.error = "❌ Ballarni yuklashda xatolik!";
                console.error("🚨 fetchScores() xatosi:", error.response?.data || error.message);
            } finally {
                this.loading = false;
            }
        },

        // ✅ **Ball qo‘shish va leaderboardni yangilash**
        async addScore(problemId, userAnswer) {
            const userStore = useUserStore();

            if (!userStore.token) {
                console.error("🚨 addScore() xatosi: Token yo‘q!");
                return;
            }

            try {
                const response = await api.post(
                    "api/submissions/",
                    { problem_id: problemId, answer: userAnswer },
                    { headers: { Authorization: `Token ${userStore.token}` } }
                );

                console.log("📌 Yangi ball qo‘shildi:", response.data);

                if (response.data.correct) {
                    await this.fetchScores(); // 🔄 Leaderboardni yangilash
                }
            } catch (error) {
                console.error("❌ addScore() xatosi:", error.response?.data || error.message);
            }
        },
    },
});
