<script setup lang="ts">
import { Bars3Icon,ShoppingCartIcon,ShoppingBagIcon } from '@heroicons/vue/16/solid';

import { changeFirstChildColor } from '@utils/colorHandlers';
import { RouterLink } from 'vue-router';
import Button from '@components/Button.vue';
const getNewColor =(e:Event)=>{
    const color =window.document.documentElement.style.getPropertyValue("--main-color");
    changeFirstChildColor(e,color);
}

</script>

<template>
    <header class="header">
        <Button
        add-class="btn-login"
        :onmouseover="getNewColor"
        :onmouseleave="e => changeFirstChildColor(e,'white')">
            Login
        </Button>
        <nav class="navbar">
            <ul class="nav-list">
                <li>
                    <RouterLink to="/shop">SHOP</RouterLink>
                </li>
                <li>
                    <RouterLink to="/faq">FAQ</RouterLink>
                </li>
                <li>
                    <RouterLink to="/">
                        <img src="/images/mydrugslogo.png">
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/safety">SAFETY</RouterLink>
                </li>
                <li>
                    <RouterLink to="/contact">CONTACT</RouterLink>
                </li>
            </ul>
        </nav>
            <ShoppingCartIcon class="shop-car"></ShoppingCartIcon>
    </header>

</template>
<style scoped lang="css">
    a{
        font-weight: 800;
        text-decoration: none;
        color:white;
    }
    .header{
        height: 5rem;
        color:white;
        padding-top: 1.2rem;
        padding-left:1rem ;
        padding-right:1rem ;
        display: flex;
        justify-content: space-between;
        font-family: "Roboto",sans-serif;
    }
    .btn-login,.shop-car{
        align-self: center;
    }
    .shop-car{
        height: 60%;
        cursor: pointer;
    }
    .navbar{
        width: 40%;
        height: 100%;
        max-width: 100rem;
    }
    .nav-list{
        padding: 0;
        height: 100%;
        margin: 0;
        display: flex;
        justify-content: space-evenly;
        gap: 2rem;
    }
    .nav-list li{
        position: relative;
        align-self: center;
        list-style: none;  
    }
    .nav-list li:nth-child(3){
        height: 100%;     
    }
    .nav-list li:nth-child(3) a{
        height: 100%;
        display: flex;
    }
    .nav-list li::after{
        content: "";
        width: 0;
        height: 1.5px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: white;
        transition: width ease-in-out .3s;
    }
    .nav-list li:hover::after{
        width: 100%;
    }
    @media screen and (max-width: 1100px){
        .navbar{
            display: none;
        }
        .header{
            height: 4rem;
        }
    }
</style>
<!-- 
-------------
   ( (
    ) )
  ........
  |      |]   DALPB
  \      /  
   `----'    
-------------
-->