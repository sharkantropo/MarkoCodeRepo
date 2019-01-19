import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drums from './drum-pad-component/drum-pads';
import Displayer from './display-component/display';
import Slider from './slider-component/slider'
import {mapStatetoProps,mapDispatchDisptoProps,mapDispatchVoltoProps} from './Redux-elements/react-redux-el';
import './App.css';

/* Global Audio effects library */
const audioLibrary=
[{name:'CosmicWave',source:'https://drive.google.com/uc?export=view&id=1oYJxLHrIGUM6TB8rJv1aueRAjMML5HqF',codekey: 81,padkey:'Q'},
{name:'Discharge',source:'https://drive.google.com/uc?export=view&id=1snz2pibauVDqDrM_B7R0CdUOeKwGi1L2',codekey: 87,padkey:'W'},
{name:'ClassicJump',source:'https://drive.google.com/uc?export=view&id=1OAAFL5lz3vPi6hU7bwpCxpJnllVMS9rr',codekey: 69,padkey:'E'},
{name:'Engine',source:'https://drive.google.com/uc?export=view&id=1vn_4TpX7Cj2IajQAVkh1t0Fj1vsWOP1M',codekey: 65,padkey:'A'},
{name:'LaserShoot',source:'https://drive.google.com/uc?export=view&id=1gMxBkcsjAUx4xS8Z42Vr58qy1yWmuuF8',codekey: 83,padkey:'S'},
{name:'LaserBlast',source:'https://drive.google.com/uc?export=view&id=1f2ggw57QGcAGyjKYuGjBp30upg7lZnZp',codekey: 68,padkey:'D'},
{name:'PsiBounce',source:'https://drive.google.com/uc?export=view&id=1ykp8JX-QU6tqTF8Ce5WT6btDKuU7GOdh',codekey: 90,padkey:'Z'},
{name:'PsiString',source:'https://drive.google.com/uc?export=view&id=1xbzoEsbDzOgAzK8kiBjF0gezmRhtRIJK',codekey: 88,padkey:'X'},
{name:'Sparks',source:'https://drive.google.com/uc?export=view&id=1AqXju5upVzE6G-czth_F8fQCQABmWTQW',codekey: 67,padkey:'C'}];

/*App class*/

class App extends Component {
  render() {
    return(
    <div id="drum-machine" className="container-fluid">
      <ReduxDrums audioLib={audioLibrary} />
      <ReduxDisplayer />
	    <ReduxSlider/>
      <div id="box-name" className="text-center"><h3>DRUM MACHINE</h3></div>
    </div>);
  }
}

/*Connected containers to store*/

const ReduxDrums = connect(mapStatetoProps, mapDispatchDisptoProps)(Drums);
const ReduxDisplayer= connect(mapStatetoProps, null)(Displayer);
const ReduxSlider= connect(mapStatetoProps,mapDispatchVoltoProps)(Slider);

export default App;
