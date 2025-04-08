import { defineStore } from "pinia";
import api from '../lib/axios';

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    errorMessage: "",
  }),
  actions: {
    async register(username, fullName, email, password, group) {
      try {
        const response = await api.post("/api/users/register/", {
          username,
          full_name: fullName,  // ✅ Backend modeliga mos ravishda "full_name"
          email,
          password,
          group,
        });

        return true; // ✅ Ro‘yxatdan o‘tish muvaffaqiyatli bo‘ldi
      } catch (error) {
        this.errorMessage = "Ro‘yxatdan o‘tishda xatolik!";
        return false;
      }
    },

    async login(username, password) {
      try {
        const response = await api.post("/api/users/login/", {
          username,  // ✅ API-ga username yuboramiz
          password,
        });

        const { token, user } = response.data;
        this.user = user;
        this.token = token;

        // Tokenni saqlash
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;

        return true;
      } catch (error) {
        this.errorMessage = "Login amalga oshmadi!";
        return false;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    },
  },
});
