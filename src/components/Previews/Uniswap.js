import "./uniswap.css";

export const Uniswap = ({ src, name, balance }) => (
  <div className="sc-pradxg-2 eYKaTH">
    <div className="sc-pradxg-4 eKBEJz">
      <div
        style={{ flexShrink: 0, userSelect: "none" }}
        className="sc-pradxg-7 hrpuPc css-8visvh"
      >
        {balance} ETH
      </div>
      <button
        id="web3-status-connected"
        className="sc-bdnxRM bhVlig sc-fwrjc2-0 sc-fwrjc2-4 sc-m6ivbz-1 sc-m6ivbz-4 dZkESD keLaW jYJKNI edqdsq"
      >
        <p className="sc-m6ivbz-5 cijhrM">{name}</p>
        <div size="16" className="sc-m6ivbz-0 kdRIeL">
          <img src={src} alt="uniswap preview" />
        </div>
      </button>
    </div>
  </div>
);
