module.exports = {
  all: {
    options: {
      //banner: '<%= banner %>',
      stripBanners: {
        line: true
      },
    },
    files: {
      'dist/<%= pkg.name %>.min.js': [ 'dist/<%= pkg.name %>.js' ]
    }
  }
};