// import Vue from 'vue'

// Vue.filter('favoriteFilter', function(value: number) {
//   console.log('value')
//   console.log(value)
//   if (value === 0) {
//     return 'true'
//   } else {
//     return 'false'
//   }
// })

import Vue from 'vue'

Vue.filter('favoriteFilter', (value: boolean) => {
  if (value) {
    return 'fas fa-star favo'
  } else {
    return 'far fa-star '
  }
})
