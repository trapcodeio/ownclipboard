<template>
    <section>
        <p class="text-monospace">
            <router-link :to="rl('index')"><strong>CloudClipboard</strong></router-link> provides a RESTful API that allows you to <strong class="has-text-warning">GET,
            SEARCH,
            ADD OR DELETE</strong> your clips using your api key.
        </p>
        <h1 class="is-size-4 has-text-info mt-5 mb-2">Getting Started.</h1>
        <p class="text-monospace">
            All api routes are available @ "yourdomain.com<strong>/api/{endpoint}</strong>", To access this route your
            Api Key must
            be present either as a query or in the body of your request.
        </p>
        <p class="mt-3"><span>GET</span> Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.getExample"
                                    style="white-space: pre-wrap"></code></pre>

        <p class="mt-3"><span>POST</span> Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.postExample"
                                    style="white-space: pre-wrap"></code></pre>

        <p class="mt-3">Absence of api_key will return error:</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiKeyNotFound">
            </vue-json-pretty>
        </div>

        <p class="mt-3">Presence of api_key but not <span>valid</span> will return error:</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiKeyNotValid">
            </vue-json-pretty>
        </div>

        <p class="mt-3">Presence of api_key but not <span>connected</span> will return error:</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiKeyNotConnected">
            </vue-json-pretty>
        </div>

        <h1 class="is-size-4 has-text-info mt-3 mb-2">Connect API key <small>(One Time)</small></h1>
        <p class="text-monospace">
            To get started, your api key needs to be connected. this connection is only required for the first time
            where you have the option to provide a <strong>unique device id.</strong>
            <br><br>
            A unique device id may be used in a case where you want to restrict an api key to a particular
            device/application.
        </p>

        <p class="mt-3"><span>CONNECT</span> Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.connectExample"
                                    style="white-space: pre-wrap"></code></pre>
        <p class="mt-3"><strong>OK</strong> Response</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiKeyConnected">
            </vue-json-pretty>
        </div>


        <!-- GET ALL CLIPS -->
        <h1 class="is-size-4 has-text-info mt-3 mb-2">Get Clips</h1>
        <p class="mt-3"><span>GET CLIP</span> Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.getClipExample"
                                    style="white-space: pre-wrap"></code></pre>
        <p class="mt-3"><strong>OK</strong> Response</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiAll">
            </vue-json-pretty>
        </div>

        <!-- SEARCH CLIPS -->
        <h1 class="is-size-4 has-text-info mt-3 mb-2">Search Clips</h1>
        <p class="mt-3"><span>Search CLIP</span> Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.searchClipExample"
                                    style="white-space: pre-wrap"></code></pre>
        <p class="mt-3"><strong>OK</strong> Response</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiSearch">
            </vue-json-pretty>
        </div>


        <!-- ADD CLIP -->
        <h1 class="is-size-4 has-text-info mt-3 mb-2">Add Clip</h1>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.addExample"
                                    style="white-space: pre-wrap"></code></pre>
        <p class="mt-3"><strong>OK</strong> Response</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiAdd">
            </vue-json-pretty>
        </div>
        <p><strong>exists</strong> tells you if this content exists before, if false it means this is a new document</p>

        <p class="mt-3"><strong class="has-text-danger">ERROR</strong> Response</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.apiAddError">
            </vue-json-pretty>
        </div>


        <!-- DELETE CLIP -->
        <h1 class="is-size-4 has-text-info mt-3 mb-2">Delete Clip</h1>
        <p class="mt-3">Example request.</p>
        <pre :class="jsonBox"><code class="language-http" v-html="requests.deleteExample"
                                    style="white-space: pre-wrap"></code></pre>
        <p class="text-monospace">
            <span class="has-text-success">clip</span> in data is the <strong
                class="ignore">code</strong> (string:20) of the clip you want to delete. clip code can be found in every
            clip item returned when getting all clips.
            <br><br>
            If clip is found in the body of your request it will be validated first and can return any of the errors below.
        </p>

        <p class="mt-3"><span>Absence</span> of clip in request will return error</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.clipNotFound">
            </vue-json-pretty>
        </div>

        <p class="mt-3">clip <span class="has-text-success">present</span> but invalid or not found in database will return error</p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.clipNotValid">
            </vue-json-pretty>
        </div>

        <p class="mt-3">when delete is <span class="has-text-success">successful</span></p>
        <div :class="jsonBox">
            <vue-json-pretty
                    :data="response.clipDeleted">
            </vue-json-pretty>
        </div>

    </section>
</template>

<script>
    import 'prismjs';
    import "prismjs/themes/prism-okaidia.css";

    import VueJsonPretty from 'vue-json-pretty';
    import apiKeyNotFound from './jsons/api_key_not_found';
    import apiKeyNotValid from './jsons/api_key_not_valid';
    import apiKeyNotConnected from './jsons/api_key_not_connected';
    import apiKeyConnected from './jsons/connect';
    import apiAll from './jsons/all';
    import apiSearch from './jsons/search';
    import apiAdd from './jsons/add';
    import apiAddError from './jsons/add_error';
    import clipNotValid from './jsons/clip_not_valid';
    import clipNotFound from './jsons/clip_not_found';
    import clipDeleted from './jsons/deleted';

    const requests = {
        getExample: `GET /api/{endpoint}?api_key={api_key}`,
        postExample: `POST /api/{endpoint}\ndata: { api_key, ...others }`,
        connectExample: `POST /api/connect\ndata: { api_key, device_id? }`,
        getClipExample: `GET /api/all?api_key={api_key}`,
        searchClipExample: `GET /api/all?api_key={api_key}&search=clip`,
        addExample: `POST /api/add\ndata: { api_key, content }`,
        deleteExample: `DELETE /api/delete\ndata: { api_key, clip }`,
    };

    export default {
        components: {
            VueJsonPretty
        },
        data() {
            return {
                requests,
                response: {
                    apiKeyNotFound,
                    apiKeyNotValid,
                    apiKeyConnected,
                    apiKeyNotConnected,
                    apiAll,
                    apiSearch,
                    apiAdd,
                    apiAddError,
                    clipNotFound,
                    clipNotValid,
                    clipDeleted
                },

                jsonBox: "box has-background-black-ter has-text-white p-3 mt-2"
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*@import "~prismjs/themes/prism-dark.css";*/


    p, .text-monospace {
        span:not(.ignore) {
            color: #f89406;
        }

        strong:not(.ignore) {
            color: #62c462;
        }
    }
</style>
