<script setup lang="ts">
import { defineProps } from 'vue';

const { title } = defineProps({
    title: {
        type: String,
        default: 'Iniciar sesión',
    },
    inputs: {
        type: Array,
        default: () => [],
    },
});

const submitHandler = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
    alert("Check out inspector console");
};

</script>

<template>
    <form method="post" @submit.prevent="submitHandler">
        <h2>
            {{ title }}
        </h2>
        <div v-for="(input, index) in inputs" :key="index" class="input-group">
            <input :id="'input-' + index" :name="input.name" :type="input.type" placeholder=" " required/>
            <label :for="'input-' + index">{{ input.label }}</label>
        </div>
        <slot/>
        <button type="submit">
            Enviar
        </button>
    </form>
</template>

<style>
/* Form */
form {
    display: flex;
    flex-direction: column;
    gap: 2.25rem;

    padding: 1rem 2rem 3rem 2rem;

    width: clamp(300px, 50%, 500px);
    
    border: 1px solid white;
    border-radius: .5rem;
    color: white;
}

form input {
    padding: 0.5rem;

    width: 100%;

    border: none;
    border-bottom: 1px solid white;
    caret-color: white;
    color: color-mix(in srgb, white 85%, black 15%);
    background-color: transparent;
    outline: none;
}

form > div {
    width: 100%;
    position: relative;
}

form > div label {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    font-size: .9rem;
    padding: 0.5rem;
    color: #e2e2e2;
    transition: top 0.1s ease-out, font-size 0.1s ease-in, color 0.1s ease-in;
    cursor: text;
}

form > div label:hover {
    color: color-mix(in srgb, white 85%, black 30%);
}

form > div input:focus ~ label,
form > div input:not(:placeholder-shown) ~ label{
  top: -1.3rem;
  font-size: .8rem;
  color: white;
}

form > div input:focus ~ label:hover,
form > div input:not(:placeholder-shown) ~ label:hover{
  cursor: pointer;
}

button[type="submit"] {
    position: relative;

    padding: 0.5rem 1rem;

    border: 1px solid white;
    border-radius: .25rem;
    color: inherit;
    background-color: transparent;
    
    overflow: hidden;
    cursor: pointer;
    transition: color 0.3s, background-color 0s ease 1s;
}

button[type="submit"]:hover {
    color: black;
    background-color: white;
}

button[type="submit"]::before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    
    width: 100%;
    height: 0;

    border-radius: 0% 0% 50% 50%;
    
    background-color: white;
    transition: height 0.3s;
}

button[type="submit"]:hover::before {
    height: 180%;
}

/* Children */
form a {
    font-size: .8rem;
    color: #9c9c9c;
    width: fit-content;
}
</style>