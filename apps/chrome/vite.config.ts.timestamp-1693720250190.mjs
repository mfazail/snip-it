// vite.config.ts
import { crx } from "file:///E:/SnipIt/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import { svelte } from "file:///E:/SnipIt/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@2.4.5_svelte@4.2.0_vite@4.2.3/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import { defineConfig } from "file:///E:/SnipIt/node_modules/.pnpm/vite@4.2.3_@types+node@18.16.16/node_modules/vite/dist/node/index.js";

// src/manifest.config.ts
import { defineManifest } from "file:///E:/SnipIt/node_modules/.pnpm/@crxjs+vite-plugin@2.0.0-beta.18/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "@snip-it/chrome",
  description: "Boilerplate for Chrome Extension Svelte Typescript project",
  version: "1.0.0",
  type: "module",
  repository: {
    type: "git",
    url: "https://github.com/nekitcorp/chrome-extension-svelte-typescript-boilerplate.git"
  },
  scripts: {
    dev: "vite",
    build: "vite build",
    check: "svelte-check --tsconfig ./tsconfig.json"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "2.0.0-beta.18",
    "@sveltejs/vite-plugin-svelte": "2.4.5",
    "@tsconfig/svelte": "5.0.2",
    "@types/chrome": "0.0.243",
    svelte: "4.2.0",
    "svelte-check": "3.5.0",
    "svelte-preprocess": "5.0.4",
    tslib: "2.6.2",
    vite: "4.2.3"
  },
  dependencies: {
    "@supabase/supabase-js": "^2.33.1",
    "jwt-decode": "^3.1.2"
  }
};

