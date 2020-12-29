import Vue from "vue";
import Router from "vue-router";
import config from "@/config";
import Map from "@/views/Map.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: config.router.basePath,
  routes: [
    {
      path: "/",
      name: "map",
      component: Map,
    },
  ],
});
