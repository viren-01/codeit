import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';

export default function AppRouter() {
    return (
        <Routes>
            <Route path='/' Component={Home} />
        </Routes>
    )
}