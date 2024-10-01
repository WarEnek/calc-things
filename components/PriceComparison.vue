<template>
  <div class="p-6 max-w-xl mx-auto space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900">Сравнение товаров</h1>

    <!-- Карточки -->
    <div class="space-y-4">
      <!-- Первая карточка -->
      <div :class="{'border-green-500': cheaper === 1 && allInputsValid, 'animate-pulse': cheaper === 1 && allInputsValid}" class="p-4 bg-white border rounded-lg shadow-md space-y-4">
        <h2 class="text-xl font-semibold">Товар 1</h2>
        <div>
          <label for="weight1" class="block text-sm font-medium text-gray-700">Вес (г):</label>
          <input 
            id="weight1" 
            v-model.number="weight1" 
            type="number" 
            placeholder="Введите вес" 
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="price1" class="block text-sm font-medium text-gray-700">Стоимость:</label>
          <input 
            id="price1" 
            v-model.number="price1" 
            type="number" 
            placeholder="Введите стоимость" 
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div v-if="pricePerGram1 !== null" class="text-sm font-semibold text-gray-700">
          Цена за 1 грамм: {{ pricePerGram1.toFixed(2) }} ₽
        </div>
      </div>

      <!-- Вторая карточка -->
      <div :class="{'border-green-500': cheaper === 2 && allInputsValid, 'animate-pulse': cheaper === 2 && allInputsValid}" class="p-4 bg-white border rounded-lg shadow-md space-y-4">
        <h2 class="text-xl font-semibold">Товар 2</h2>
        <div>
          <label for="weight2" class="block text-sm font-medium text-gray-700">Вес (г):</label>
          <input 
            id="weight2" 
            v-model.number="weight2" 
            type="number" 
            placeholder="Введите вес" 
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="price2" class="block text-sm font-medium text-gray-700">Стоимость:</label>
          <input 
            id="price2" 
            v-model.number="price2" 
            type="number" 
            placeholder="Введите стоимость" 
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div v-if="pricePerGram2 !== null" class="text-sm font-semibold text-gray-700">
          Цена за 1 грамм: {{ pricePerGram2.toFixed(2) }} ₽
        </div>
      </div>
    </div>

    <!-- Результат сравнения -->
    <div v-if="cheaper !== null && allInputsValid" class="text-center text-lg font-semibold text-gray-900">
      <p>Дешевле: Товар {{ cheaper }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Входные данные для двух карточек
const weight1 = ref(0);
const price1 = ref(0);
const weight2 = ref(0);
const price2 = ref(0);

// Вычисление стоимости за грамм для каждого товара
const pricePerGram1 = computed(() => (weight1.value > 0 ? price1.value / weight1.value : null));
const pricePerGram2 = computed(() => (weight2.value > 0 ? price2.value / weight2.value : null));

// Логика определения более дешевого товара
const cheaper = ref(null);

// Проверка, что все инпуты заполнены (все значения больше 0)
const allInputsValid = computed(() => weight1.value > 0 && price1.value > 0 && weight2.value > 0 && price2.value > 0);

watch([pricePerGram1, pricePerGram2], () => {
  if (allInputsValid.value) {
    if (pricePerGram1.value < pricePerGram2.value) {
      cheaper.value = 1;
    } else if (pricePerGram2.value < pricePerGram1.value) {
      cheaper.value = 2;
    } else {
      cheaper.value = null;  // Если цены одинаковы
    }
  }
});
</script>

<style scoped>
/* Стиль для анимации */
.animate-pulse {
  animation: pulse 1s 2;
}

@keyframes pulse {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
