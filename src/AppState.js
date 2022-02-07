import {makeAutoObservable} from "mobx";

class AppState {
    _loggedIn = false;
    set loggedIn(value) { this._loggedIn = value;}
    get loggedIn() { return this._loggedIn; }

    _cloudKey = "";
    set cloudKey(value) { this._cloudKey = value; }
    get cloudKey() { return this._cloudKey; }

    _userDetails = {};
    set userDetails(obj) { this._userDetails = obj; }
    get userDetails() { return this._userDetails; }

    _orgID = "";
    set orgID(orgID) { this._orgID = orgID };
    get orgID() { return this._orgID }

    _loadingState = {loading: false, msg: ""};
    setLoadingState(loading, msg) { this._loadingState = {loading, msg}; }
    get loadingState() { return this._loadingState; }

    _errorState = {msg: "", fatal: false};
    setErrorState(msg, fatal) {
        this._errorState = {msg, fatal};
        this.setLoadingState(false); // Setting an error clears the loading state
    };
    get errorState() { return this._errorState };

    constructor() {
        makeAutoObservable(this);
    }
}
export default new AppState();