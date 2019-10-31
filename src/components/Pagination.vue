<template>
    <section v-if="data.total>data.perPage">
        <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
            <a :disabled="data.page===1" @click.prevent="openPage(data.page-1)" class="pagination-previous">Previous</a>
            <a :disabled="data.page===data.lastPage" @click.prevent="openPage(data.page+1)" class="pagination-next">Next
                page</a>
            <ul class="pagination-list">
                <template v-if="data.page>3">
                    <li><a @click.prevent="openPage(1)" class="pagination-link">1</a></li>
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a @click.prevent="openPage(data.page-1)" class="pagination-link">{{data.page-1}}</a>
                    </li>
                    <li v-if="data.page!==data.lastPage"><a @click.prevent="openPage(data.page)"
                                                            class="pagination-link is-current"
                                                            aria-current="page">{{data.page}}</a>
                    </li>
                    <li v-if="data.page+1<data.lastPage"><a @click.prevent="openPage(data.page+1)"
                                                            class="pagination-link">{{data.page+1}}</a>
                    </li>
                </template>
                <template v-else>
                    <template v-for="(pageIndex, pID) in pagesArray">
                        <li :key="pID"><a @click.prevent="openPage(pageIndex)"
                                          :class="'pagination-link' + (data.page===pageIndex ?' is-current':'')"
                                          aria-label="Goto page 1">{{pageIndex}}</a></li>
                    </template>
                </template>
                <template v-if="data.lastPage>=5||data.page===4">
                    <li><span class="pagination-ellipsis">&hellip;</span></li>
                    <li><a @click.prevent="openPage(data.lastPage)"
                           :class="('pagination-link ' + (data.lastPage===data.page ? 'is-current':'')).trim()">{{data.lastPage}}</a>
                    </li>
                </template>
            </ul>
        </nav>
    </section>
</template>

<script>
    export default {
        model: {
            prop: 'page',
            event: 'update-page'
        },
        props: {
            page: {type: Number, default: 1},
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            name: {
                type: String,
                default: 'page'
            }
        },
        data() {
            return {}
        },
        computed: {
            pagesArray() {
                const lists = [];
                let lastPage = Number(this.data.lastPage);
                if (lastPage >= 5) {
                    lastPage = 4;
                }

                let i = 0;
                while (i < lastPage) {
                    lists[i] = i + 1;
                    i++;
                }
                return lists;
            }
        },
        methods: {
            openPage(page) {
                if (page >= 1) {
                    this.$emit('update-page', page)
                }
            }
        }
    }
</script>

<style>
    .pagination-link, .pagination-next, .pagination-previous {
        color: whitesmoke;
    }
</style>
