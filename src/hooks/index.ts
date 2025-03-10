import axios from "axios";

function getCoinPrices(timePeriod: string, uuid: string) {
  axios
    .get(
      `https://coinranking1.p.rapidapi.com/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,
      {
        headers: {
          "x-rapidapi-host": "coinranking1.p.rapidapi.com",
          "x-rapidapi-key":
            "563d69b512msh7bba372892bb780p1204e7jsnbde610954627",
        },
      }
    )
    .then((res) => {
      console.log("From Hooks: " + res.data);
      return res;
    })
    .catch((e) => console.error(e));
}
export default getCoinPrices;
