<script lang="ts" setup>
import BasicForm from "@/components/BasicForm.vue";
import { RouterLink } from 'vue-router';
</script>
<template>
    <main>
        <BasicForm title="Registrar" :inputs="[
            { 'label': 'Nombre de usuario', 'type': 'text', 'name': 'username' },
            { 'label': 'Correo electrónico', 'type': 'email', 'name': 'email' },
            { 'label': 'Contraseña', 'type': 'password', 'name': 'password' },
            { 'label': 'Confirmar contraseña', 'type': 'password', 'name': 'confirm-password' },]">
            <RouterLink to="/login">¿Ya tienes una cuenta? Inicie sesión aquí</RouterLink>
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