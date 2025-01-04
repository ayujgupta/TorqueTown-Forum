import "./index.css";

function Advertise() {
  return (
    <div id="advertise-aside">
      <img
        className="advertise-aside-image"
        loading="lazy"
        src="https://images.hindustantimes.com/auto/img/2024/09/21/1600x900/Windsor_EV_1726898438105_1726898617131.jpg"
        alt="AD"
      />
        <div className="ad-overlay">Sponsored</div>
    </div>
  );
}

export default Advertise;
