<template>
  <div class="main-container" id="home">
    <h1>Minhas Finanças</h1>
    <p>
      Seu controle de finanças pessoais, de forma simples e intuitiva para voce!
    </p>
    <router-link to="/adicionar" class="btn-adicionar"
      >Adicionar Despesa</router-link
    >
  </div>
</template>

<script setup></script>

<style scoped>
#home {
  min-height: calc(70vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;   /* centraliza horizontal */
  justify-content: center; /* centraliza vertical */
  text-align: center;
  padding: 2rem 1rem;
  gap: 1.25rem;
}

#home h1 {
  font-size: 2.5rem;
}

#home p {
  max-width: 520px;
  font-size: 1.1rem;
}

.btn-adicionar {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 999px;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.45);
  transition:
    background-color 0.2s ease,
    transform 0.1s ease,
    box-shadow 0.2s ease;
}

.btn-adicionar:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.6);
}
</style>
