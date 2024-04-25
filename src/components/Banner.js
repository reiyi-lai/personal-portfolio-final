import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Product Enthusiast", "Full-time Eater" ];
  const period = 2000;
  // const greeting = {
  //   resumeLink:
  //     "https://docs.google.com/document/d/1UDrsXQoNATLmt1D0Dr_03HRp9VmB9Jn2zRVWIOOrI60/edit?usp=sharing", // Set to empty to hide the button
  //   displayGreeting: true // Set false to hide this section, defaults to true
  // };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I am Rachel`}</h1> 
                <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Product Enthusiast", "Full-time Eater" ]'><span className="wrap">{text}</span></span>
                  <p>I enjoy transforming ideas into reality with functional software and clear design.</p>
                  <button onClick={() => window.open("https://drive.google.com/file/d/1ks7hg8j2-R-4OIwSTDIW_UkYHjonnItq/view?usp=sharing", "_blank")}>See My Resume <ArrowRightCircle size={25} href="https://drive.google.com/file/d/1ks7hg8j2-R-4OIwSTDIW_UkYHjonnItq/view?usp=sharing"/></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
