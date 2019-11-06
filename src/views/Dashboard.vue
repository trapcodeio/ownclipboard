<template>
    <section @paste="onPaste" class="section">
        <div class="container">
            <!--<div class="is-pulled-right">
                AutoPost
                <Toggle v-model="autoPost" :show-options="false"/>
            </div>-->
            <template v-if="isCreating">
                <form action="#" class="mb-5">
                    <div class="field">
                        <label class="is-clearfix" for="">
                            <span class="is-pulled-left mr-2">Editor</span>
                            <span class="is-pulled-right mr-2">({{postTrimmed.length}})</span>
                        </label>
                        <div class="control">
                            <textarea v-model="post" rows="5"
                                      class="textarea is-dark has-background-dark has-text-white"
                                      placeholder="Paste or write..."></textarea>
                        </div>
                    </div>

                    <div class="has-text-centered">
                        <LoadingButton :disabled="postTrimmed.length<2" :click="saveClip" class="is-success mr-2">
                            <i class="far fa-check mr-2"></i> SAVE CLIP
                        </LoadingButton>
                        <button @click.prevent="isCreating=false" class="button">
                            CANCEL
                        </button>
                    </div>
                </form>
            </template>
            <template v-else>
                <div class="box has-text-centered py-4 has-background-grey-darker">

                    <h1 class="is-size-3 is-size-1-desktop">Click + CTRL+V</h1>
                    <h5 class="my-3">OR</h5>
                    <button @click.prevent="onPaste" class="button mr-2">
                        <i class="fa fa-paste mr-2"></i> PASTE
                    </button>
                    <button @click.prevent="isCreating=true" class="button">
                        <i class="fa fa-pencil mr-2"></i> CREATE
                    </button>
                </div>
            </template>

            <div class="columns">
                <div class="column is-12">

                    <div class="control">
                        <input v-model="search" placeholder="Search." type="search"
                               class="input has-background-dark is-dark is-medium has-text-white">
                    </div>
                    <div v-if="isSearching" class="has-text-centered mt-3 is-size-4 has-text-success">
                        <i class="fad fa-spinner-third fa-spin mr-2"></i>
                        <span class="is-size-6 has-text-grey-light">Searching for <strong class="has-text-success">{{search}}</strong>...</span>
                    </div>
                </div>
            </div>
            <template v-if="loaded">
                <h6 v-if="searchQuery&&searchQuery.length" class="is-size-6 my-2">Results for search <span
                        class="has-text-success">{{search}}</span></h6>
                <h4 v-else class="is-size-5 my-2">
                    History <small class="is-size-6 is-pulled-right">({{seen}} of {{contents.total}})</small>
                </h4>
                <template v-for="(item, index) in items">
                    <div :key="index"
                         class="box has-background-dark py-3 history">
                        <div class="is-clearfix">
                            <div class="is-pulled-right is-size-7">
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
                            <code class="has-background-dark text-break">
                                <a v-if="item.type==='url'" target="_blank" :href="item.content"
                                   class="has-text-success">{{item.content
                                    | shorten }}</a>
                                <span v-else @click.prevent="viewHistory=item">{{item.content | shorten }}</span>
                            </code>
                        </div>
                        <div class="is-clearfix is-size-6 mt-2 history-actions">
                            <div class="is-pulled-left">
                                <a v-clipboard:copy="item.content" v-clipboard:success="onCopy"
                                   class="has-text-success"><i
                                        class="fad fa-copy"></i> <small>copy</small></a>
                            </div>
                            <div class="is-pulled-right">
                                <!--                                <template v-if="item.content.length>200">-->
                                <a @click.prevent="viewHistory=item" class="has-text-info mr-2"><i
                                        class="fad fa-eye"></i> <small>view</small></a> -
                                <!--                                </template>-->
                                <a @click.prevent="deleteItem(index)" class="has-text-danger ml-2"><i
                                        class="fad fa-trash"></i></a>
                            </div>
                        </div>
                    </div>
                </template>
                <Pagination v-model="page" :data="contents"/>
            </template>
            <PreLoader class="mt-5" v-else/>

            <div v-if="items.length" class="has-text-centered mt-3">
                <button @click.prevent="isClearingHistory=true" class="button is-dark mt-5 is-small text-uppercase"><i
                        class="fa fa-trash mr-2"></i> Clear History
                </button>
            </div>

            <div v-if="isClearingHistory" class="modal is-active">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <h3 class="is-size-3">Are you sure you want to clear your history?</h3>
                    <div class="has-text-centered mt-3">
                        <LoadingButton :click="clearHistory" class="mr-2 is-success">Yes, Clear</LoadingButton>
                        <button @click.prevent="isClearingHistory=false" class="button mr-2 is-danger">Cancel</button>
                    </div>
                </div>
            </div>

            <div v-if="viewHistory!==null" class="modal is-active text-monospace text-break">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="box has-background-dark has-text-white">
                        <div v-html="viewHistory.html_formatted ||viewHistory.content" :readonly="true"></div>
                    </div>
                    <div class="is-clearfix is-size-5">
                        <div class="is-pulled-left">
                            <a v-clipboard:copy="viewHistory.content" v-clipboard:success="onCopy"
                               class="has-text-success"><i
                                    class="fad fa-copy"></i> <small>COPY</small></a>
                        </div>
                        <div class="is-pulled-right">
                            <a @click.prevent="viewHistory=null" class="has-text-danger ml-2"><i
                                    class="far fa-times"></i> <small>CLOSE</small></a>
                        </div>
                    </div>
                </div>
                <button @click="viewHistory=null" class="modal-close is-large" aria-label="close"></button>
            </div>
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
                search: '',
                isSearching: false,
                searchTimeout: -1,

                isCreating: false,

                viewHistory: null,
                isHovered: {},
                autoPost: true,
                pasteData: "",
                isAdding: false,
                loaded: false,
                items: [],
                page: 0,
                contents: {},

                post: '',
                isClearingHistory: false
            }
        },

        computed: {
            ...mapState(['user']),

            searchQuery() {
                return this.$route.query.search
            },

            postTrimmed() {
                return this.post.trim();
            },

            seen() {
                const {page, perPage, lastPage, total} = this.contents;
                return (lastPage === page) ? total : perPage * page;
            }
        },

        watch: {
            page() {
                const page = this.page;
                const query = {...this.$route.query, page};

                this.$router.push({name: 'clipboard', query})
            },

            '$route.query'() {
                if (!this.searchQuery)
                    this.loaded = false;
                this.reloadFetchedData()
            },

            search() {
                const search = this.search;
                if (search.length > 1 && this.search !== this.searchQuery) {
                    this.isSearching = true;
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = setTimeout(() => {
                        const query = {search};
                        this.$router.push({name: 'clipboard', query})
                    }, 400);
                } else {
                    clearTimeout(this.searchTimeout);
                    this.isSearching = false;
                    if (this.searchQuery) {
                        this.$router.push({name: 'clipboard'})
                    }
                }
            }

        },

        filters: {
            shorten(text, to = 200) {
                const isLong = text.length > to;
                return text.substring(0, to) + (isLong ? '...' : '');
            }
        },

        mounted() {
            if (this.searchQuery) {
                this.search = this.searchQuery;
            }
        },

        methods: {
            mountFromServer({contents, search}) {
                if (contents) {
                    this.items = contents.data;
                    this.contents = contents;
                }

                if (search) {
                    this.isSearching = false;
                }

                this.loaded = true;
            },
            onCopy() {
                return Swal.fire({
                    text: "Copied successfully!",
                    type: "success"
                });
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
            createClip(content, jobs = {}) {
                this.isAdding = true;
                return this.$api.postToRoute('content.create', {
                    content: content.trim()
                }, {
                    yes: ({content}) => {
                        this.items.splice(0, 1);
                        this.removeItem(content.code);
                        this.items.unshift(content);
                        if (typeof jobs.yes === "function") return jobs.yes(content);
                    },
                    any: () => {
                        this.isAdding = false;
                        if (typeof jobs.any === "function") return jobs.any();
                    }
                });
            },
            saveClip(btn) {
                this.pasteData = this.postTrimmed;
                this.addPasteData(() => {
                    btn.stopLoading()
                }, () => {
                    this.post = "";
                    this.isCreating = false;
                })
            },
            addPasteData(any = () => false, yes = () => false) {
                const data = (this.pasteData || "").trim();
                if (!this.isAdding && data.length) {

                    this.items.unshift({
                        content: data,
                        is_adding: true
                    });

                    if (this.autoPost) {
                        return this.createClip(data, {yes, any});
                    }
                } else {
                    if (typeof yes === "function") return any();
                }
            },

            async onPaste() {
                if (this.isCreating) return false;
                this.pasteData = await window.navigator.clipboard.readText() || "";
                this.addPasteData();
                return true;
            },

            deleteItem(index) {
                const canDelete = confirm("Are you sure you want to delete this history.");
                if (canDelete) {
                    const item = this.items[index];
                    this.items.splice(index, 1);

                    return this.$api.deleteFromRoute(['content.delete', item.code], {}, {
                        no: () => {
                            this.items.splice(index, 1, item);
                        },
                    })
                }
            },

            clearHistory(btn) {
                return this.$api.deleteFromRoute('content.clear', {}, {
                    yes: () => {
                        this.items = [];
                        this.contents = {};
                        this.isClearingHistory = false;
                    },
                    any: () => btn.stopLoading()
                });
            }
        }
    });
</script>

<style lang="scss" scoped>
    input, textarea {
        &::placeholder {
            color: grey;
        }
    }

    .box.history {
        .history-actions {
            transition: all .0s;
            opacity: .4;
        }

        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;

        code {
            color: antiquewhite;
        }

        &:hover {
            margin-left: -10px;
            margin-right: -10px;
            position: relative;
            transition: all .2s;
            box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15) !important;

            code {
                color: white;
            }

            .history-actions {
                opacity: 1;
            }
        }
    }
</style>
