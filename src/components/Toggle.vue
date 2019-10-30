<template>
    <div class="is-inline" style="margin-left: 10px">
        <template v-if="showOptions">
            <template v-if="isYes">
                <small @click.prevent="toggleIsYes" class="is-clickable has-text-grey-light">{{no}}</small>
                <strong class="has-text-grey-light" style="margin-left: 3px; margin-right: 3px">/</strong>
                <small :class="activeClass"><b>{{yes}}</b></small>
            </template>

            <template v-if="!isYes">
                <small :class="activeClass"><b>{{no}}</b></small>
                <strong class="has-text-grey-light" style="margin-left: 3px; margin-right: 3px">/</strong>
                <small @click.prevent="toggleIsYes" class="is-clickable has-text-grey-light">{{yes}}</small>
            </template>
        </template>

        <span v-if="isLoading">
            <i class="fad fa-spinner-third fa-spin" :style="iconStyle"></i>
        </span>
        <a v-else tabindex="-1"
           :style="(showOptions?'margin-left: 15px; ':'') + 'text-decoration: none; top: 6px; position: relative'"
           @click.prevent="toggleIsYes">
            <span v-if="isYes" class="icon">
                <i :class="withActiveClass('fas fa-toggle-on')" :style="iconStyle"></i>
            </span>
            <span v-else class="icon">
                <i class="fal fa-toggle-off has-text-grey-light" :style="iconStyle"></i>
            </span>
        </a>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'enabled',
            event: 'on-switch'
        },
        props: {
            enabled: {
                "default": false,
                type: [Boolean, Number]
            },
            onSwitch: {
                "default": function () {
                    return true;
                },
                type: Function
            },
            name: {
                default: '',
                type: [String, Number]
            },
            yes: {
                "default": 'Yes',
                type: String
            },
            no: {
                "default": 'No',
                type: String
            },
            size: {
                "default": 30,
                type: Number
            },
            activeClass: {
                "default": 'has-text-success',
                type: String
            },
            showOptions: {
                default: true,
                type: Boolean
            },
            load: {
                default: false,
                type: Boolean
            }
        },
        data: function () {
            return {
                isYes: false,
                watchIsYes: false,
                isLoading: false
            };
        },
        mounted: function () {
            return this.isYes = this.enabled;
        },
        computed: {
            iconStyle: function () {
                return 'font-size: ' + this.size + 'px';
            }
        },
        watch: {
            enabled() {
                this.isYes = this.enabled
            },
        },
        methods: {
            withActiveClass: function (classList) {
                return classList.trim() + ' ' + this.activeClass;
            },
            stopLoading() {
                this.isLoading = false;
            },
            toggleIsYes() {
                if (this.load) this.isLoading = true;
                const isYes = !this.isYes;
                const shouldEmit = this.onSwitch(isYes, {
                    name: this.name,
                    stop: () => {
                        setTimeout(() => {
                            this.stopLoading();
                        }, 200);
                    }
                });
                if (shouldEmit !== false) {
                    this.isYes = isYes;
                    this.$emit('on-switch', this.isYes);
                }
            }
        }
    };
</script>

<style scoped>
    a:focus {
        outline: none;
    }
</style>
