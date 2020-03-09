import Vue from "vue";

Vue.directive('pull-up', {
    inserted: function (el, binding, vnode, oldVnode) {
        window.addEventListener('scroll', function() {
            if (document.documentElement.scrollTop + document.body.clientHeight >= document.documentElement.scrollHeight) {
                vnode.context[binding.expression]();
            }
          });
    }
})