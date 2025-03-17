<template>
  <div class="custom-chatbot">
    <div class="messages" ref="messagesContainer">
      <div v-for="(message, index) in messages" :key="index" 
           :class="['message', message.role]">
        {{ message.content }}
      </div>
    </div>
    <div class="input-area">
      <input
        type="text"
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="Digite sua pergunta..."
      />
      <button @click="sendMessage" :disabled="isLoading">
        {{ isLoading ? 'Enviando...' : 'Enviar' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const userInput = ref('');
const messages = ref([{ role: 'assistant', content: 'Olá! Como posso ajudar você hoje?' }]);
const isLoading = ref(false);
const messagesContainer = ref(null);

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  // Adiciona a mensagem do usuário
  messages.value.push({ role: 'user', content: userInput.value });
  
  // Limpa o input e marca como carregando
  const query = userInput.value;
  userInput.value = '';
  isLoading.value = true;
  
  try {
    // Substitua pela URL correta do seu modelo no Hugging Face
    const response = await fetch('https://api-inference.huggingface.co/models/giseldo-chatbot-ifal-regimento', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Se necessário, adicione a chave API do Hugging Face
        // 'Authorization': 'Bearer seu_token_aqui'
      },
      body: JSON.stringify({ inputs: query })
    });
    
    const data = await response.json();
    messages.value.push({ role: 'assistant', content: data[0].generated_text });
  } catch (error) {
    console.error('Erro ao obter resposta:', error);
    messages.value.push({ role: 'assistant', content: 'Desculpe, tive um problema ao processar sua pergunta.' });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(messages, scrollToBottom);
</script>

<style scoped>
.custom-chatbot {
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #f9f9f9;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 80%;
  word-break: break-word;
}

.message.user {
  background: #e1f5fe;
  align-self: flex-end;
}

.message.assistant {
  background: white;
  align-self: flex-start;
}

.input-area {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #ddd;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  margin-right: 10px;
}

button {
  padding: 10px 15px;
  background: #4169e1;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:disabled {
  background: #b0c4de;
}
</style>
