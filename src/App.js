import React from 'react';
import ReactDOM from 'react-dom';
import MapDisplay from './components/MapDisplay';
import Spinner from './components/Spinner';
import Route from './components/Route';
import Header from './components/Header';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { lat: null, long: null, errorMessage: '' };
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude, long: position.coords.longitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    renderContent() {
        if (this.state.errorMessage && !this.state.lat && !this.state.long) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat && this.state.long) {
            const header = <Header />;
            const map = <MapDisplay lat={this.state.lat} long={this.state.long} />;
            return [header, map];
        }

        return <Spinner message="Please you need to accept the location request to continue" />
    }

    render() {
        return (
            <div >
                {this.renderContent()}
            </div>
        )
    }

}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)

export default App;