<template>
    <section class="section">
        <div class="container mb-5">
            <div class="has-text-centered">
                <i class="fad fa-mobile fa-4x"></i>
                <h3 class="is-size-3 my-2">Devices</h3>
            </div>
            <div class="has-text-right">
                <button class="button is-success"><i class="fa fa-plus mr-2"></i> Add Device</button>
            </div>
        </div>

        <template v-if="loaded">
            <template v-if="devices.length"></template>
            <div v-else class="has-text-centered">
                <h3 class="is-size-3">No devices Yet</h3>
            </div>
        </template>
        <PreLoader v-else/>

        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <form @submit.prevent="()=>false">
                    <div class="field">
                        <label class="label">Device Name</label>
                        <div class="control">
                            <input v-model="form.name" type="text" placeholder="My Iphone Xs" class="input has-background-dark">
                        </div>
                    </div>

                    <div class="has-text-right">
                        <LoadingButton :click="addDevice" class="button mt-2">Add Device</LoadingButton>
                    </div>
                </form>

            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </section>
</template>

<script>
    export default VTPBuilder({
        vtp: {
            fetch: {
                route: 'devices'
            }
        },

        data() {
            return {
                loaded: false,
                devices: [],
                form: {
                    name: ''
                }
            }
        },

        methods: {
            addDevice(btn) {
                const  name = this.form.name || "";
                if (name.length < 2) {
                    btn.stopLoading();
                    return Swal.fire({
                        text: "Device name too short.",
                        type: "error"
                    });
                }

                return  this.$api.postToRoute('devices.add', {name}, {
                    yes: ({device}) => {
                        console.log(device);
                    },

                    any: () =>{
                        btn.stopLoading();
                    }
                });
            }
        },
    });
</script>

<style scoped>
    input {
        color: white !important;
    }

    input::placeholder {
        color: grey;
    }

</style>
