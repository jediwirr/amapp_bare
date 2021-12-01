import { loadData } from "../reducers/GymReducer";
import { ip } from "../../screens/gimnazist/RegForm";

export const fetchContent = () => {
    return dispatch => {
        fetch(`https://${ip}/articles/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            dispatch(loadData(response))
        )
        .catch(error => console.log(error));
    };
};