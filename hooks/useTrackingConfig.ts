import { useContext } from "react"
import { TrackingContext } from "../contexts/TrackingContext"

export const useTrackingConfig = () => {
    const config = useContext(TrackingContext);

    if (config === undefined) {
        throw new Error("useTrackingConfig must be use with a TrackingContext");
    }

    return config;
}