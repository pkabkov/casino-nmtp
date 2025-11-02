<template>
    <nav class="nav-container">
        <div class="links">
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
        </div>
        <AppUserIcon />
    </nav>

</template>

<style scoped>
    .links{
        display: flex;
        justify-content: center;
    }
</style>