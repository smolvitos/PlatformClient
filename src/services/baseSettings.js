import VueCookie from 'vue-cookie'
let ipAddress, port

export default {
    ipAddress: VueCookie.get('ip') || 'vps686120.ovh.net',
    port: VueCookie.get('port') || '8081',
}