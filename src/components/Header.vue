<script setup lang="ts">
</script>

<template>
    <header class="header">
        <button class="login">
            <a href="#">LOGIN</a>
        </button>
        <nav class="navbar">
            <ul class="nav-list">
                <li>
                    <a href="#">SHOP</a>
                </li>
                <li>
                    <a href="#">FAQ</a>
                </li>
                <li>
                    <a href="/">
                        <img src="/images/mydrugslogo.png">
                    </a>
                </li>
                <li>
                    <a href="">SAFETY</a>
                </li>
                <li>
                    <a href="">CONTACT</a>
                </li>
            </ul>
        </nav>
    </header>

</template>
<style scoped lang="css">
    a{
        font-weight: 800;
        text-decoration: none;
        color:white;

    }
    .header{
        position: sticky;
        height: 4rem;
        padding-top: 1.2rem;
        display: flex;
        justify-content: center;
        font-family: sans-serif;
    }
    .login{
        position: absolute;
        top:2rem;
        left: 3rem;        
    }
    .navbar{
        width: 100%;
        height: 100%;
        max-width: 100rem;
    }
    .nav-list{
        height: 100%;
        margin: 0;
        padding: 0 20rem;
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
        color: white;
        transition: width ease-in-out .3s;
    }
    .nav-list li:hover::after{
        width: 100%;
    }

    .login{
        border: 1px white solid;
        padding: 8px 5px;
        font-size: large;
        background-color: transparent;
        transition-property: background-color;
        transition-timing-function: ease-in-out;
        transition-duration: .2s;
    }
    .login a{
        font-weight: 600;
        transition-property: color;
        transition-timing-function: ease-in-out;
        transition-duration: .2s;
    }
    .login:hover{
        background-color: white;
    }
    .login:hover a{
        color:black;
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