function makeResponse(data ,version) {
    let res = {
        "version": version,
    }
    
    let new_obj = {data : data}
    Object.assign(res, new_obj);
    
    // name location diet.name diet.price
    
    return res
}

export default makeResponse;