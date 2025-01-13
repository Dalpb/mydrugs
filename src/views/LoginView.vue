<script lang="ts" setup>
import BasicForm from "@/components/BasicForm.vue";
import { RouterLink } from 'vue-router';
</script>
<template>
    <main>
        <basic-form title="Iniciar sesión" :inputs="[
            { 'label': 'Correo electrónico', 'type': 'email', 'name': 'email' },
            { 'label': 'Contraseña', 'type': 'password', 'name': 'password' }]">
            <router-link to="/register">¿No estás registrado? Cree su cuenta aquí</router-link>
        </basic-form>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;
    padding-top: 4rem;
}
</style>