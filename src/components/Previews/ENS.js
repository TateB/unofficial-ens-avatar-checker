import "../AvatarDisplays/fonts.css";
import "./ens.css";

export const ENSAv = ({ name, src, address }) => (
  <div class="sc-bdvvtL gUMjcu">
    <img src={src} class="sc-dkPtRN cluRKA" alt="ens av preview" />
    <div class="sc-gsDKAQ dWarUD">
      <div class="sc-eCImPb iTzboV">{name}</div>
      <div class="sc-gKclnd fjJuTI">
        {address.substring(0, 5) + "..." + address.substring(37, 42)}
      </div>
    </div>
  </div>
);
