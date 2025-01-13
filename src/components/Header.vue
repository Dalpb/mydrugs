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
        :onmouseleave="e => changeFirstChildColor(e,'white')"
        class="btn-log">
            Login
        </Button>
        <nav class="navbar">
            <ul class="nav-list">
                <li>
                    <router-link to="/shop">SHOP</router-link>
                </li>
                <li>
                    <router-link to="/faq">FAQ</router-link>
                </li>
                <li class="logo">
                    <router-link to="/">
                        <img src="/images/mydrugslogo.png">
                    </router-link>
                </li>
                <li>
                    <router-link to="/safety">SAFETY</router-link>
                </li>
                <li>
                    <router-link to="/contact">CONTACT</router-link>
                </li>
            </ul>
        </nav>
            <bars-3-icon class="shop-car"></bars-3-icon>
    </header>

</template>
<style scoped lang="css">
    .header{
        height: 5rem;
        padding:1.2rem 1rem 0;
        display: flex;
        justify-content: space-between;
        font-family: "Roboto",sans-serif;
        font-weight: 800;
        color:white;
    }
    .btn-login,.shop-car{
        align-self: center;
    }
    .shop-car{
        height: 100%;
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
    .btn-log{
        border-radius: 3px;
    }
    @media screen and (max-width: 1100px){
        .nav-list{
         justify-content: space-between;
        }
        .btn-log{
            display: none;
        }
        .nav-list > li {
            display: none;
        }
        .nav-list > .logo{
            display: block;
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