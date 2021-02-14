My$.arrCompare = function ( x, y ) {
    if (x.length !== y.length) {
        return false;
    }
 
    for (let i = 0; i < x.length; i++) {
        if (x[i] !== y[i]) {
            return false;
        }
    }

    return true;
}


