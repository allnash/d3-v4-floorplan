module.exports = {
  app: {
    options: {
      //banner: '<%= banner %>',
      //browserifyOptions: {
      //  debug: true
      //},
      //debug: true,
    },
    src: ['src/index.js'],
    dest: 'dist/<%= pkg.name %>.js'
  }
};