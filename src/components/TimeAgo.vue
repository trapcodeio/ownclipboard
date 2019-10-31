<template>
    <span @click.prevent="toogleDate" v-if="toggle" :title="computedDate" class="is-clickable">{{date}}</span>
    <span @click.prevent="toogleDate" v-else :title="date" class="is-clickable">{{computedDate}}</span>
</template>

<script>
    export default {
        props: {
            date: {
                type: String,
                default: new Date().toISOString()
            },
            format: {
                type: String,
                default: 'timeAgo'
            },
            dateFormat: {
                type: String,
                default: 'YYYY-MM-DD H:mm:ss'
            }
        },
        data() {
            return {
                toggle: false
            }
        },
        computed: {
            computedDate() {
                if (this.format === 'timeAgo') {
                    return moment(this.date, this.dateFormat).fromNow();
                } else {
                    return moment(this.date, this.dateFormat).format(this.format);
                }
            }
        },
        methods: {
            toogleDate() {
                this.toggle = !this.toggle;
            }
        }
    }
</script>
