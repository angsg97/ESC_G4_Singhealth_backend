module.exports = {
    normal: {
        status: 200,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: true,
            unit: "05-35",
            contract_date: 1615958538774
        }
    },
    string_fnb: {
        status: 200,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: "true",
            unit: "05-35",
            contract_date: 1615958538774
        }
    },
    invalid_fnb1: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: "wheeeeee",
            unit: "05-35",
            contract_date: 1615958538774
        }
    },
    invalid_fnb2: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: "05-35",
            contract_date: 1615958538774
        }
    },
    invalid_unit1: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: "05-35",
            contract_date: 1615958538774
        }
    },
    invalid_unit2: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: "055",
            contract_date: 1615958538774
        }
    },
    invalid_unit3: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: 10-5,
            contract_date: 1615958538774
        }
    },
    invalid_unit4: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: "what",
            contract_date: 1615958538774
        }
    },
    invalid_unit5: {
        status: 400,
        body: {
            name: "Starbucks",
            phone: "26453726",
            email: "starbucks@starbucks.com",
            institution: "ABC",
            fnb: 1,
            unit: "no-no",
            contract_date: 1615958538774
        }
    },

}
