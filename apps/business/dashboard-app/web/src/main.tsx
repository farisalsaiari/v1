import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { NetworkStatusProvider } from './contexts/NetworkStatusContext';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    render(
        <BrowserRouter>
            <NetworkStatusProvider>
                <App />
            </NetworkStatusProvider>
        </BrowserRouter>,
        rootElement
    );
} else {
    console.error('Root element not found');
}
