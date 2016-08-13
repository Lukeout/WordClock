import React, { Component } from 'react';
import './App.css';

// Component for Nav Elements
var ListE = React.createClass({
    render: function() {
        return (
            <li onClick={function(){this.props.setTheme(this.props.name)}.bind(this)}>{this.props.name}</li>
        )
    }
});

// Component for Navigator
var Gallery = React.createClass({
    render: function() {
        return (
        <div>
            <ul className="nav">
            <ListE name="iWatch" setTheme={this.props.setTheme} />
            <ListE name="Default" setTheme={this.props.setTheme}  />
            <ListE name="LED" setTheme={this.props.setTheme} />
            <ListE name="Wood" setTheme={this.props.setTheme}  />
            </ul>
        </div>
        )
    }
});

// Component for Each Letter 
var Text = React.createClass({
    getInitialState: function() {
        return {
            on: false,
        }
    },
    highlightHours: function(nextProps) {
        var hours = nextProps.hours;
        var minutes = nextProps.minutes;
        var val = nextProps.val; 

        if (val === hours && minutes < 35 ) {
            this.setState({on: true});
        }
        else if (minutes >= 35 && hours+1 === val ) {
            this.setState({on: true});
        }
        // Special case 12
        else if (val === 1 && minutes > 30 && hours === 12) {
            this.setState({on: true});
        }
        else {
            this.setState({on: false});
        }
    },
    highlightMins: function(nextProps) {
        var minutes = nextProps.minutes;
        //var val = nextProps.val;
        //console.log(minutes);

        //5
        if (minutes >= 5 && minutes < 10) {
            if (this.props.val === 5) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //10
        else if (minutes >= 10 && minutes < 15) {
            if (this.props.val === 10) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //15
        else if (minutes >= 15 && minutes < 20) {
            if (this.props.val === 15) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //20
        else if (minutes >= 20 && minutes < 25) {
            if(this.props.val === 20) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //25
        else if (minutes >= 25 && minutes < 30) {
            if (this.props.val === 5 || this.props.val === 20) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        } 
        //30
        else if (minutes >= 30 && minutes < 35) {
            if (this.props.val === 30) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //35
        else if (minutes >= 35 && minutes < 40) {
            if (this.props.val === 5 || this.props.val === 20 ) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        // 40
        else if (minutes >= 40 && minutes < 45) {
            if (this.props.val === 20) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //45
        else if (minutes >= 45 && minutes < 50) {
            if (this.props.val === 15) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //50
        else if (minutes >= 50 && minutes < 55) {
            if (this.props.val === 10) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        //55
        else if (minutes >= 55 && minutes < 60) {
            if (this.props.val === 5) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
        else {
            this.setState({on: false});
        }

       
    },
    highlightPT: function(nextProps) {

        var minutes = nextProps.minutes;

        if (minutes >= 35 && minutes <= 59 && this.props.name === 'TO') {
            this.setState({on:true});
        }
        else if ((minutes >= 5 && minutes < 35) && this.props.name === 'PAST') {
            this.setState({on:true});                
        }
        else {
            this.setState({on: false});
        }
    },
    highlightOCLOCK: function(nextProps) {
        var minutes = nextProps.minutes; 
        //console.log(minutes);
        if (minutes < 5) {
            this.setState({on: true});
        }
        else {
            this.setState({on: false});
        }
    },
    renderOn: function() {
        var onTheme = this.props.theme + "On";
        return (
            <span className={onTheme}>
                {this.props.name}
            </span>
        )
    },
    renderOff: function() {
        return (
            <span className="textOff">
                {this.props.name}
            </span>
        )
    },
    componentWillReceiveProps(nextProps){

        if(nextProps.type === "hours") {
            this.highlightHours(nextProps);
        }

        if (nextProps.type === "mins") {
            this.highlightMins(nextProps);
        }

        if (nextProps.type === "PT") {
            this.highlightPT(nextProps);
        }

        if (nextProps.type === "OCLOCK") {
            this.highlightOCLOCK(nextProps);
        }

        if (nextProps.type === "ITIS") {
            this.setState({on: true});
        }

        if (nextProps.type === "QUARTER") {
            if ((nextProps.minutes >= 15 && nextProps.minutes < 20) || (nextProps.minutes >= 45 && nextProps.minutes < 50)) {
                this.setState({on: true});
            }
            else {
                this.setState({on: false});
            }
        }
   },  
    render: function() {
        if (this.state.on) {
            return this.renderOn();
        }
        else {
            return this.renderOff();
        }
    }
});

// Parent Component for the Clock
var Clock = React.createClass({
  getInitialState: function () {
    return {
      Theme: "Default",
    }
  },
  // Gets the Time
  setTime: function() {
      var time = new Date();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();

      if (hours > 12 ) {
          hours -= 12; 
      } 

      if (hours === 0) {
          hours += 12; 
      }

      this.setState({
          hours: hours,
          minutes: minutes,
          seconds: seconds
      })
  },
  componentWillMount: function(){
    this.setTime();
  },
  // Get time every second
  componentDidMount: function() {
      window.setInterval(function () {
      this.setTime();
    }.bind(this), 1000);      
  },
  // Function to prop down to set theme in our navigator
  setTheme: function(childData) {
      this.setState({
          Theme: childData
      })
  },
  render: function() {
      return (
          <div>

            <div>
                <Gallery theme={this.state.theme} setTheme={this.setTheme} />
            </div>
            

            <div className={this.state.Theme}>
              <div className="clockRow">
                    <Text name="IT" type="ITIS" val={this.state.hours} hours={this.state.hours} theme={this.state.Theme}/>
                    <Text name="L"/> 
                    <Text name="IS" type="ITIS" val={this.state.hours} hours={this.state.hours} theme={this.state.Theme}/> 
                    <Text name="QM"/>
                    <Text name="TIME"/>
                </div>
                <div className="clockRow">
                    <Text name="A" type="QUARTER" minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="VM"/> 
                    <Text name="Z"/> 
                    <Text name="QUARTER" type="mins" val={15} minutes={this.state.minutes} theme={this.state.Theme}/>
                </div>
                <div className="clockRow">
                    <Text name="TWENTY" type="mins" val={20} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="FIVE" type="mins" val={5} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="E"/>                      
                </div>
                <div className="clockRow">
                    <Text name="HALF" type="mins" val={30} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="N"/> 
                    <Text name="TEN" type="mins" val={10} minutes={this.state.minutes} theme={this.state.Theme}/> 
                    <Text name="X"/>
                    <Text name="TO" type="PT" minutes={this.state.minutes} theme={this.state.Theme}/>
                </div>
                <div className="clockRow">
                    <Text name="PAST" type="PT" minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="Y"/> 
                    <Text name="TWELVE" type="hours" val={12} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/> 
                </div>
                <div className="clockRow">
                    <Text name="ONE" type="hours" val={1} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="TWO" type="hours" val={2} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/> 
                    <Text name="THREE" type="hours" val={3} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/> 
                </div>
                <div className="clockRow">
                    <Text name="FOUR" type="hours" val={4} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="FIVE" type="hours" val={5} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/> 
                    <Text name="SIX" type="hours" val={6} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/> 
                </div>
                <div className="clockRow">
                    <Text name="SEVEN" type="hours" val={7} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="O"/> 
                    <Text name="TEN" type="hours" val={10} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="CO"/> 
                </div>
                <div className="clockRow">
                    <Text name="NINE" type="hours" val={9} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="H"/> 
                    <Text name="ELEVEN" type="hours" val={11} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                </div>
                <div className="clockRow">
                    <Text name="EIGHT" type="hours" val={8} hours={this.state.hours} minutes={this.state.minutes} theme={this.state.Theme}/>
                    <Text name="OCLOCK" type="OCLOCK" minutes={this.state.minutes}/> 
                </div>
            </div>
          </div>
      )
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
            <Clock />
        </div>
      </div>
    );
  }
}

export default App;
