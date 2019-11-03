function makeResponse(data) {
    let res = {
        "version": "2.0",
    }
    
    let new_obj = {data : data}
    Object.assign(res, new_obj);
    
    // name location diet.name diet.price
    
    return res
}

export default makeResponse;