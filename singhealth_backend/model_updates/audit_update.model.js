module.exports = {
    normal: {
        status: 200,
        body: {
            time: 1615958538774,
            score: 91.5,
            type: "fnb"
        }
    },

    invalid_score1: {
        status: 200,
        body: {
            time: 1615958538774,
            score: "91.5",
            type: "fnb"
        }
    },
    invalid_score2: {
        status: 400,
        body: {
            time: 1615958538774,
            score: "what",
            type: "fnb"
        }
    },

}
