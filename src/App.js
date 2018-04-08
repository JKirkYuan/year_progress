import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { Line } from 'rc-progress';
import moment from 'moment';

let offset = new Date();
let hours = offset.getHours();
var gradient = 'background-image: url("https://source.unsplash.com/collection/176316/1650x1080")';

if(hours >= 20){
  var gradient = 'background-image: url("https://source.unsplash.com/collection/782142/")';
}
else if (hours <= 12){
  var gradient = 'background-image: url("https://source.unsplash.com/collection/539016/1650x1080")';
}
else if (hours <= 20 && hours > 12 ) {
  var gradient = 'background-image: url("https://source.unsplash.com/collection/1301453/1650x1080")';
}
else{
  var gradient = 'background-image: url("https://source.unsplash.com/collection/176316/1650x1080")';
}

const CenterDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  ${gradient};
  background-repeat: no-repeat;
  background-size: cover;
`;

const Header = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  font-size: 200%;
`

const Percent = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  white-space: pre-wrap;
  font-size: 125%;
`

const DateDiv = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 0 1% 1%;
  color: #ffffff;
`;

const AuthorDiv = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 1% 1% 0;
  color: #ffffff;
  a {
    font-size: 0.8rem;
    color: #ffffff;
    text-decoration: none;
  }
`;

const RealAuthorDiv = styled.div`
  color: #ffffff;
  a {
    font-size: 1rem;
    color: #ffffff;
    text-decoration: none;
  }
`;

const progressStyles = {
  width: '25%',
  height: '5%',
  borderStyle: 'solid',
  borderColor: '#ffffff'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      perc: 0
    };
    this.calculatePercent = this.calculatePercent.bind(this)
  }
  calculatePercent() {
    const start = moment().startOf('year');
    const end = moment().endOf('year');
    const now = moment();
    const duration = moment.duration(now.diff(start)).asMilliseconds();
    const total = moment.duration(end.diff(start)).asMilliseconds();
    const percent = duration * 100 / total;
    return percent.toFixed(10);
  }
  shouldComponentUpdate() {
  	return !document.hidden;
  }
  componentDidMount() {
    setInterval(() => {
      const percent = this.calculatePercent();
      const oldPerc = this.state.perc;
      const perc = parseFloat(percent).toFixed(2);
      if (oldPerc !== perc) {
        this.setState({ percent, perc });
      }
      this.setState({ percent });
    }, 50);
  }
  render() {
    return (
      <CenterDiv>
        <Header>
          <h2>Year Progress</h2>
        </Header>
        <Line 
          percent={this.state.perc}
          strokeWidth={1} 
          strokeColor="#ffffff" 
          trailColor="#2db7f500"
          strokeLinecap="square"
          style={progressStyles} 
        >
          Some
        </Line>
        <Percent>
          <p>{`${this.state.percent} %`}</p>
        </Percent>
        <DateDiv>
          <div>
            {moment().format("dddd, MMMM Do YYYY, HH:mm:ss")}
          </div>
        </DateDiv>
        <RealAuthorDiv>
          <a href="https://twitter.com/Mubaris_NK" target="_blank" rel="noopener noreferrer">Source Code made with ♥ by Mubaris NK</a>
        </RealAuthorDiv>
        <AuthorDiv>
        <a href="https://twitter.com/kirkyuan" target="_blank" rel="noopener noreferrer">Customized with ♥ by Kirk Yuan</a>
        </AuthorDiv>
      </CenterDiv>
    );
  }
}

injectGlobal`

  html, body {
    height: 100%;
    width: 100%;
    font-size: 108%;
  }

  #root {
    height: 100%;
    width: 100%;
  }

  @keyframes progress-bar {
    0%   {stroke-opacity : 1;}
    50%  {stroke-opacity: 0.5;}
    100% {stroke-opacity : 1;}
  }
  .rc-progress-line-path {
    animation: progress-bar 2.5s linear infinite;
  }
`;

export default App;
