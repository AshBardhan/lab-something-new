import { Crypto } from "../Types";
import { useState } from "react";

export type AppProps = {
  crypto: Crypto;
  onCryptoDelete: (crypto: Crypto) => void;
  updateOwned: (crypto: Crypto, amount: number) => void;
};

export default function CryptoSummary({
  crypto,
  onCryptoDelete,
  updateOwned,
}: AppProps): JSX.Element {
  const [amount, setAmount] = useState<number>(0);

  return (
    <div
      style={{
        border: "1px solid",
        padding: "10px 15px",
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          fontSize: "10px",
          cursor: "pointer",
        }}
        onClick={() => onCryptoDelete(crypto)}
      >
        X
      </span>
      <h4 style={{ marginBottom: 10 }}>
        {crypto.name}
        <span style={{ margin: "0 5px", fontWeight: "normal" }}>@</span>$
        {crypto.current_price}
      </h4>
      <div style={{ marginBottom: 10 }}>
        <label htmlFor={`unit-${crypto.name}`}>Units</label>
        <br />
        <input
          type="number"
          id={`unit-${crypto.name}`}
          value={amount}
          min={0}
          onChange={(e) => {
            setAmount(parseFloat(e.target.value));
            updateOwned(crypto, parseFloat(e.target.value));
          }}
        ></input>
      </div>
      <p style={{ margin: 0 }}>
        <span style={{ fontWeight: "bold" }}>Total: </span>
        {isNaN(amount)
          ? "$0.00"
          : "$" +
            (crypto.current_price * amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
      </p>
    </div>
  );
}
