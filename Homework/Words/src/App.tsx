import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {DictionaryPage} from "./pages/DictionaryPage/DictionaryPage.tsx";
import {TestPage} from "./pages/TestPage/TestPage.tsx";
import {ResultPage} from "./pages/ResultPage/ResultPage.tsx";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/dictionary" element={<DictionaryPage />} />
                    <Route path="/test" element={<TestPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;