"use strict";

import KeyMirror from "keymirror";

const actionType = KeyMirror({
    FETCH_TICKER_FULFILLED : null,
    FETCH_TICKER : null
});

export default actionType;