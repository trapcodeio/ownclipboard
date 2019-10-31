<template>
    <section @paste="onPaste" @keyup.ctrl="onCtrl" class="section">
        <div class="container">
            <div class="box has-text-centered py-4 has-background-dark">
                <!--<div class="is-pulled-right">
                    AutoPost
                    <Toggle v-model="autoPost" :show-options="false"/>
                </div>-->
                <h1 class="is-size-3 is-size-1-desktop">Click + CTRL+V</h1>
                <h5 class="my-3">OR</h5>
                <button @click.prevent="onPaste" class="button mr-2"><i class="fa fa-paste mr-2"></i> PASTE</button>
                <!--                <button class="button"><i class="fa fa-pencil mr-2"></i> CREATE POST</button>-->
            </div>
            <template v-if="loaded">
                <h4 class="is-size-4 my-2">History</h4>
                <template v-for="(item, index) in items">
                    <div :key="index" class="box has-background-dark py-3">
                        <div class="is-clearfix">
                            <div class="is-pulled-left">
                            </div>
                            <div class="is-pulled-right">
                                <small>({{item.content.length}})</small>
                                -
                                <small v-if="item.is_adding"><i
                                        class="fad fa-spinner-third fa-spin mr-1"></i> adding...</small>
                                <small v-else>
                                    <TimeAgo :date="item.created_at"/>
                                </small>
                            </div>

                        </div>
                        <div>
                            <code class="has-background-dark" style="color: antiquewhite">
                                <a v-if="item.type==='url'" target="_blank" :href="item.content" class="has-text-success">{{item.content
                                    | shorten }}</a>
                                <span v-else>{{item.content | shorten }}</span>
                            </code>
                        </div>
                    </div>
                </template>
                <Pagination v-model="page" :data="contents"/>
            </template>
            <PreLoader class="mt-5" v-else/>
        </div>
    </section>
</template>

<script>
    import {mapState} from "vuex";
    import Toggle from "../components/Toggle";
    import Pagination from "../components/Pagination";

    /*const nl2br = (str, is_xhtml = false) => {
        if (typeof str === 'undefined' || str === null) {
            return '';
        }
        const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    };*/

    export default VTPBuilder({
        vtp: {
            fetch: (self) => {
                const query = self.$route.query;
                return {
                    route: self.$api.route('content', [], query)
                }
            }
        },
        components: {Toggle, Pagination},
        data() {
            return {
                autoPost: true,
                pasteData: "",
                isAdding: false,
                loaded: false,
                items: [],
                page: 0,
                contents: {}
            }
        },

        computed: {
            ...mapState(['user'])
        },

        watch: {
            page() {
                const page = this.page;
                const query = {...this.$route.query, page};

                this.$router.push({name: 'clipboard', query})
            },

            '$route.query'() {
                this.loaded = false;
                this.reloadFetchedData()
            },

        },

        filters: {
            shorten(text, to = 200) {
                const isLong = text.length > to;
                return text.substring(0, to) + (isLong ? '...' : '');
            }
        },

        methods: {
            mountFromServer({contents}) {
                if (contents) {
                    this.items = contents.data;
                    this.contents = contents;
                }
                this.loaded = true;
            },
            onCtrl(evt) {
                console.log('on ctrl', evt);
                return true;
            },
            removeItem(code) {
                const items = this.items;
                for (const itemIndex in items) {
                    const item = items[itemIndex];
                    if (item.code === code) {
                        this.items.splice(itemIndex, 1);
                        return this.removeItem(code);
                    }
                }
            },
            addPasteData() {
                const data = this.pasteData || "";
                if (!this.isAdding && data.length) {

                    this.items.unshift({
                        content: data,
                        is_adding: true
                    });

                    if (this.autoPost) {
                        this.isAdding = true;
                        return this.$api.postToRoute('content.create', {
                            content: data.trim()
                        }, {
                            yes: ({content}) => {
                                this.items.splice(0, 1);
                                this.removeItem(content.code);
                                this.items.unshift(content);
                            },
                            any: () => {
                                this.isAdding = false;
                            }
                        });
                    }
                }
            },
            async onPaste() {
                this.pasteData = await window.navigator.clipboard.readText() || "";
                this.addPasteData();
                return true;
            }
        }
    });
</script>
