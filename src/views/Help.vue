<template>
    <div>

        <div class="section">
            <div class="container">
                <h1 class="has-text-white is-size-4 py-3">OwnClipboard</h1>

                <div class="columns">
                    <div class="column">
                        <div class=" has-background-dark px-3 py-3">
                            <p>
                                Ownclipboard is the fastest way to quickly copy and paste in all your apps. it is more
                                than a clipboard
                                manager, with ownclipboard you can host your own instance of ownclipbaord on your server
                                see guide <span><a href="https://github.com/trapcodeio/ownclipboard"
                                                   target="_blank" class="has-background-success link px-2"
                                                   to="/docs">here.</a></span>

                            </p>
                            <h5 class="has-text-white py-2"> Ownclipboad has 5 main features that will make it your
                                favorite clipboard manager.
                            </h5>
                            <ul>
                                <li class="py-1"> - You have the ability to use your custom host provided.</li>
                                <li class="py-1"> - Copy in 1-Tap to perform quick actions from all the apps.</li>
                                <li class="py-1"> - An enhanced clipboard to save your copied items.</li>
                                <li class="py-1"> - A Paste feature which allows you to paste anything from your
                                    clipboard in 1-Tap.
                                </li>
                                <li class="py-1"> - Synchronize your clipboard history with all your devices.</li>
                            </ul>

                        </div>

                    </div>
                    <div class="column">
                        <figure class="image ">
                            <img class="mockup px-3" src="/img/app1.svg">
                        </figure>


                    </div>


                </div>

                <hr>
                <h1 class="has-text-white is-size-4 pb-4">Get started in 4 Easy steps</h1>


                <div class="columns  is-multiline">


                    <div class="column is-full-mobile is-half-tablet ">
                        <div class="has-background-dark px-3 py-3 ">

                            <p class="has-text-centered"><span class="is-size-1"><i class="fad fa-sign-in"></i></span>
                            </p>
                            <p class="has-text-white is-size-4 ">Sign up</p>
                            <p>
                                <router-link class="has-background-success link px-2" to="/">Signup</router-link>
                                for a username and password for your Ownclipboard account, if you have not signed
                                up already.
                            </p>


                        </div>
                    </div>
                    <div class="column is-full-mobile  is-half-tablet">
                        <div class="has-background-dark px-3 py-3 ">

                            <p class="has-text-centered "><span class="is-size-1"><i class="fad fa-paste"></i></span>
                            </p>
                            <p class="has-text-white is-size-4 ">Paste your clipboard</p>
                            <p>
                                Paste the content of your clipboard or create new content immediately, you are not
                                limited by what you can paste.

                            </p>


                        </div>
                    </div>
                    <div class="column is-full-mobile is-half-tablet">
                        <div class="has-background-dark px-3 py-3 ">

                            <p class="has-text-centered"><span class="is-size-1"><i class="fad fa-mobile"></i></span>
                            </p>
                            <p class="has-text-white is-size-4 ">Add a Device</p>
                            <p>
                                To use Ownclipboard on more than one device, Click on
                                <router-link class="has-background-success link px-2 mx-1" to="/devices">Account >
                                    Devices
                                </router-link>
                                add a new Device, and copy your Api Key.

                            </p>


                        </div>
                    </div>
                    <div class="column is-full-mobile is-half-tablet">
                        <div class="has-background-dark px-3 py-3 ">

                            <p class="has-text-centered"><span class="is-size-1"><i class="fad fa-link"></i></span>
                            </p>
                            <p class="has-text-white is-size-4 ">Synchronise your devices</p>
                            <p>
                                Paste your secure API key on your app and click the request button <br> your clipboard
                                will be
                                automatically Synchronised with your Device.'

                            </p>


                        </div>
                    </div>
                </div>


                <hr>


                <h1 class="has-text-white is-size-4 py-2">Download</h1>

                <div class=" columns">
                    <div class="column">
                        <p class="has-background-dark px-3 py-3">
                            Ownclipboard is available for Download on the Apple Store and Google Play Store
                        </p>
                        <div class="field is-grouped">
                            <div class="control my-4">
                                <button class="button is-success is-outlined  is-medium">Apple Store <span
                                        class="mx-2"><i class="fab fa-app-store"></i></span></button>


                            </div>
                            <div class="control my-4">
                                <a href="https://play.google.com/store/apps/details?id=com.ownclipboard.own_clipboard"
                                   class="button is-success is-outlined  is-medium">Google Store <span class="mx-2 "><i
                                        class="fab fa-google-play"></i></span></a>

                            </div>
                        </div>
                    </div>

                </div>


                <h1 class="has-text-white is-size-4 py-2">Developers</h1>
                <div class="has-background-dark px-3 py-3">
                    <p>
                        Are you a developer ? <br> Host your own instance of Ownclipboard and customize to
                        your satisfaction.
                        Ownclipboard is open source and we anxious to see how you tweak and customize it. <br>To get
                        stared visit the
                           <span><a href="https://github.com/trapcodeio/ownclipboard"
                                 target="_blank" class="has-background-success link px-2"
                                 to="/docs">Github Repository.</a></span>
                    </p>

                </div>


            </div>
        </div>
    </div>
</template>


<style scoped>

    .mockup {

        height: 707px;
        display: block;
        margin-left: auto;
        margin-right: auto;

    }

    .link {
        border-radius: 10px;
    }


</style>
