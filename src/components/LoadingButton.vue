<template>
    <button @click.prevent="onClick" :disabled="isLoading" :class="computedButtonClass">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        model: {
            prop: 'loading',
            event: 'on-switch'
        },

        props: {
            on: {
                type: String,
                default: ''
            },
            off: {
                type: String,
                default: ''
            },
            click: {
                type: Function,
                default: () => () => {
                },
            },
            loading: {
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                isLoading: false,
                buttonIsDisabled: false,
            }
        },

        computed: {
            computedButtonClass() {
                let $class = "button ";
                let on = this.on;
                let off = this.off;

                if (off.length && !on.length) {
                    on = off;
                }
                if (this.isLoading) {
                    $class += on + " is-loading";
                } else {
                    $class += this.off;
                }

                return $class;
            }
        },

        mounted() {
            if (this.loading) {
                this.startLoading();
            }
        },

        methods: {
            startLoading() {
                this.isLoading = true;
                this.buttonIsDisabled = true;
            },

            stopLoading() {
                this.isLoading = false;
                this.buttonIsDisabled = false;
            },

            onClick() {
                if (!this.isLoading) {
                    this.startLoading();
                    return this.click(this);
                }
            }
        }
    }
</script>
