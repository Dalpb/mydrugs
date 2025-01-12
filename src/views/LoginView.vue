<script lang="ts" setup>
import BasicForm from "@/components/BasicForm.vue";
import { RouterLink } from 'vue-router';
</script>
<template>
    <main>
        <BasicForm title="Iniciar sesión" :inputs="[
            { 'label': 'Correo electrónico', 'type': 'email', 'name': 'email' },
            { 'label': 'Contraseña', 'type': 'password', 'name': 'password' }]">
            <RouterLink to="/register">¿No estás registrado? Cree su cuenta aquí</RouterLink>
        </BasicForm>
    </main>
</template>

<style scoped>
main {
    display: flex;
    justify-content: center;

    padding-top: 4rem;
}
</style>