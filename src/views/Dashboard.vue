<template>
    <section @paste="onPaste" @keyup.ctrl="onCtrl" class="section">
        <div class="container">
            <div class="box has-text-centered py-4">
                <div class="is-pulled-right">
                    AutoPost
                    <Toggle v-model="autoPost" :show-options="false"/>
                </div>
                <h1 class="is-size-3 is-size-1-desktop">Click + CTRL+V</h1>
                <h5 class="my-3">OR</h5>
                <button @click.prevent="onPaste" class="button mr-2"><i class="fa fa-paste mr-2"></i> PASTE</button>
                <button class="button"><i class="fa fa-pencil mr-2"></i> CREATE POST</button>
            </div>
            <h4 class="is-size-4 my-2">History</h4>
            <template v-for="(item, index) in items">
                <div :key="index" class="box has-background-dark py-3">
                    <div class="is-clearfix">
                        <small class="is-pulled-right"><i class="fad fa-spinner-third fa-spin mr-1"></i> adding data...</small>
                    </div>
                    <div>
                        <code class="has-background-dark" style="color: antiquewhite">{{item.text |
                            shorten }}</code>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    import Toggle from "../components/Toggle";

    const nl2br = (str, is_xhtml = false) => {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };

    export default {
        components: {Toggle},
        data() {
            return {
                autoPost: true,
                pasteData: "",
                items: [{
                    text: "Some text i copied some months back!"
                }]
            }
        },

        computed: {
            ...mapState(['user'])
        },

        filters: {
            shorten(text, to = 200) {
                const isLong = text.length > to;
                return text.substring(0, to) + (isLong ? '...' : '');
            }
        },

        methods: {
            onCtrl(evt) {
                console.log('on ctrl', evt);
                return true;
            },
            addPasteData() {
                const data = this.pasteData || "";
                if (data.length) {
                    this.items.unshift({
                        text: data,
                        html: nl2br(data)
                    });

                    if (this.autoPost) {
                        return this.$api.postToRoute('content.create', {
                            text: data
                        }, {});
                    }
                }

                console.log(this.items);
            },
            async onPaste() {
                this.pasteData = await window.navigator.clipboard.readText() || "";
                this.addPasteData();
                return true;
            }
        }
    }
</script>
