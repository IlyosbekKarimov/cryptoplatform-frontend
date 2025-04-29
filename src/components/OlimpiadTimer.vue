<template>
    <div class="olympiad-timer mb-6 p-4 rounded-lg shadow-md" :class="timerClass">
        <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="font-medium">{{ timerText }}</span>
            </div>
            <div class="text-sm">
                <span v-if="days > 0">{{ days }} kun </span>
                <span>{{ hours }} soat </span>
                <span>{{ minutes }} daqiqa </span>
                <span>{{ seconds }} soniya</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

const emit = defineEmits(['status-change']);

const now = ref(new Date());
const timer = ref(null);

// Vaqtni yangilash
const updateTime = () => {
    now.value = new Date();
    updateStatus();
};

// Kun/soat/daqiqa/soniya hisoblash
const timeLeft = computed(() => {
    if (now.value < props.startTime) {
        return props.startTime - now.value; // boshlanishiga qolgan vaqt
    } else if (now.value < props.endTime) {
        return props.endTime - now.value; // tugashiga qolgan vaqt
    }
    return 0;
});

const days = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)));
const hours = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
const minutes = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)));
const seconds = computed(() => Math.floor((timeLeft.value % (1000 * 60)) / 1000));

// Timer matni
const timerText = computed(() => {
    if (now.value < props.startTime) {
        return "Olimpiada boshlanishiga qolgan vaqt:";
    } else if (now.value < props.endTime) {
        return "Olimpiada tugashiga qolgan vaqt:";
    }
    return "Olimpiada tugadi";
});

// Timer klasslari
const timerClass = computed(() => {
    if (now.value < props.startTime) {
        return "bg-blue-50 text-blue-800";
    } else if (now.value < props.endTime) {
        return "bg-green-50 text-green-800";
    }
    return "bg-gray-100 text-gray-800";
});

// Olimpiada holatini yangilash
const updateStatus = () => {
    const status = {
        isActive: now.value >= props.startTime && now.value < props.endTime,
        message: '',
        class: '',
        timeUntilStart: '',
        timeSinceEnd: ''
    };

    if (now.value < props.startTime) {
        const diff = props.startTime - now.value;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        status.message = `Olimpiada ${props.startTime.toLocaleDateString()} sanada ${props.startTime.toLocaleTimeString()} da boshlanadi`;
        status.class = "info-message";
        status.timeUntilStart = `${days} kun ${hours} soat ${minutes} daqiqa`;
    } else if (now.value < props.endTime) {
        const diff = props.endTime - now.value;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        status.message = `Olimpiada davom etmoqda! ${hours} soat ${minutes} daqiqa qoldi`;
        status.class = "success-message";
    } else {
        const diff = now.value - props.endTime;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        status.message = `Olimpiada ${props.endTime.toLocaleDateString()} sanada ${props.endTime.toLocaleTimeString()} da tugadi`;
        status.class = "warning-message";
        status.timeSinceEnd = `${days} kun ${hours} soat o'tdi`;
    }

    emit('status-change', status);
};

// Komponent yuklanganda va o'chirilganda
onMounted(() => {
    timer.value = setInterval(updateTime, 1000);
    updateStatus();
});

onUnmounted(() => {
    clearInterval(timer.value);
});
</script>

<style scoped>
.olympiad-timer {
    transition: all 0.3s ease;
}
</style>