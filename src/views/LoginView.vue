<script lang="ts" setup>
import BasicForm from "@/components/BasicForm.vue";
</script>
<template>
    <main>
        <BasicForm title="Iniciar sesión" :inputs="[
            { 'label': 'Correo electrónico', 'type': 'email', 'name': 'email' },
            { 'label': 'Contraseña', 'type': 'password', 'name': 'password' }]">
            <a href="#">¿No estás registrado? Cree su cuenta aquí</a>
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