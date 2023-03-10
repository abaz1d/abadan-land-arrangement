import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth";

export const useSideMenuStore = defineStore("sideMenu", {
  state: () => ({
    menu: [
      {
        icon: "HomeIcon",
        pageName: "side-menu-dashboard",
        title: "Dashboard",
      },
      {
        icon: "FileTextIcon",
        pageName: "side-menu-laporan",
        title: "Laporan",
        subMenu: [
          {
            icon: "FileIcon",
            pageName: "side-menu-jurnal-transaksi",
            title: "Jurnal Akuntansi",
          },
          {
            icon: "FileUpIcon",
            pageName: "side-menu-perkiraan-akutansi",
            title: "Perkiraan Akutansi",
          },
          // {
          //   icon: "FileBoxIcon",
          //   pageName: "side-menu-laporan-stok",
          //   title: "Laporan Stok",
          // },
        ],
      },
      {
        icon: "SlidersIcon",
        pageName: "side-menu-pengaturan",
        title: "Pengaturan Data",
        subMenu: [
          {
            icon: "UsersIcon",
            pageName: "side-menu-semua-akun",
            title: "Semua Akun",
          },
        ],
      },
      {
        icon: "LayoutIcon",
        pageName: "side-menu-menu-layout",
        title: "Menu Layout",
        subMenu: [
          {
            icon: "CreditCardIcon",
            pageName: "top-menu-dashboard",
            title: "Top Menu",
            ignore: true,
          },
          {
            icon: "ColumnsIcon",
            pageName: "side-menu-dashboard",
            title: "Side Menu",
            ignore: true,
          },
          {
            icon: "SidebarIcon",
            pageName: "simple-menu-dashboard",
            title: "Simple Menu",
            ignore: true,
          },
        ],
      },
    ],
  }),
  getters: {
    items: (state) =>
      state.menu.filter((item) => {
        const Auth = useAuthStore();
        const Role = Auth.items.role;
        const Title = item.title;

        //Jika Role Selain Super Admin Menu Pengaturan Data Tidak Tersedia
        // if (Role !== "Admin") {
        //   return Title !== "Pengaturan Data";
        // } else {
        return item;
        // }
      }),
  },
});
