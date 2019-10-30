<template>
    <div v-if="loading" class="has-text-centered mt-3 mb-3">
        <i class="fad fa-spin fa-spinner-third fa-2x"></i>
    </div>
    <div v-else>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'loading',
            event: 'updated'
        },

        props: {
            loading: {
                type: Boolean,
                default: true
            }
        },
    }
</script>
