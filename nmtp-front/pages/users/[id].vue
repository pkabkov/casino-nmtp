<script lang="ts" setup>
    const route = useRoute();
    const { data: task, error, status } = await useFetch(`/api/users/${route.params.id}`, {
	lazy: true,
});

</script>

<template>
    <h2>Окно пользователя</h2>
</template>