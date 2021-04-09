module.exports = {
    normal: {
        status: 200,
        body: {
            //lol all the columns are optional
        }
    },
    invalid_url1: {
        status: 400,
        body: {
            url: "this aint a url"
        }
    },
    invalid_url2: {
        status: 400,
        body: {
            url: "http://haha.com"
        }
    },
    invalid_url3: {
        status: 400,
        body: {
            url: "https://haha.wkajd"
        }
    },

    invalid_time: {
        status: 400,
        body: {
            time: "lol what is this"
        }
    },

}
