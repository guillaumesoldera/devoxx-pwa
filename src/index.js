import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/materialize.css';
import './styles/pullToRefresh.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getDevice, Devices } from './utils/utils';
import pullToRefresh from './utils/ui/pullToRefresh';
import ptrAnimatesIos from './utils/ui/animate';

console.log('getDevice() newww', getDevice())

class Root extends React.Component {
    componentDidMount() {
        getDevice() === Devices.ios &&
        pullToRefresh({
            container: document.querySelector('.pullable'),
            animates: ptrAnimatesIos,
            refresh() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log('reloading')
                        location.reload(); return resolve()
                    }, 2000)
                })
            }
        })
    }
    render() {
        return (
            getDevice() === Devices.ios ?
                (<div className="pullable pull-to-refresh-ios">
                    <div className="pull-to-refresh-ios__spinner">
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                        <div className="pull-to-refresh-ios__blade"></div>
                    </div>
                    <main className="pull-to-refresh-ios__main">
                        <App />
                    </main>
                </div>) : <App />
        )
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));

serviceWorker.register({});


