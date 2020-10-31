<template>
  <div v-if="isDrizzleInitialized" id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
  <div v-else>Loading...</div>
</template>

<script>
import { mapGetters } from 'vuex';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Header from '@/components/Layouts/Header';
import Footer from '@/components/Layouts/Footer.vue';

export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      units: 'Ether', //Wei
      publicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYQBRFj+2Ryl6kkjLy+tZJT3YsaenURtPUexuWlY595LnQTNunSBtwNcJ7gLZgbkb4Bf2IIkCYgya6t+B9LjdPJ7NBGCIc7TQmTpKjcFucsA+tVuOesaYFBVF/HrL+1lNEY14oq+r7+l/BgUuVUBDUE4r7nfgPjMijSfLNLpP8+wIDAQAB'
    }
  },
  computed: {
    ...mapGetters('drizzle', ['drizzleInstance', 'isDrizzleInitialized']),
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

/* span, applet, object, iframe,
h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
} */
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
