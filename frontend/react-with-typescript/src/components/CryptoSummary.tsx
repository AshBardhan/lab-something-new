import { Crypto } from "../Types";

export type AppProps = {
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
  return (
    <>
      <h3>
        {crypto.name}
        <span style={{ margin: "0 5px", fontWeight: "normal" }}>@</span>$
        {crypto.current_price}
      </h3>
    </>
  );
}
