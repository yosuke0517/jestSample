import Vue from 'vue'

Vue.filter('favoriteFilter', function(value: number) {
  console.log('value')
  console.log(value)
  if (value === 0) {
    return 'true'
  } else {
    return 'false'
  }
})
