<script lang="ts" setup>
import BasicForm from "@/components/BasicForm.vue";
import { RouterLink } from 'vue-router';
</script>
<template>
    <main>
        <basic-form title="Registrar" :inputs="[
            { 'label': 'Nombre de usuario', 'type': 'text', 'name': 'username' },
            { 'label': 'Correo electrónico', 'type': 'email', 'name': 'email' },
            { 'label': 'Contraseña', 'type': 'password', 'name': 'password' },
            { 'label': 'Confirmar contraseña', 'type': 'password', 'name': 'confirm-password' },]">
            <router-link to="/login">¿Ya tienes una cuenta? Inicie sesión aquí</router-link>
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