const countries = require('./../fixtures/countries.json')

exports.search = async (ctx) => {
    let find = countries.filter((country) => {
        let condition = true;
        for(let key in ctx.query){
            if(country[key] && ctx.query[key]){
                // strict
                // condition *= country[key] == ctx.query[key]
                //not strict
                const pattern = new RegExp(ctx.query[key], 'i')
                condition *= pattern.test(country[key])
            }
            
        }
        return condition
    })

    //sorting
    const sortBy = ctx.query.sortBy || null
    const sortDir = ctx.query.sortDir || null
    
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
    const onpage = parseInt(ctx.query.onPage) || 10
    const page = parseInt(ctx.query.page) || 0

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