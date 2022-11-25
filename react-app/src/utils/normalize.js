const normalize = (dataIn) => {
    let dataOut = {};
    for (let key in dataIn) {
        dataOut[dataIn[key].id] = dataIn[key];
    }
    return dataOut;
}

export default normalize;
