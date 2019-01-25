const countries = require('./../fixtures/countries.json')

exports.search = async (ctx) => {
    //request
    let request = ctx.request.body
    let find = countries.filter((country) => {
        let condition = true;
        for(let key in request.search){
            if(request.search[key]){
                condition = !!country[key]
            }
            if(country[key] && request.search[key]){
                // strict
                // condition *= country[key] == request[key]
                //not strict
                const pattern = new RegExp(request.search[key], 'i')
                condition = condition && pattern.test(country[key])
            }
            
        }
        return condition
    })

    //sorting
    const sortBy = request.sortBy || null
    const sortDir = request.sortDir || null
    
    if(sortBy && sortDir){
        find = find.sort((a, b) => {
            let propA = a[sortBy]
            let propB = b[sortBy]
            if (propA > propB) return sortDir === 'ASC' ? 1 : -1
            if (propA < propB) return sortDir === 'ASC' ? -1 : 1
            return 0
        })
    }

    //pagination
    const onpage = parseInt(request.onPage) || 10
    const page = parseInt(request.page) || 0

    const offset = onpage*page
    output = find.slice(offset, offset+onpage)
    
    ctx.res.ok({
        pageCount: Math.ceil(find.length/output.length),
        countries: output
    })
}

exports.get = async (ctx) => {

    let output = countries.find((country) => {
        return country.id == ctx.params.id
    })
    ctx.res.ok(output)
}