<template>
    <section class="section">
        <div class="container mb-5">
            <div class="has-text-centered">
                <i class="fad fa-mobile fa-4x"></i>
                <h3 class="is-size-3 my-2">Devices</h3>
            </div>
            <div class="has-text-right">
                <button @click.prevent="addingDevice=true" class="button is-success"><i class="fa fa-plus mr-2"></i> Add
                    Device
                </button>
            </div>
        </div>

        <div class="columns">
            <div class="column is-12">
                <template v-if="loaded">
                    <h6 class="is-size-7 is-uppercase">Click <strong class="has-text-warning">Api key</strong> to copy.
                    </h6>
                    <template v-if="devices.length">
                        <div v-for="(item, index) in devices" class="box mt-1" :key="index">
                            <span class="has-text-grey-light">NAME: </span> {{item.name}},
                            <br>
                            <span class="has-text-grey-light">API KEY: </span> <code v-clipboard:copy="item.api_key"
                                                                                     v-clipboard:success="onCopy"
                                                                                     class="has-text-warning text-break text-monospace is-clickable">{{item.api_key}}</code>
                            <br>
                            <span class="has-text-grey-light">Used: </span>
                            <i v-if="item.used" class="far fa-check-circle has-text-success"></i>
                            <i v-else class="far fa-minus-circle"></i>

                            <a @click.prevent="deleteDevice(index)" class="is-pulled-right"><i
                                    class="fa fa-trash has-text-danger"></i></a>

                        </div>
                    </template>
                    <div v-else class="has-text-centered">
                        <h3 class="is-size-3">No devices Yet</h3>
                    </div>
                </template>
                <PreLoader v-else/>

                <div :class="('modal ' + (addingDevice? 'is-active':'')).trim()">
                    <div class="modal-background"></div>
                    <div class="modal-content">
                        <form @submit.prevent="()=>false">
                            <div class="field">
                                <label class="label">Device Name</label>
                                <div class="control">
                                    <input v-model="form.name" type="text" placeholder="My Iphone Xs"
                                           class="input has-background-dark">
                                </div>
                            </div>

                            <div class="has-text-right">
                                <LoadingButton :click="addDevice" class="button is-dark mt-2">Add Device</LoadingButton>
                            </div>
                        </form>

                    </div>
                    <button @click.prevent="addingDevice=false" class="modal-close is-large"
                            aria-label="close"></button>
                </div>
            </div>
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
                data: {},
                form: {
                    name: ''
                },

                addingDevice: false,
            }
        },

        methods: {
            mountFromServer({devices}) {
                if (devices) {
                    this.devices = devices.data;
                    this.data = devices;
                }

                this.loaded = true;
            },

            onCopy() {
                return Swal.fire({
                    text: "Api key copied.",
                    type: "success"
                });
            },

            addDevice(btn) {
                const name = this.form.name || "";
                if (name.length < 2) {
                    btn.stopLoading();
                    return Swal.fire({
                        text: "Device name too short.",
                        type: "error"
                    });
                }

                return this.$api.postToRoute('devices.add', {name}, {
                    yes: ({created}) => {
                        this.form.name = "";
                        this.addingDevice = false;

                        if (created) {
                            this.loaded = false;
                            this.reloadFetchedData();
                        }
                    },

                    any: () => {
                        btn.stopLoading();
                    }
                });
            },

            deleteDevice(index) {
                const canDelete = confirm("Are you sure you want to delete this device/application? Note: deleting this device does not delete any data created by this device, it only revokes device access.");
                if (canDelete) {
                    const device = this.devices[index];
                    this.devices.splice(index, 1);

                    return this.$api.deleteFromRoute(['devices.delete', device.code], {}, {
                        no: () => {
                            this.devices.splice(index, 1, device);
                        },
                    })

                }
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
