<template>
    <nav id="nav">
        <router-link to="/" id="logo_url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <router-link to="/adicionar">Adicionar</router-link>
        <router-link to="/despesas">Despesas</router-link>
    </nav>
</template>

<script setup>
defineProps(['logo', 'alt']);
</script>

<style scoped>
#nav {
  background: radial-gradient(circle at top left, #111827 0, #020617 45%, #020617 100%);
  border-bottom: 1px solid rgba(148, 163, 184, 0.35);
  padding: 0.85rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* Logo alinhado à esquerda */
#nav #logo_url {
  margin-right: auto;
  display: flex;
  align-items: center;
}

#logo {
  width: 40px;
  height: 40px;
}

/* Links de navegação como “botões fantasma” */
#nav a {
  position: relative;
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 500;
  color: #e5e7eb;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    transform 0.1s ease;
}

/* Efeito de hover */
#nav a:hover {
  background-color: rgba(148, 163, 184, 0.16);
  transform: translateY(-1px);
}

/* Estilo para o link ativo da rota (Vue Router adiciona .router-link-active) */
#nav a.router-link-active {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.45);
}

/* Responsivo básico */
@media (max-width: 600px) {
  #nav {
    padding: 0.75rem 1.25rem;
    gap: 0.75rem;
  }

  #nav a {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
}


</style>