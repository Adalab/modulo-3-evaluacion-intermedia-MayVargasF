function getDataApi() {
  return fetch(
    "https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json"
  )
    .then((response) => response.json())
    .then((dataApi) => {
      return dataApi;
    });
}

export default getDataApi;
