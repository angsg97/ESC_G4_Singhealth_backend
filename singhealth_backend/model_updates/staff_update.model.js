module.exports = {
    normal: {
        status: 200,
        body: {
            name: "George",
            phone: "26453726",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_name1:{
        status: 400,
        body: {
            name: "George123",
            phone: "26453726",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_name2: {
        status: 400,
        body: {
            name: "George.",
            phone: "26453726",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_number1: {
        status: 400,
        body: {
            name: "George",
            phone: "2645-3726",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_number2: {
        status: 400,
        body: {
            name: "George",
            phone: "2645372612",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_number3: {
        status: 400,
        body: {
            name: "George",
            phone: "abcde",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_number4: {
        status: 400,
        body: {
            name: "George",
            phone: "abc235de",
            email: "george@gmail.com",
            institution: "ABC"
        }
    },
    invalid_email1: {
        status: 400,
        body: {
            name: "George",
            phone: "2645372612",
            email: "georgegmail.com",
            institution: "ABC"
        }
    },
    invalid_email2: {
        status: 400,
        body: {
            name: "George",
            phone: "2645372612",
            email: "george@gmail",
            institution: "ABC"
        }
    },
    invalid_email3: {
        status: 400,
        body: {
            name: "George",
            phone: "2645372612",
            email: "george@gmail.ajshdg",
            institution: "ABC"
        }
    },
    invalid_email4: {
        status: 400,
        body: {
            name: "George",
            phone: "2645372612",
            email: "@gmail.com",
            institution: "ABC"
        }
    },
    missing_name: {
        status: 400,
        body: {
            phone: "2645372612",
            email: "@gmail.com",
            institution: "ABC"
        }
    },
}
