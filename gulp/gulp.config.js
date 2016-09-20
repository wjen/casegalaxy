module.exports = {
  build_dir: 'build',
  app_files: {
    js: ['public/**/*.js'],
    tpl_src: ['./build/vendor/**/*.js',
      './build/controllers/**/*.js',
      './build/js/**/*.js',
      './build/services/**/*.js',
      './build/bower_components/ngCart/dist/ngCart.js',
      './build/assets/css/**/*.css']
  }
}