// src/manifest.config.ts
var { version, name, description } = package_default;
var [major, minor, patch] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);
var manifest_config_default = defineManifest(async (env) => ({
  manifest_version: 3,
  name,
  description,
  version: `${major}.${minor}.${patch}`,
  version_name: version,
  icons: {
    "16": "src/assets/icons/icon-16.png",
    "32": "src/assets/icons/icon-32.png",
    "48": "src/assets/icons/icon-48.png",
    "128": "src/assets/icons/icon-128.png"
  },
  host_permissions: ["http://*/*"],
  content_scripts: [
    {
      matches: ["http://*/*"],
      js: ["src/content/index.ts"]
    }
  ],
  background: {
    service_worker: "src/background/index.ts"
  },
  action: {
    default_popup: "src/popup/popup.html",
    default_icon: {
      "16": "src/assets/icons/icon-16.png",
      "32": "src/assets/icons/icon-32.png",
      "48": "src/assets/icons/icon-48.png",
      "128": "src/assets/icons/icon-128.png"
    }
  },
  permissions: ["storage", "scripting", "activeTab", "contextMenus", "tabs", "cookies"]
}));

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [svelte(), crx({ manifest: manifest_config_default })],
  // HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
  // https://github.com/crxjs/chrome-extension-tools/issues/746
  server: {
    port: 3e3,
    strictPort: true,
    hmr: {
      clientPort: 3e3
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTbmlwSXRcXFxcYXBwc1xcXFxjaHJvbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXFNuaXBJdFxcXFxhcHBzXFxcXGNocm9tZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovU25pcEl0L2FwcHMvY2hyb21lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgY3J4IH0gZnJvbSBcIkBjcnhqcy92aXRlLXBsdWdpblwiO1xyXG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tIFwiQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZVwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgbWFuaWZlc3QgZnJvbSBcIi4vc3JjL21hbmlmZXN0LmNvbmZpZ1wiO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICAgIHBsdWdpbnM6IFtzdmVsdGUoKSwgY3J4KHsgbWFuaWZlc3QgfSldLFxyXG4gICAgLy8gSEFDSzogaHR0cHM6Ly9naXRodWIuY29tL2NyeGpzL2Nocm9tZS1leHRlbnNpb24tdG9vbHMvaXNzdWVzLzY5NlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NyeGpzL2Nocm9tZS1leHRlbnNpb24tdG9vbHMvaXNzdWVzLzc0NlxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogMzAwMCxcclxuICAgICAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgICAgIGhtcjoge1xyXG4gICAgICAgICAgICBjbGllbnRQb3J0OiAzMDAwLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxTbmlwSXRcXFxcYXBwc1xcXFxjaHJvbWVcXFxcc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxTbmlwSXRcXFxcYXBwc1xcXFxjaHJvbWVcXFxcc3JjXFxcXG1hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovU25pcEl0L2FwcHMvY2hyb21lL3NyYy9tYW5pZmVzdC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gXCJAY3J4anMvdml0ZS1wbHVnaW5cIjtcclxuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gXCIuLi9wYWNrYWdlLmpzb25cIjtcclxuXHJcbmNvbnN0IHsgdmVyc2lvbiwgbmFtZSwgZGVzY3JpcHRpb24gfSA9IHBhY2thZ2VKc29uO1xyXG5cclxuLy8gQ29udmVydCBmcm9tIFNlbXZlciAoZXhhbXBsZTogMC4xLjAtYmV0YTYpXHJcbmNvbnN0IFttYWpvciwgbWlub3IsIHBhdGNoXSA9IHZlcnNpb25cclxuICAgIC8vIGNhbiBvbmx5IGNvbnRhaW4gZGlnaXRzLCBkb3RzLCBvciBkYXNoXHJcbiAgICAucmVwbGFjZSgvW15cXGQuLV0rL2csIFwiXCIpXHJcbiAgICAvLyBzcGxpdCBpbnRvIHZlcnNpb24gcGFydHNcclxuICAgIC5zcGxpdCgvWy4tXS8pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lTWFuaWZlc3QoYXN5bmMgKGVudikgPT4gKHtcclxuICAgIG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcbiAgICBuYW1lOiBuYW1lLFxyXG4gICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgdmVyc2lvbjogYCR7bWFqb3J9LiR7bWlub3J9LiR7cGF0Y2h9YCxcclxuICAgIHZlcnNpb25fbmFtZTogdmVyc2lvbixcclxuICAgIGljb25zOiB7XHJcbiAgICAgICAgXCIxNlwiOiBcInNyYy9hc3NldHMvaWNvbnMvaWNvbi0xNi5wbmdcIixcclxuICAgICAgICBcIjMyXCI6IFwic3JjL2Fzc2V0cy9pY29ucy9pY29uLTMyLnBuZ1wiLFxyXG4gICAgICAgIFwiNDhcIjogXCJzcmMvYXNzZXRzL2ljb25zL2ljb24tNDgucG5nXCIsXHJcbiAgICAgICAgXCIxMjhcIjogXCJzcmMvYXNzZXRzL2ljb25zL2ljb24tMTI4LnBuZ1wiLFxyXG4gICAgfSxcclxuICAgIGhvc3RfcGVybWlzc2lvbnM6IFtcImh0dHA6Ly8qLypcIl0sXHJcbiAgICBjb250ZW50X3NjcmlwdHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1hdGNoZXM6IFtcImh0dHA6Ly8qLypcIl0sXHJcbiAgICAgICAgICAgIGpzOiBbXCJzcmMvY29udGVudC9pbmRleC50c1wiXSxcclxuICAgICAgICB9LFxyXG4gICAgXSxcclxuICAgIGJhY2tncm91bmQ6IHtcclxuICAgICAgICBzZXJ2aWNlX3dvcmtlcjogXCJzcmMvYmFja2dyb3VuZC9pbmRleC50c1wiLFxyXG4gICAgfSxcclxuICAgIGFjdGlvbjoge1xyXG4gICAgICAgIGRlZmF1bHRfcG9wdXA6IFwic3JjL3BvcHVwL3BvcHVwLmh0bWxcIixcclxuICAgICAgICBkZWZhdWx0X2ljb246IHtcclxuICAgICAgICAgICAgXCIxNlwiOiBcInNyYy9hc3NldHMvaWNvbnMvaWNvbi0xNi5wbmdcIixcclxuICAgICAgICAgICAgXCIzMlwiOiBcInNyYy9hc3NldHMvaWNvbnMvaWNvbi0zMi5wbmdcIixcclxuICAgICAgICAgICAgXCI0OFwiOiBcInNyYy9hc3NldHMvaWNvbnMvaWNvbi00OC5wbmdcIixcclxuICAgICAgICAgICAgXCIxMjhcIjogXCJzcmMvYXNzZXRzL2ljb25zL2ljb24tMTI4LnBuZ1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGVybWlzc2lvbnM6IFtcInN0b3JhZ2VcIiwgXCJzY3JpcHRpbmdcIixcImFjdGl2ZVRhYlwiLFwiY29udGV4dE1lbnVzXCIsJ3RhYnMnLFwiY29va2llc1wiXSBhcyBjaHJvbWUucnVudGltZS5NYW5pZmVzdFBlcm1pc3Npb25zW10sXHJcbn0pKTtcclxuIiwgIntcbiAgICBcIm5hbWVcIjogXCJAc25pcC1pdC9jaHJvbWVcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQm9pbGVycGxhdGUgZm9yIENocm9tZSBFeHRlbnNpb24gU3ZlbHRlIFR5cGVzY3JpcHQgcHJvamVjdFwiLFxuICAgIFwidmVyc2lvblwiOiBcIjEuMC4wXCIsXG4gICAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gICAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL25la2l0Y29ycC9jaHJvbWUtZXh0ZW5zaW9uLXN2ZWx0ZS10eXBlc2NyaXB0LWJvaWxlcnBsYXRlLmdpdFwiXG4gICAgfSxcbiAgICBcInNjcmlwdHNcIjoge1xuICAgICAgICBcImRldlwiOiBcInZpdGVcIixcbiAgICAgICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICAgICAgXCJjaGVja1wiOiBcInN2ZWx0ZS1jaGVjayAtLXRzY29uZmlnIC4vdHNjb25maWcuanNvblwiXG4gICAgfSxcbiAgICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgICAgIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI6IFwiMi4wLjAtYmV0YS4xOFwiLFxuICAgICAgICBcIkBzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGVcIjogXCIyLjQuNVwiLFxuICAgICAgICBcIkB0c2NvbmZpZy9zdmVsdGVcIjogXCI1LjAuMlwiLFxuICAgICAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCIwLjAuMjQzXCIsXG4gICAgICAgIFwic3ZlbHRlXCI6IFwiNC4yLjBcIixcbiAgICAgICAgXCJzdmVsdGUtY2hlY2tcIjogXCIzLjUuMFwiLFxuICAgICAgICBcInN2ZWx0ZS1wcmVwcm9jZXNzXCI6IFwiNS4wLjRcIixcbiAgICAgICAgXCJ0c2xpYlwiOiBcIjIuNi4yXCIsXG4gICAgICAgIFwidml0ZVwiOiBcIjQuMi4zXCJcbiAgICB9LFxuICAgIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICAgICAgXCJAc3VwYWJhc2Uvc3VwYWJhc2UtanNcIjogXCJeMi4zMy4xXCIsXG4gICAgICAgIFwiand0LWRlY29kZVwiOiBcIl4zLjEuMlwiXG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UCxTQUFTLFdBQVc7QUFDN1EsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsb0JBQW9COzs7QUNGa1AsU0FBUyxzQkFBc0I7OztBQ0E5UztBQUFBLEVBQ0ksTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsWUFBYztBQUFBLElBQ1YsTUFBUTtBQUFBLElBQ1IsS0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNQLEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULE9BQVM7QUFBQSxFQUNiO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNmLHNCQUFzQjtBQUFBLElBQ3RCLGdDQUFnQztBQUFBLElBQ2hDLG9CQUFvQjtBQUFBLElBQ3BCLGlCQUFpQjtBQUFBLElBQ2pCLFFBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLE9BQVM7QUFBQSxJQUNULE1BQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ1oseUJBQXlCO0FBQUEsSUFDekIsY0FBYztBQUFBLEVBQ2xCO0FBQ0o7OztBRDFCQSxJQUFNLEVBQUUsU0FBUyxNQUFNLFlBQVksSUFBSTtBQUd2QyxJQUFNLENBQUMsT0FBTyxPQUFPLEtBQUssSUFBSSxRQUV6QixRQUFRLGFBQWEsRUFBRSxFQUV2QixNQUFNLE1BQU07QUFFakIsSUFBTywwQkFBUSxlQUFlLE9BQU8sU0FBUztBQUFBLEVBQzFDLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsU0FBUyxHQUFHLFNBQVMsU0FBUztBQUFBLEVBQzlCLGNBQWM7QUFBQSxFQUNkLE9BQU87QUFBQSxJQUNILE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxrQkFBa0IsQ0FBQyxZQUFZO0FBQUEsRUFDL0IsaUJBQWlCO0FBQUEsSUFDYjtBQUFBLE1BQ0ksU0FBUyxDQUFDLFlBQVk7QUFBQSxNQUN0QixJQUFJLENBQUMsc0JBQXNCO0FBQUEsSUFDL0I7QUFBQSxFQUNKO0FBQUEsRUFDQSxZQUFZO0FBQUEsSUFDUixnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1g7QUFBQSxFQUNKO0FBQUEsRUFDQSxhQUFhLENBQUMsV0FBVyxhQUFZLGFBQVksZ0JBQWUsUUFBTyxTQUFTO0FBQ3BGLEVBQUU7OztBRHRDRixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksRUFBRSxrQ0FBUyxDQUFDLENBQUM7QUFBQTtBQUFBO0FBQUEsRUFHckMsUUFBUTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osS0FBSztBQUFBLE1BQ0QsWUFBWTtBQUFBLElBQ2hCO0FBQUEsRUFDSjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
