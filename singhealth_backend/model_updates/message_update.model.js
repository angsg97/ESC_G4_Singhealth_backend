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

}
