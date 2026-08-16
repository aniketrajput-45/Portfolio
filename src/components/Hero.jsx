import userPhoto from '../assets/user_photo.jpg';

export default function Hero({ onNavClick }) {
  return (
    <section id="home" className="content-section">
      <div className="olha-hero">
        {/* Golden ratio numeric decoration */}
        <div className="olha-hero__number">1,618</div>

        {/* Hero title and portrait wrapper */}
        <div className="olha-hero__main">
          <h1 className="olha-hero__title-line">
            <span className="olha-hero__title-word">CREATIVE DEVELOPER</span>
          </h1>

          {/* Grayscale portrait image overlay */}
          <div className="olha-hero__photo-wrap">
            <img 
              src={userPhoto} 
              alt="Aniket Kumar Singh portrait" 
              className="olha-hero__photo" 
            />
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="olha-hero__details">
          <div className="olha-hero__left">
            <span className="olha-hero__left-item">/FULL STACK DEVELOPMENT</span>
            <span className="olha-hero__left-item">/JAVA &amp; MERN STACK</span>
            <span className="olha-hero__left-item">/DSA &amp; PROBLEM SOLVING</span>
          </div>
          <div className="olha-hero__right">
            BASED IN INDIA
          </div>
        </div>
      </div>
    </section>
  );
}
