
import React, { Component } from 'react'

class Continuum extends Component {
  render() {
    return (
      <div className="continuums-wrapper">
        <div className="continuum-wrapper">
          <div className="continuum-img-wrapper">
            <div className="continuum-value">
              <div className="continuum-value-img"><img className="continuum-img" alt="Equality" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471674/politipoint/axis/equality_n7pfnb.png' /></div>
            </div>
            <div className="continuum-arrow"><img className="continuum-img" alt="Economic" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/economic_arrow_ghcmyr.png' /></div>
            <div className="continuum-value">
              <div className="continuum-value-img"><img className="continuum-img" alt="Markets" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/markets_nivxqb.png' /></div>
            </div>
          </div>
          <div className="continuum-values-wrapper">
            <ul className="continuum-li-value">
              <li>Economic value evenly distributed to the people</li>
              <li>Favors progressive taxes</li>
              <li>Supports social programs</li>
              <li>Tends towards socialism</li>
            </ul>
            <div className="continuum-li-spacer"></div>
            <ul className="continuum-li-value">
              <li>Growth focused ecomomy</li>
              <li>Favors lower taxes</li>
              <li>Competition / Deregulation</li>
              <li>Tends towards laissez-faire capitalism</li>
            </ul>
          </div>
        </div>

        <div className="continuum-wrapper">
          <div className="continuum-img-wrapper">
            <div className="continuum-value">
              <div className="continuum-value-img"><img className="continuum-img" alt="World" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/world_gsftlk.png' /></div>
            </div>
            <div className="continuum-arrow"><img className="continuum-img" alt="Diplomatic" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471313/politipoint/axis/diplomatic_arrow_vmecko.png' /></div>
            <div className="continuum-value">
              <div className="continuum-value-img"><img className="continuum-img" alt="Nation" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/nation_ovlorq.png' /></div>
            </div>
          </div>
          <div className="continuum-values-wrapper">
            <ul className="continuum-li-value">
              <li>Cooperative, globalist</li>
              <li>Favors peaceful foreign policy</li>
              <li>Values cooperations among nations</li>
              <li>Tends towards world government</li>
            </ul>
            <div className="continuum-li-spacer"></div>
            <ul className="continuum-li-value">
              <li>Patriotic, nationalist</li>
              <li>Favors assertive foreign policy</li>
              <li>Values military strength, sovereignty</li>
              <li>Tends toward territorial expansion</li>
            </ul>
          </div>
        </div>

        <div className="continuum-wrapper">
          <div className="continuum-img-wrapper">
            <div className="continuum-value">
              <div className="continuum-value-img"><img alt="Authority" className="continuum-img" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/authority_ymkmvq.png' /></div>
            </div>
            <div className="continuum-arrow"><img className="continuum-img" alt="Civil" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/civil_arrow_q25oco.png' /></div>
            <div className="continuum-value">
              <div className="continuum-value-img"><img alt="Liberty" className="continuum-img" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/liberty_cmq4hm.png' /></div>
            </div>
          </div>
          <div className="continuum-values-wrapper">
            <ul className="continuum-li-value">
              <li>Favors strong government</li>
              <li>Values state protection, management and intervention</li>
              <li>Tends towards surveillance, autocracy</li>
            </ul>
            <div className="continuum-li-spacer"></div>
            <ul className="continuum-li-value">
              <li>Champions limited government</li>
              <li>Favors strong civil freedoms of speech, religion, assembly, privacy</li>
              <li>Tends towards anarchism</li>
            </ul>
          </div>
        </div>

        <div className="continuum-wrapper">
          <div className="continuum-img-wrapper">
            <div className="continuum-value">
              <div className="continuum-value-img"><img alt="Progress" className="continuum-img" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/progress_ygaeoo.png' /></div>
            </div>
            <div className="continuum-arrow"><img className="continuum-img" alt="Societal" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471315/politipoint/axis/societal_arrow_jcgkii.png' /></div>
            <div className="continuum-value">
              <div className="continuum-value-img"><img alt="Tradition" className="continuum-img" src='https://res.cloudinary.com/fergusdev/image/upload/v1603471314/politipoint/axis/tradition_lgt21n.png' /></div>
            </div>
          </div>
          <div className="continuum-values-wrapper">
            <ul className="continuum-li-value">
              <li>Usually secular</li>
              <li>Favors science / reason</li>
              <li>Embraces change</li>
            </ul>
            <div className="continuum-li-spacer"></div>
            <ul className="continuum-li-value">
              <li>Usually religious</li>
              <li>Values cultural heritage</li>
              <li>Holds the status quo</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Continuum
