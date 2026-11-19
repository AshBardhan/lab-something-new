import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Crypto } from "./Types";
import CryptoSummary from "./components/CryptoSummary";
import CryptoSummaryInput from "./components/CryptoSummaryInput";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import moment from "moment";
import { ColorUtils } from "./ColorUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  const [range, setRange] = useState<number>(30);
  const [selectedList, setSelectedList] = useState<Crypto[]>([]);
  const [data, setData] = useState<ChartData<"line">>();
  const [pieData, setPieData] = useState<ChartData<"pie">>();

  const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });

  const options = {
    method: "GET",
    url: "https://api.coingecko.com/api/v3/coins/markets",
    params: {
      vs_currency: "usd",
      x_cg_demo_api_key: "CG-BFZtnAD9szNdFbHYCEBqpseT",
    },
    headers: { accept: "application/json" },
  };

  useEffect(() => {
    axios
      .request(options)
      .then(function (response) {
        setCryptos(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!selected) return;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          selected?.id
        }/market_chart?vs_currency=usd&days=${range}&&interval=daily`,
      )
      .then((response) => {
        setData({
          labels: response.data.prices.map((price: number[]) => {
            return moment.unix(price[0] / 1000).format("MM-DD");
          }),
          datasets: [
            {
              label: "Dataset 1",
              data: response.data.prices.map((price: number[]) => {
                return price[1].toFixed(2);
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Price Over Last ${range} days`,
            },
          },
        });
      });
  }, [selected, range]);

  useEffect(() => {
    if (selectedList.length) {
      setPieData({
        labels: selectedList.map((s) => s.name),
        datasets: [
          {
            label: "My First Dataset",
            data: selectedList.map((s) => s.owned * s.current_price),
            backgroundColor: ColorUtils.getColorList(selectedList.length),
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [selectedList]);

  function updateOwned(crypto: Crypto, amount: number): void {
    let temp = [...selectedList];
    let tempObj = temp.find((c) => c.id === crypto.id);
    if (tempObj) {
      tempObj.owned = amount;
      setSelectedList(temp);
    }
  }

  function onCryptoDelete(crypto: Crypto): void {
    setSelectedList((selectedList) =>
      selectedList.filter((item) => item !== crypto),
    );
  }

  return (
    <>
      <header>
        <h1>Crypto Dashboard</h1>
      </header>
      <section style={{ padding: 20 }}>
        <h2>Crypto Selector with current info and day-wise rate graph</h2>
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <div style={{ flex: "1 0 0" }}>
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              onChange={(e) => {
                const c = cryptos?.find((x) => x.id === e.target.value);
                setSelected(c);
              }}
              defaultValue="default"
            >
              <option value="default">Choose an option</option>
              {cryptos
                ? cryptos.map((crypto) => {
                    return (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name}
                      </option>
                    );
                  })
                : null}
            </select>
          </div>
          <div style={{ flex: "1 0 0" }}>
            <label htmlFor="range">Duration</label>
            <select
              id="range"
              onChange={(e) => {
                setRange(parseInt(e.target.value));
              }}
            >
              <option value={30}>30 Days</option>
              <option value={7}>7 Days</option>
            </select>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {selected ? <CryptoSummary crypto={selected} /> : null}
          {data ? (
            <div style={{ width: 600, maxWidth: "100%", margin: "0 auto" }}>
              <Line options={chartOptions} data={data} />
            </div>
          ) : null}
        </div>
      </section>
      <section style={{ padding: 20 }}>
        <h2>Crypto Portfolio</h2>
        <div style={{ width: "50%", marginBottom: 20 }}>
          <label htmlFor="currency-portfolio">Select Currencies</label>
          <select
            id="currency-portfolio"
            onChange={(e) => {
              const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
              setSelectedList([...selectedList, c]);
            }}
            defaultValue="default"
          >
            <option value="default">Choose an option</option>
            {cryptos
              ? cryptos
                  .filter((crypto) => !selectedList.includes(crypto))
                  .map((crypto) => {
                    return (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name}
                      </option>
                    );
                  })
              : null}
          </select>
        </div>
        <h3 style={{ marginBottom: 20, textAlign: "center" }}>
          {selectedList.length
            ? "Your portfolio is worth: $" +
              selectedList
                .map((s) => {
                  if (isNaN(s.owned)) {
                    return 0;
                  }
                  return s.current_price * s.owned;
                })
                .reduce((prev, current) => prev + current, 0)
                .toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
            : null}
        </h3>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: "1 0 0" }}>
            {selectedList.length ? (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {selectedList.map((s) => (
                  <CryptoSummaryInput
                    crypto={s}
                    onCryptoDelete={onCryptoDelete}
                    updateOwned={updateOwned}
                  />
                ))}
              </div>
            ) : null}
          </div>
          <div style={{ flex: "1 0 0" }}>
            {pieData && selectedList.length ? (
              <div style={{ width: 600 }}>
                <Pie data={pieData} />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
