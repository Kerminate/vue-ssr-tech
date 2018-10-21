const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  preserveWhitespace: true, // 若为 false，模版中 HTML 标签之间的空格将会被忽略
  extractCSS: isDev,
  cssModules: {},
}