import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHashHistory } from "vue-router";
import SideMenu from "@/layouts/side-menu/Main.vue";
import SimpleMenu from "@/layouts/simple-menu/Main.vue";
import TopMenu from "@/layouts/top-menu/Main.vue";
import Dashboard from "@/views/Dashboard/Main.vue";
import Users from "@/views/Users/Main.vue";
import Jurnal from "@/views/Jurnal/Main.vue";
import PerkiraanAKutansi from "@/views/Perkiraan-Akutansi/Main.vue";
import Login from "@/views/Login/Main.vue";
import ErrorPage from "@/views/ErrorPage/Main.vue";
import SKKP from "@/views/SKKP/Main.vue";

const routes = [
  {
    path: "#/",
    component: TopMenu,
    children: [
      {
        path: "#/",
        name: "top-menu-dashboard",
        component: Dashboard,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "top-menu-semua-akun",
        component: Users,
        meta: { authorize: [] },
      },
      {
        path: "jurnal-transaksi",
        name: "top-menu-jurnal-transaksi",
        component: Jurnal,
        meta: { authorize: [] },
      },
      {
        path: "perkiraan-akutansi",
        name: "top-menu-perkiraan-akutansi",
        component: PerkiraanAKutansi,
        meta: { authorize: [] },
      },
    ],
  },
  {
    path: "#/side-menu",
    component: SideMenu,
    children: [
      {
        path: "dashboard",
        name: "side-menu-dashboard",
        component: Dashboard,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "side-menu-semua-akun",
        component: Users,
        meta: { authorize: [] },
      },
      {
        path: "jurnal-transaksi",
        name: "side-menu-jurnal-transaksi",
        component: Jurnal,
        meta: { authorize: [] },
      },
      {
        path: "perkiraan-akutansi",
        name: "side-menu-perkiraan-akutansi",
        component: PerkiraanAKutansi,
        meta: { authorize: [] },
      },
    ],
  },
  {
    path: "#/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "dashboard",
        name: "simple-menu-dashboard",
        component: Dashboard,
        meta: { authorize: [] },
      },
      {
        path: "semua-akun",
        name: "simple-menu-semua-akun",
        component: Users,
        meta: { authorize: [] },
      },
      {
        path: "jurnal-transaksi",
        name: "simple-menu-jurnal-transaksi",
        component: Jurnal,
        meta: { authorize: [] },
      },
      {
        path: "perkiraan-akutansi",
        name: "simple-menu-perkiraan-akutansi",
        component: PerkiraanAKutansi,
        meta: { authorize: [] },
      },
    ],
  },
  {
    path: "#/login",
    name: "login",
    component: Login,
  },
  {
    path: "#/syarat&ketentuan",
    name: "term-page",
    component: SKKP,
  },
  {
    path: "#/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "#/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  base: "/abadan-land-arrangement/",
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  const currentUser = auth.items;
  if (authorize) {
    if (authRequired && !auth.user) {
      auth.returnUrl = to.fullPath;
      return next({ path: "#/login" });
    }
    if (authorize.length && !authorize.includes(currentUser.role)) {
      alert("Role Akun Anda, Tidak Bisa Mengakses Halaman ini !");
      return next({ path: "#/" });
    }
  }
  next();
});

export default router;
