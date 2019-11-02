<template>
    <section>
        <p class="text-monospace">
            <strong>CloudClipboard</strong> provides a RESTful API that allows you to <strong class="has-text-warning">GET,
            ADD OR DELETE</strong> your clips using your api key.
        </p>
        <h1 class="is-size-4 has-text-success mt-3">Getting Started.</h1>
        <p class="text-monospace">
            All api routes are available @ "yourdomain.com<strong>/api</strong>", To access this route your Api Key must
            be present either as a query or in the body of your request.

            <code>
                {
                "error": {
                "type": "not_found",
                "message": "ApiKey not found in request."
                },
                "status": 401
                }
            </code>
        </p>
    </section>
</template>

<script>
    export default {}
</script>

<style lang="scss">
    .text-monospace {
        strong {
            color: #62c462;
        }
    }
</style>
