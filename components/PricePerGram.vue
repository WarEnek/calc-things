<template>
  <div class="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
    <h1 class="text-xl font-semibold text-gray-900">Стоимость продукта</h1>

    <!-- Первая строка: Вес и Единица измерения -->
    <div class="flex space-x-4">
      <div class="flex-1">
        <label for="weight" class="block text-sm font-medium text-gray-700">Вес продукта:</label>
        <input 
          id="weight" 
          v-model.number="weight" 
          type="number" 
          placeholder="Введите вес" 
          class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="w-32">
        <label for="unit" class="block text-sm font-medium text-gray-700">Единица:</label>
        <select 
          id="unit" 
          v-model="selectedUnit" 
          class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="grams">Граммы</option>
          <option value="kilograms">Килограммы</option>
        </select>
      </div>
    </div>

    <!-- Вторая строка: Стоимость и Валюта -->
    <div class="flex space-x-4">
      <div class="flex-1">
        <label for="price" class="block text-sm font-medium text-gray-700">Стоимость:</label>
        <input 
          id="price" 
          v-model.number="price" 
          type="number" 
          placeholder="Введите стоимость" 
          class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div class="w-32">
        <label for="currency" class="block text-sm font-medium text-gray-700">Валюта:</label>
        <select 
          id="currency" 
          v-model="selectedCurrency" 
          class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option v-for="(symbol, currency) in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
    </div>

    <!-- Вывод результата -->
    <div v-if="pricePerUnit >= 0" class="text-lg font-semibold text-gray-900">
      <p>Стоимость 1 {{ selectedUnitText }}: {{ pricePerUnit.toFixed(2) }} {{ selectedCurrencySymbol }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Значения для веса и цены
const weight = ref(0);
const price = ref(0);

// Список валют
const currencies = ref({
  'RUB': '₽',
  'USD': '$',
  'EUR': '€',
});

// Выбранная валюта
const selectedCurrency = ref('RUB');

// Символ выбранной валюты
const selectedCurrencySymbol = computed(() => currencies.value[selectedCurrency.value]);

// Список единиц измерения
const selectedUnit = ref('grams');

// Текст для отображения единиц (граммы или килограммы)
const selectedUnitText = computed(() => {
  return selectedUnit.value === 'grams' ? 'грамма' : 'килограмма';
});

// Вычисляемая стоимость на выбранную единицу (грамм или килограмм)
const pricePerUnit = computed(() => {
  if (weight.value > 0) {
    if (selectedUnit.value === 'grams') {
      return price.value / weight.value;  // Цена за грамм
    } else {
      return price.value / (weight.value / 1000);  // Цена за килограмм
    }
  }
  return 0;
});
</script>

<style scoped>
/* Можно добавить дополнительные стили для более кастомного UI */
</style>
