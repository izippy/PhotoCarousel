/* eslint-disable class-methods-use-this */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import styles from './style/Slideshow.css';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currIndex: this.props.modalFocus,
      translationAmount: -34,
    };

    this.nextPictureHandler = this.nextPictureHandler.bind(this);
    this.prevPictureHandler = this.prevPictureHandler.bind(this);
    this.logKey = this.logKey.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
  }

  componentDidMount() {
    const { currIndex, translationAmount } = this.state;
    let tmp = translationAmount;
    window.addEventListener('keydown', this.logKey);

    switch (currIndex) {
      case 0:
        tmp = 8;
        break;
      case 1:
        tmp = 8;
        break;
      case 2:
        tmp = -34;
        break;
      default:
        tmp -= ((currIndex - 2) * 80);
        break;
    }

    if (tmp !== translationAmount) {
      this.setState({
        translationAmount: tmp,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.logKey);
  }

  logKey({ code }) {
    const { exitModal } = this.props;
    if (code === 'ArrowRight') {
      this.nextPictureHandler();
    } if (code === 'ArrowLeft') {
      this.prevPictureHandler();
    } else if (code === 'Escape') {
      exitModal();
    }
  }

  nextPictureHandler() {
    const { currIndex, translationAmount } = this.state;
    const { photos } = this.props;
    const tmp = currIndex + 1;
    let amt = translationAmount - 80;

    if (currIndex === 0 || currIndex === photos.length - 1) {
      amt = 8;
    }

    if (currIndex === 1) {
      amt = -34;
    }

    if (currIndex === photos.length - 2) {
      amt = translationAmount;
    }

    if (currIndex !== photos.length - 1) {
      this.setState({
        currIndex: tmp,
        translationAmount: amt,
      });
    } else {
      this.setState({
        currIndex: 0,
        translationAmount: amt,
      });
    }
  }

  prevPictureHandler() {
    const { currIndex, translationAmount } = this.state;
    const { photos } = this.props;
    const tmp = currIndex - 1;
    let amt = translationAmount + 80;

    if (currIndex === 0) {
      amt = -34 - (photos.length - 4) * 80;
    }

    if (currIndex === 1 || currIndex === 2) {
      amt = 8;
    }

    if (currIndex === 3) {
      amt = -34;
    }

    if (currIndex === photos.length - 1) {
      amt = translationAmount;
    }

    if (currIndex !== 0) {
      this.setState({
        currIndex: tmp,
        translationAmount: amt,
      });
    } else {
      this.setState({
        currIndex: photos.length - 1,
        translationAmount: amt,
      });
    }
  }

  changeFocus({ target }) {
    const { currIndex, translationAmount } = this.state;
    const clicked = Number(target.getAttribute('index'));
    let tmp = translationAmount;
    let amount = 0;

    switch (clicked) {
      case 0:
        tmp = 8;
        break;
      case 1:
        tmp = 8;
        break;
      case 2:
        tmp = -34;
        break;
      case 3:
        tmp = -114;
        break;
      default:
        if (clicked < currIndex) {
          amount = currIndex - clicked;
          tmp += (amount * 80);
        } else {
          amount = clicked - currIndex;
          tmp -= (amount * 80);
        }
        break;
    }

    this.setState({
      currIndex: clicked,
      translationAmount: tmp,
    });
  }

  render() {
    const { exitModal, clickExitModal, modalFocus, photos, modalView } = this.props;
    const { currIndex, translationAmount } = this.state;
    return (
      <div className={styles.topmostSlideshow} style={{ visibility: modalView }}>
        <div>
          <div dir="ltr">
            <div role="dialog" className={styles.modal} style={{ zIndex: 2000 }}>
              <div data-veloute="slideshow-modal" className={styles.slideshowModal}>
                <div className={styles.slideshowElements}>
                  <div className={styles.slideshowContainer}>
                    <div>
                      <div>
                        <div className={styles.exitButton}>
                          <button type="button" className={styles.hiddenButton} aria-busy="false" style={{ padding: 15 }} onClick={exitModal}>
                            <svg
                              viewBox="0 0 24 24"
                              role="img"
                              aria-label="Close"
                              focusable="false"
                              style={{
                                height: 24, width: 24, display: 'block', fill: 'rgb(72, 72, 72)',
                              }}
                            >
                              <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="full">
                      <div className={styles.photoContainer}>
                        <div className={styles.photoDisplay}>
                          <div>
                            <button type="button" name="Previous" className={styles.leftButton} onClick={this.prevPictureHandler}>
                              <svg viewBox="0 0 18 18" name="Previous" role="presentation" aria-hidden="true" focusable="false" style={{ height: 24, width: 24, fill: 'rgb(72, 72, 72)' }}>
                                <path name="Previous" d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd" />
                              </svg>
                            </button>
                            <button type="button" name="Next" className={styles.rightButton} onClick={this.nextPictureHandler}>
                              <svg viewBox="0 0 18 18" name="Next" role="presentation" aria-hidden="true" focusable="false" style={{ height: 24, width: 24, fill: 'rgb(72, 72, 72)' }}>
                                <path name="Next" d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <img className={styles.hiddenPicture} aria-hidden="true" src={photos[currIndex].photoUrl} alt="" />
                          <div>
                            <img
                              src={photos[currIndex].photourl}
                              alt=""
                              id="mainPicture"
                              onClick={this.nextPictureHandler}
                              data-veloute="slideshow-image"
                              style={{
                                maxHeight: '75vh', objectFit: 'cover', cursor: 'pointer', zIndex: 2, borderRadius: 16, position: 'absolute', maxWidth: '85%', margin: '0px auto', top: 0, left: 0, right: 0, bottom: 0,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className={styles.miniCarouselContainer}>
                        <div className={styles.miniCarouselPad}>
                          <div className={styles.miniCarouselBottom}>
                            <div className={styles.miniCarouselOuter}>
                              <div className={styles.miniCarouselInner}>
                                <div />
                                <div className={styles.leftEdge} />
                                <div className={styles.rightEdge} />
                                <div className={styles.imageCenterer}>
                                  <div className={styles.miniContainer}>
                                    <ul className={styles.translator} style={{ transform: `translateX(${(translationAmount)}px)` }}>
                                      {photos.map(element => (
                                        element.priority === currIndex
                                          ? (
                                            <li className={styles.miniFocus} key={element.priority}>
                                              <div index="0" className={styles.miniFocusButton} aria-label={`1/${photos.length}: ${photos[element.priority].description}`}>
                                                <img src={photos[element.priority].photourl} alt="" className={styles.miniImage} />
                                              </div>
                                            </li>
                                          )
                                          : (
                                            <li className={styles.miniEntry} key={element.priority} onClick={this.changeFocus}>
                                              <div index={element.priority} className={styles.miniEntryButton} aria-label={`${element.priority}/${photos.length}: ${photos[element.priority].description}`}>
                                                <img src={photos[element.priority].photourl} alt="" index={element.priority} className={styles.miniImage} />
                                              </div>
                                            </li>
                                          )
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.descriptionContainer}>
                          <div style={{ marginBottom: '16px' }}>
                            <div className={styles.indexCounter}>
                              {currIndex + 1}/{photos.length}
                            </div>
                          </div>
                          <div className={styles.captionContainer}>
                            <div className={styles.caption}>
                              {photos[currIndex].description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Slideshow;
