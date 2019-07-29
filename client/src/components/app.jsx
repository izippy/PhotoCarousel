/* eslint-disable prefer-destructuring */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';

import ProfilePicture from './ProfilePicture';
import SubPictures from './SubPictures';
import ExtraPictures from './ExtraPictures';
import Slideshow from './Slideshow';
import styles from './style/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
      currHeight: window.innerHeight,
      currWidth: window.innerWidth,
      threshold: 1128,
      lastThreshold: 744,
      modalView: false,
      modalFocus: '',
      profileOpacity: 1,
      photoTwoOpacity: 1,
      photoThreeOpacity: 1,
      photoFourOpacity: 1,
      photoFiveOpacity: 1,
      hoverFour: false,
      hoverFive: false,

    };

    this.getListingPhotos = this.getListingPhotos.bind(this);
    this.hoverHandler = this.hoverHandler.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.exitModal = this.exitModal.bind(this);
    this.clickExitModal = this.clickExitModal.bind(this);
  }

  componentDidMount() {
    this.getListingPhotos();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getListingPhotos() {
    const parts = window.location.href.split('/');
    const id = parts[parts.length - 2];

    axios.get(`/api/listings/photos/initial/${id}`)
      .then((response) => {
        this.setState({
          photos: response.data,
        }, () => {
          axios.get(`/api/listings/photos/${id}`)
            .then((response) => {
              const { photos } = this.state;
              let allPhotos = photos.slice();
              allPhotos = allPhotos.concat(response.data);
              this.setState({
                photos: allPhotos,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateDimensions() {
    this.setState({
      currWidth: window.innerWidth,
      currHeight: window.innerHeight,
    });
  }

  clickHandler(focus) {
    let tmp = 0;
    switch (focus) {
      case 'profile':
        tmp = 0;
        break;
      case 'two':
        tmp = 1;
        break;
      case 'three':
        tmp = 2;
        break;
      case 'four':
        tmp = 3;
        break;
      case 'five':
        tmp = 4;
        break;

      default:
        break;
    }

    this.setState({
      modalView: true,
      modalFocus: tmp,
    });
  }

  hoverHandler(focus) {
    if (focus === 'profile') {
      this.setState({
        profileOpacity: 1,
        photoTwoOpacity: 0.7,
        photoThreeOpacity: 0.7,
        photoFourOpacity: 0.7,
        photoFiveOpacity: 0.7,
      });
    }

    if (focus === 'two') {
      this.setState({
        profileOpacity: 0.7,
        photoTwoOpacity: 1,
        photoThreeOpacity: 0.7,
        photoFourOpacity: 0.7,
        photoFiveOpacity: 0.7,
      });
    }

    if (focus === 'three') {
      this.setState({
        profileOpacity: 0.7,
        photoTwoOpacity: 0.7,
        photoThreeOpacity: 1,
        photoFourOpacity: 0.7,
        photoFiveOpacity: 0.7,
      });
    }

    if (focus === 'four') {
      this.setState({
        profileOpacity: 0.7,
        photoTwoOpacity: 0.7,
        photoThreeOpacity: 0.7,
        photoFourOpacity: 1,
        photoFiveOpacity: 0.7,
      });
    }

    if (focus === 'five') {
      this.setState({
        profileOpacity: 0.7,
        photoTwoOpacity: 0.7,
        photoThreeOpacity: 0.7,
        photoFourOpacity: 0.7,
        photoFiveOpacity: 1,
      });
    }

    if (focus === 'clear') {
      this.setState({
        profileOpacity: 1,
        photoTwoOpacity: 1,
        photoThreeOpacity: 1,
        photoFourOpacity: 1,
        photoFiveOpacity: 1,
      });
    }
  }

  exitModal() {
    const { modalView } = this.state;

    this.setState({
      modalView: !modalView,
    });
  }

  clickExitModal() {
    const { modalView } = this.state;

    this.setState({
      modalView: !modalView,
      profileOpacity: 0.7,
      photoTwoOpacity: 0.7,
      photoThreeOpacity: 0.7,
      photoFourOpacity: 1,
      photoFiveOpacity: 0.7,
    });
  }

  render() {
    const {
      photos, windowHeight, windowWidth, profileOpacity, currWidth, currHeight,
      photoTwoOpacity, photoThreeOpacity, photoFourOpacity, photoFiveOpacity,
      threshold, lastThreshold, modalView, modalFocus, exitModal, hoverFour, hoverFive,
    } = this.state;
    return (
      <div className={styles.photoCarousel}>
        {photos.length > 0
          ? (
            <ProfilePicture
              photo={photos[0].photoUrl}
              tinyPhoto={photos[0].tinyphotoUrl}
              hoverHandler={this.hoverHandler}
              clickHandler={this.clickHandler}
              totalWidth={windowWidth}
              totalHeight={windowHeight}
              opacity={profileOpacity}
              currWidth={currWidth}
              threshold={threshold}
              lastThreshold={lastThreshold}
            />
          )
          : undefined
        }
        {photos.length >= 3 && currWidth > lastThreshold
          ? (
            <SubPictures
              photos={[photos[1].photoUrl, photos[2].photoUrl]}
              tinyPhotos={[photos[1].tinyphotoUrl, photos[2].tinyphotoUrl]}
              totalWidth={windowWidth}
              totalHeight={windowHeight}
              opacityTwo={photoTwoOpacity}
              opacityThree={photoThreeOpacity}
              hoverHandler={this.hoverHandler}
              clickHandler={this.clickHandler}
              threshold={threshold}
            />
          )
          : undefined
        }
        {photos.length >= 5 && currWidth > threshold
          ? (
            <ExtraPictures
              photos={[photos[3].photoUrl, photos[4].photoUrl]}
              tinyPhotos={[photos[3].tinyphotoUrl, photos[4].tinyphotoUrl]}
              totalWidth={windowWidth}
              totalHeight={windowHeight}
              opacityFour={photoFourOpacity}
              opacityFive={photoFiveOpacity}
              hoverFour={hoverFour}
              hoverFive={hoverFive}
              hoverHandler={this.hoverHandler}
              clickHandler={this.clickHandler}
              threshold={threshold}
            />
          )
          : undefined
        }
        {photos.length > 0 && modalView
          ? (
            <Slideshow
              modalFocus={modalFocus}
              totalWidth={windowWidth}
              totalHeight={windowHeight}
              exitModal={this.exitModal}
              photos={photos}
              modalView={modalView}
              clickExitModal={this.clickExitModal}
            />
          )
          : undefined
         }
        <div className={styles.buttonThreeContainer}>
          <button type="button" className={styles.buttonThree} aria-busy="false" data-veloute="hero-view-photos-button" onClick={this.clickHandler}>
            <span className={styles.buttonThreeSpan}>View Photos</span>
          </button>
        </div>
        <div className={styles.topButtonsContainer}>
          <div className={styles.topButtonsInner}>
            <div className={styles.buttonOneContainer}>
              <div className={styles.buttonOneInner}>
                <button type="button" className={styles.buttonOne} aria-busy="false">
                  <span className={styles.buttonOneSpan}>
                    <div className={styles.buttonOneText} style={{ justifyContent: 'center' }}>
                      <div className={styles.buttonOneIcon}>
                        <div style={{ marginRight: '12px' }}>
                          <svg
                            style={{
                              height: '15px', width: '15px', display: 'block', overflow: 'visible',
                            }}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            fillOpacity="0"
                            stroke="currentColor"
                            strokeWidth="2.25"
                            focusable="false"
                            aria-hidden="true"
                            role="presentation"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <g fillRule="evenodd">
                              <path d="m11.5 16v-15" />
                              <path d="m7.5 4 4-3 4 3" />
                              <path d="m5.4 9.5h-3.9v14h20v-14h-3.1" />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className={styles.buttonOneShare}>
                        <div>Share</div>
                      </div>
                    </div>
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.buttonTwoContainer} style={{ marginLeft: '18px' }}>
              <span>
                <div className={styles.buttonTwoInner}>
                  <span id="save-button-accessible-text" aria-hidden="true" className={styles.buttonTwoAccessSpan}>Save this listing.</span>
                  <button type="button" className={styles.buttonTwo} aria-describedby="save-button-accessible-text" aria-busy="false">
                    <span className={styles.buttonTwoSpan}>
                      <div className={styles.buttonTwoText} style={{ justifyContent: 'center' }}>
                        <div className={styles.buttonTwoIcon}>
                          <div style={{ marginRight: '12px' }}>
                            <svg
                              style={{
                                height: '15px', width: '15px', display: 'block', overflow: 'visible',
                              }}
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              fillOpacity="0"
                              stroke="#484848"
                              strokeWidth="2.25"
                              focusable="false"
                              aria-label="Save this listing."
                              role="img"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </div>
                        <div className={styles.buttonTwoSave}>
                          <div>Save</div>
                        </div>
                      </div>
                    </span>
                  </button>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
