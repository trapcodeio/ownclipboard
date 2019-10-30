module.exports = {
    root: true,
    globals: {
        _: true,
        $: true,
        $$: true,
        Vue: true,
        OVP: true,
        VTPBuilder: true,
        moment: true,
        Swal: true,
        $helpers: true,
        $api: true,
        fakeReload: true,
        fakeReloadSmooth: true
    },
    env: {
        browser: true,
        node: true,
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
