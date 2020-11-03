// some insane hack from https://gist.github.com/zapad7715/9ff593d87f1a040f9129565d024f8a95 that I don't care to understand

const { environment } = require('@rails/webpacker')
const vue =  require('./loaders/vue')

environment.loaders.append('vue', vue)

const resolver = {
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
environment.config.merge(resolver)

module.exports = environment
