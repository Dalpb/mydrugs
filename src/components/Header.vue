<script setup lang="ts">
import { Bars3Icon} from '@heroicons/vue/16/solid';
import { changeFirstChildColor } from '@/utils/colorHandlers';
import { RouterLink } from 'vue-router';
import Button from '@/components/Button.vue';

const getNewColor =(e:Event)=>{
    const color =window.document.documentElement.style.getPropertyValue("--main-color");
    changeFirstChildColor(e,color);
}


</script>

<template>
    <header class="header">
        <router-link to="/login" >
            <Button
            add-class="btn-login"
            :onmouseleave="e => changeFirstChildColor(e,'white')"
            :onmouseover="getNewColor"
            class="btn-log" >
                Login
            </Button>
        </router-link>
        <nav class="navbar">
            <ul class="nav-list">
                <li>
                    <router-link to="/shop" active-class="active">SHOP</router-link>
                </li>
                <li>
                    <router-link to="/faq" active-class="active">FAQ</router-link>
                </li>
                <li class="logo">
                    <router-link to="/">
                        <img src="/images/mydrugslogo.png">
                    </router-link>
                </li>
                <li>
                    <router-link to="/safety" active-class="active">SAFETY</router-link>
                </li>
                <li>
                    <router-link to="/contact" active-class="active">CONTACT</router-link>
                </li>
            </ul>
        </nav>
        <Bars3Icon class="shop-car"></Bars3Icon>
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
    a{
        align-self: center;
    }
    .btn-login {
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
        border: 1px solid white;
        border-radius: 1.5rem ;
        cursor: pointer;
        background-color: transparent;
        transition: background-color ease-in-out .15s, color ease-in-out .15s;
    }
    .btn-login:hover {
        background-color: white;
        color: var(--main-color);
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
 
    .active::after{
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1.5px;
        background-color: white;
        width: 100%;
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

        .btn-log,a{
            display: none;
        }
        .nav-list > li {
            display: none;
        }
        .nav-list > .logo{
            display: inline;
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