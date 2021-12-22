import "./1inch.css";

export const OneInch = ({ src, name, balance }) => (
  <app-account-button
    _ngcontent-yhg-c276=""
    class="header-account-button-host ng-star-inserted"
    _nghost-yhg-c273=""
  >
    <button
      _ngcontent-yhg-c273=""
      data-id="header.account-button"
      class="account-button ng-star-inserted"
    >
      <nft-avatar
        _ngcontent-yhg-c273=""
        class="account-button-wallet-icon ng-star-inserted"
        _nghost-yhg-c271=""
      >
        <img
          _ngcontent-yhg-c271=""
          alt="avatar"
          class="nft-avatar ng-star-inserted"
          src={src}
        />
      </nft-avatar>
      <span
        _ngcontent-yhg-c273=""
        class="account-button-balance ng-star-inserted"
      >
        <span _ngcontent-yhg-c273="">{balance} </span>
        <span _ngcontent-yhg-c273="">ETH</span>
      </span>
      <span
        _ngcontent-yhg-c273=""
        class="account-button-inner-wrap account-button-gray ng-star-inserted"
      >
        <span _ngcontent-yhg-c273="" class="ng-star-inserted">
          {name}
        </span>
      </span>
    </button>
  </app-account-button>
);
