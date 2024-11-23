const { postcss } = require("tailwindcss");
const { plugins } = require("./tailwind.config");

module.exports={
    style:{
        postcss:{
            plugins:[
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
}