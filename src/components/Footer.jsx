import { photography, photoSource, stockPhotos } from "../data/photography.js";

const allPhotos = Object.keys(photography).length;

export default function Footer() {
  return (
    <>
      <footer>
        <div className="page-width">
          <div className="footer-wordmark" aria-hidden="true"><span>J&O</span><span>ROOTED HERE.<br />GROWING TOGETHER.</span></div>
          <div className="footer-top">
            <a className="brand footer-brand" href="#home">
              <span className="brand-type">
                J<span className="amp">&</span>O
                <span className="brand-caption">FARM PRODUCE LTD</span>
              </span>
            </a>
            <p>
              Joseph & Owura Farm Produce Ltd.
              <br />
              <span className="footer-address">Ankwensu, Eastern Region, Ghana.</span>
            </p>
            <a href="#home" className="back-top">
              BACK TO TOP <span>↑</span>
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> J&O Farm Produce Ltd.
            </span>
            <span>
              Ghanaian owned.{" "}
              <span
                className="ghana-flag"
                role="img"
                aria-label="Ghana flag"
              ></span>
            </span>
            {stockPhotos.length > 0 && (
              <span className="image-credit">
                {stockPhotos.length === allPhotos ? "Agricultural imagery is illustrative." : "Some imagery is illustrative stock photography."}
              </span>
            )}
          </div>
          {stockPhotos.length > 0 && (
            <details className="photo-credits">
              <summary>Photography & credits</summary>
              <p>Stock agricultural photography from Pexels. These images illustrate our work and products; they do not depict J&O’s farm or team. Used under the <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Pexels License</a>.</p>
              <ul>{stockPhotos.map((photo) => <li key={photo.id}><a href={photoSource(photo)} target="_blank" rel="noopener noreferrer">{photo.file.replaceAll("-", " ")} ↗</a></li>)}</ul>
            </details>
          )}
        </div>
      </footer>
    </>
  );
}
