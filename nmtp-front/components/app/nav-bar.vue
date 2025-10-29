<template>
    <nav class="nav-container">
        <ul>
            <li>
                <NuxtLink to="/">
                    Домой
                </NuxtLink>
            </li>
        </ul>
        <ul>
            <li>
                <NuxtLink :to="{name : 'login'}">
                    Логин
                </NuxtLink>
            </li>
        </ul>
    </nav>

</template>