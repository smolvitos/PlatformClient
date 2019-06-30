import VueCookie from 'vue-cookie'

export default {
    hostname: VueCookie.get('hostname') || window.location.hostname,
    port: VueCookie.get('port') || window.location.port,
}