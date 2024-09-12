<template>
    <div>
        Открыто: {{ isOpen }}
    </div>
</template>
<script setup lang="ts">
import { usePopup } from '~/сomposable/Popup';


const { isOpen } = usePopup()


</script>
<style scoped="scss"></style>