import React, {useState} from 'react';
import './App.css';
import Display from "./components/Display";
import Button from "./components/button";

export type AppStateType = {
    MAX_VALUE: number
    MIN_VALUE: number
    setMode: boolean
    isSetDisabled: boolean
}

function App() {
    const MAX_VALUE = parseInt((localStorage.getItem('maxValue') || '5'), 10);
    const MIN_VALUE = parseInt((localStorage.getItem('minValue') || '0'), 10);

    const [appState, setAppState] = useState<AppStateType>({MAX_VALUE, MIN_VALUE, setMode: false, isSetDisabled: false});
    const [counter, setCounter] = useState<number>(appState.MIN_VALUE);
    const [error, setError] = useState<string>('');

    const increment = () => {
        if (counter === appState.MAX_VALUE) return false;
        setCounter(counter + 1)
    };

    const reset = () => setCounter(appState.MIN_VALUE);

    const set = () => {
        if (appState.setMode) {
            setAppState({...appState, setMode: false})
            localStorage.setItem('maxValue', JSON.stringify(appState.MAX_VALUE))
            localStorage.setItem('minValue', JSON.stringify(appState.MIN_VALUE))
        } else {
            setAppState({...appState, setMode: true})
        }
        setCounter(appState.MIN_VALUE)
    }

    return (
        <div className="App">
            <div className="container">
                <div className="variant-2">
                    <Display count={counter}
                             setMode={appState.setMode}
                             appState={appState}
                             setAppState={setAppState}
                             error={error}
                             setError={setError}
                    />
                    <div className="buttons">
                        <Button
                            name={'increment'}
                            isDisabled={(counter === appState.MAX_VALUE) || appState.setMode}
                            callBack={increment}/>
                        <Button
                            name={'reset'}
                            isDisabled={(counter === appState.MIN_VALUE) || appState.setMode}
                            callBack={reset}/>
                        <Button
                            name={'set'}
                            isDisabled={!!error && appState.isSetDisabled}
                            callBack={set}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
