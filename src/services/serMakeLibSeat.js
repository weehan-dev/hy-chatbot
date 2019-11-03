function makeResponse(data, version) {
    // name location diet.name diet.price
    let res = {
        "version": version,
    }
    
    for(let i=0; i<data.data.data.totalCount; i++)
    {   
        res[`w${i}`] = data.data.data.list[i]
        
    }
    console.log(res);

    
    
    return res
}

export default makeResponse;