const mix = require("laravel-mix")
const tailwind = require("tailwindcss")

mix.sass("src/css/app.scss", "dist/app.css");

mix.js("src/js/app.js", "dist/app.js").vue();


mix.postCss("src/css/tailwind.css", "dist/tailwind.css", [
    require("postcss-import"),
    tailwind({ config: "tailwind.config.js" }),
])
