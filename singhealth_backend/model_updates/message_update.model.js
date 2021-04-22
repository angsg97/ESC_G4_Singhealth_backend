module.exports = {
    normal: {
        status: 200,
        body: {
            //lol all the columns are optional
        }
    },

    invalid_time: {
        status: 400,
        body: {
            time: "lol what is this"
        }
    },

    invalid_url1: {
        status: 400,
        body: {
            image: "lol what is this"
        }
    },
    invalid_url2: {
        status: 400,
        body: {
            image: 123
        }
    },
    valid_url1: {
        status: 200,
        body: {
            image: "https://google.com"
        }
    },
    invalid_text1: {
        status: 400,
        body: {
            body: 123
        }
    },

}
