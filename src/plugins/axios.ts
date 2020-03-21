export default function({ $axios }) {
  $axios.setToken('access_token')
  // 注: ここの引数を今は使わないからと _ とかにするとエラーになる
  $axios.onResponse(() => {
    $axios.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  })
}
