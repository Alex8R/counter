import React, {Dispatch, SetStateAction} from "react";
import {AppStateType} from "../App";
import SetCounterDisplay from "./SetCounterDisplay";

type DisplayPropsType = {
    count?: number
    setMode?: boolean
    appState: AppStateType
    setAppState: (state: AppStateType) => void
    error: string
    setError: Dispatch<SetStateAction<string>>
}

function Display(props: DisplayPropsType) {
    const max = props.count === props.appState.MAX_VALUE ? "max" : "";

    return (
        props.setMode ?
            <SetCounterDisplay
                error={props.error}
                setError={props.setError}
                appState={props.appState}
                setAppState={props.setAppState}
            />
            :
            <div className={`display ${max}`}>
                {props.count}
            </div>
    )
};

export default Display;