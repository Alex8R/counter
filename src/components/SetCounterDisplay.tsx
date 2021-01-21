import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {AppStateType} from "../App";

type SetCounterDisplayPropsType = {
    appState: AppStateType
    setAppState: (state: AppStateType) => void
    error: string
    setError: Dispatch<SetStateAction<string>>
}

function SetCounterDisplay(props: SetCounterDisplayPropsType) {

    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = +e.currentTarget.value
        if (currentValue <= props.appState.MIN_VALUE) {
            props.setError("Max value can't be <= than min value")
            props.setAppState({...props.appState, isSetDisabled: true})
            return false;
        }
        props.setError('')
        props.setAppState({...props.appState, MAX_VALUE: currentValue, isSetDisabled: false})
    }

    const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = +e.currentTarget.value
        if (currentValue >= props.appState.MAX_VALUE || currentValue < 0) {
            props.setError("Min value can't be >= than max value")
            props.setAppState({...props.appState, isSetDisabled: true})
            return false;
        }
        props.setError('')
        props.setAppState({...props.appState, MIN_VALUE: currentValue, isSetDisabled: false})
    }

    return (
        <div className={"setMode"}>
            <div className={props.error ? 'error' : ""}>
                <span>Max value: </span>
                <input type="number"
                       value={props.appState.MAX_VALUE}
                       onChange={onChangeMaxValue}/>
            </div>
            <div className={props.error ? 'error' : ""}>
                <span>Min value: </span>
                <input type="number"
                       value={props.appState.MIN_VALUE}
                       onChange={onChangeMinValue}/>
            </div>
            {props.error &&
            <span className="error">{props.error}</span>}
        </div>
    )
}

export default SetCounterDisplay;