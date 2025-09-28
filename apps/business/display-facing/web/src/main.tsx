import { render } from 'preact';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        rootElement
    );
} else {
    console.error('Root element not found');
}
