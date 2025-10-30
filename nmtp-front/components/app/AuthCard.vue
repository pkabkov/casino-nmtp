<template>
    <div class="auth-card">
        <slot />
    </div>
</template>

<style scoped>
.auth-card {
    max-width: 380px;
    width: 100%;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>