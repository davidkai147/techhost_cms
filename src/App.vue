<template>
    <div id="app">
        <vue-progress-bar/>
        <a-config-provider :locale="locale">
            <router-view/>
        </a-config-provider>
    </div>

</template>

<script>
    import zh_CN from 'ant-design-vue/es/locale-provider/zh_CN'
    import enquireScreen from './utils/device'
    import {mapState} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                locale: zh_CN
            }
        },
        created() {
            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start()
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress
                    // parse meta tags
                    this.$Progress.parseMeta(meta)
                }
                //  start the progress bar
                this.$Progress.start()
                //  continue to next page
                next()
            })
            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach(() => {
                //  finish the progress bar
                this.$Progress.finish()
            })

            let _this = this
            enquireScreen(isMobile => {
                _this.$store.commit('setting/setDevice', isMobile)
            })
        },
        mounted() {
            this.$Progress.finish()
            this.setWeekModeTheme(this.weekMode)
        },
        watch: {
            weekMode(val) {
                this.setWeekModeTheme(val)
            },
            lang(val) {
                this.$i18n.locale = val
                switch (val) {
                    case 'CN':
                        this.locale = require('ant-design-vue/es/locale-provider/zh_CN').default
                        break
                    case 'HK':
                        this.locale = require('ant-design-vue/es/locale-provider/zh_TW').default
                        break
                    case 'US':
                    default:
                        this.locale = require('ant-design-vue/es/locale-provider/en_US').default
                        break
                }
            }
        },
        computed: {
            ...mapState('setting', ['weekMode', 'lang'])
        },
        methods: {
            setWeekModeTheme(weekMode) {
                if (weekMode) {
                    document.body.classList.add('week-mode')
                } else {
                    document.body.classList.remove('week-mode')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    #id {
    }
</style>
