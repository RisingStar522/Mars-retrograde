import "./styles.css";
import React, { useEffect, useRef, useState } from "react";

import gsap, {Elastic, TweenMax} from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { TweenLite } from "gsap/gsap-core";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const style = { width: 600, margin: 50 };

gsap.registerPlugin(MotionPathPlugin);
gsap.registerPlugin(DrawSVGPlugin);

export default function App() {
 
  const [t1, setT1] = useState();
  const [t2, setT2] = useState();

  let targets = document.querySelectorAll(".point");
  const [value, setValue] = useState(0);
  const sliderProps = {
    min: 0.0,
    max: 1.0,
    step: 0.001
  };
  
  // Polyfill for getTransformToElement
  SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function(toElement) {
    return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());  
  };

  const updateSlider = () => {
    setValue(t1.progress());
  }

  const onSliderChange = (val) => {
    console.log("val = ", val);
    console.log("t2 = ", t2, " ", t2.duration());
    t1 && t1.progress(val); 
    t2 && t2.progress(val);
  }

  const onBeforeChange = () => {
    t1 && t1.pause();
    t2 && t2.pause();
  }

  const onAfterChange = (val) => {
    setValue(val);
	};

  useEffect(() => {
    if (t1) {
      for (let i = 0; i < targets.length; i++) {
        t1.from(targets[i], 0.2, {attr:{r:0}, ease: Elastic.easeOut, onUpdate: updateSlider});
      }
      console.log("t1 =>", t1.duration())
    }
  }, [t1]);

  useEffect(() => {
    const sp = 40; // line percentage to show (1-99)
    const duration = 3; // change the duration
    const overlapDuration = sp/100 * duration; // allocate the proper percentage of the duration to the overlap
    const mainDuration = duration - overlapDuration; // remainder of duration for main animation
    const drawTurn = "0% " + sp + "%";

    TweenLite.defaultEase = "none"; // needed for seamless loops
    TweenMax.set("#mercuryMovePath", {drawSVG:0}); // start lines at 0

    t2 && t2.to("#mercuryMovePath", overlapDuration, {drawSVG:drawTurn}, 7)
      .to("#mercuryMovePath", mainDuration, {drawSVG:100-sp + "%" + " 100%" })
      .to("#mercuryMovePath", overlapDuration, {drawSVG:"100% 100%" });
  }, [t2]);

  useEffect(() => {
    const t1 = gsap.timeline();
    setT1(t1);
    const t2 = gsap.timeline();
    setT2(t2);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div class="ribbon">
          <a href="https://github.com/RisingStar522/Mars-retrograde">Fork me on GitHub</a>
        </div>
        <div className="svg-container">
          {/* <svg id="demo" xmlns="http://www.w3.org/2000/svg" width="3200" height="3200" viewBox="0 0 800 800"> */}
          <svg id="demo" xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 120 120">
            <text x="10" y="10">
              <tspan id="title" >Mars Retrograde</tspan>
            </text>   
            <g><circle className="point" cx="350.49" cy="44.18" r="2" /></g>
            <g><circle className="point" cx="326.5" cy="53.15" r="2" /></g>
            <g><circle className="point" cx="294.52655029296875" cy="66.41773986816406" r="2" /></g>
            <g><circle className="point" cx="268.5154724121094" cy="77.34548950195312" r="2" /></g>
            <g><circle className="point" cx="246.1396942138672" cy="85.94622802734375" r="2" /></g>
            <g><circle className="point" cx="216.0994415283203" cy="97.2822265625" r="2" /></g>
            <g><circle className="point" cx="180.37796020507812" cy="110.72189331054688" r="2" /></g>
            <g><circle className="point" cx="154.4497833251953" cy="120.45310974121094" r="2" /></g>
            <g><circle className="point" cx="117.00212097167969" cy="134.21478271484375" r="2" /></g>
            <g><circle className="point" cx="94.97606658935547" cy="141.47540283203125" r="2" /></g>
            <g><circle className="point" cx="78.70694732666016" cy="145.95680236816406" r="2" /></g>
            <g><circle className="point" cx="66.43515014648438" cy="149.310546875" r="2" /></g>
            <g><circle className="point" cx="57.80492401123047" cy="151.14324951171875" r="2" /></g>
            <g><circle className="point" cx="52.12689971923828" cy="149.7752685546875" r="2" /></g>
            <g><circle className="point" cx="52.58047103881836" cy="147.616455078125" r="2" /></g>
            <g><circle className="point" cx="60.82634735107422" cy="141.1866455078125" r="2" /></g>
            <g><circle className="point" cx="72.14018249511719" cy="135.37278747558594" r="2" /></g>
            <g><circle className="point" cx="94.4974594116211" cy="124.55203247070312" r="2" /></g>
            <g><circle className="point" cx="111.33577728271484" cy="116.84178161621094" r="2" /></g>
            <g><circle className="point" cx="132.12286376953125" cy="108.0046157836914" r="2" /></g>
            <g><circle className="point" cx="149.12548828125" cy="101.110107421875" r="2" /></g>
            <g><circle className="point" cx="168.0216064453125" cy="93.82861328125" r="2" /></g>
            <g><circle className="point" cx="191.0137176513672" cy="85.90978240966797" r="2" /></g>
            <g><circle className="point" cx="216.084228515625" cy="78.22476196289062" r="2" /></g>
            <g><circle className="point" cx="229.32797241210938" cy="74.48934173583984" r="2" /></g>
            <g><circle className="point" cx="240.37905883789062" cy="70.70008850097656" r="2" /></g>
            <g><circle className="point" cx="251.5511932373047" cy="67.63725280761719" r="2" /></g>
            <g><circle className="point" cx="258.56591796875" cy="68.7784423828125" r="2" /></g>
            <g><circle className="point" cx="258.8879089355469" cy="71.93997955322266" r="2" /></g>
            <g><circle className="point" cx="254.6505889892578" cy="77.87252807617188" r="2" /></g>
            <g><circle className="point" cx="245.88987731933594" cy="85.19026184082031" r="2" /></g>
            <g><circle className="point" cx="234.9035186767578" cy="92.88488006591797" r="2" /></g>
            <g><circle className="point" cx="221.6517791748047" cy="100.89817810058594" r="2" /></g>
            <g><circle className="point" cx="202.80328369140625" cy="111.34368896484375" r="2" /></g>
            <g><circle className="point" cx="185.71946716308594" cy="120.50627899169922" r="2" /></g>
            <g><circle className="point" cx="166.76502990722656" cy="130.389404296875" r="2" /></g>
            <g><circle className="point" cx="144.1190643310547" cy="141.7978057861328" r="2" /></g>
            <g><circle className="point" cx="117.61908721923828" cy="154.5872039794922" r="2" /></g>
            <g><circle id="fakePoint" cx="0" cy="0" r="0" /></g>
            <g><path id="mercuryMovePath" d="M390.815,23.832C366.308,40.034,347.556,44.862,326.494,53.152,309.26,59.932,288.11115,69.3235,265.905,78.418,261.38121,80.27046,166.81485,115.86783,140.763,125.569,119.775,133.384,100.36625,140.3335,84.828,144.32,70.029,148.113,53.186,153.974,52.179,150.024,50.805,144.637,65.301,138.839,91.817,125.852,109.493,117.191,133.0604,107.4528,154.82,98.848,181.5236,88.2856,208.89801,80.10235,228.77387,74.64747,236.06169,72.64735,255.856,63.733,258.702,69.001,261.24,73.699,251.638,81.892,231.94,94.85,226.02565,98.7353,183.014,122.9,137.128,145.224,81.044,172.504,20.66435,198.48315,18.466,199.433" fill="none"/></g>
            <g><path id="fakeMercuryMovePath" d="M390.815,23.832C366.308,40.034,347.556,44.862,326.494,53.152,309.26,59.932,288.11115,69.3235,265.905,78.418,261.38121,80.27046,166.81485,115.86783,140.763,125.569,119.775,133.384,100.36625,140.3335,84.828,144.32,70.029,148.113,53.186,153.974,52.179,150.024,50.805,144.637,65.301,138.839,91.817,125.852,109.493,117.191,133.0604,107.4528,154.82,98.848,181.5236,88.2856,208.89801,80.10235,228.77387,74.64747,236.06169,72.64735,255.856,63.733,258.702,69.001,261.24,73.699,251.638,81.892,231.94,94.85,226.02565,98.7353,183.014,122.9,137.128,145.224,81.044,172.504,20.66435,198.48315,18.466,199.433" fill="none"/></g>
          </svg>

          <Slider
            id="slider"
            value={value}
            onChange={onSliderChange}
            onBeforeChange={onBeforeChange}
            onAfterChange={onAfterChange}
            style={style}
            {...sliderProps}
          />
        </div>
      </div>
    </div>
  );
}
