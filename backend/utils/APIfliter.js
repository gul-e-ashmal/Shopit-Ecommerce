class APIfilter {
    constructor(query, querystr) {
        this.query = query;
        this.querystr = querystr;
    }

    search() {
        const keyword = this?.querystr?.keyword ? { name: { $regex: this.querystr.keyword, $options: "i" } } : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // const querycopy = { ...this.querystr };
        // let remove = ["keyword", "page"];

        // remove.forEach(el => delete querycopy[el]);

        // let querystr = JSON.stringify(querycopy)
        // querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // // let queryStr = JSON.stringify(querycopy);

        // // queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        // console.log(querystr);

        // this.query = this.query.find(JSON.parse(querystr));

        // return this

        const queryCopy = { ...this.querystr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);

        // Advance filter for price, ratings etc
        let querystr = JSON.stringify(queryCopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


        this.query = this.query.find(JSON.parse(querystr));
        return this;

    }

    pagination(resperpage) {

        let page = Number(this.querystr.page) || 1;
        let skipProduct = resperpage * (page - 1);

        this.query = this.query.limit(resperpage).skip(skipProduct);


        return this;
    }
}

module.exports = APIfilter