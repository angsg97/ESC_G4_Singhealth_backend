module.exports = {
    name: {
        required: true,
        type: "plain text"
    },
    phone: {
        required: true,
        type: "phone"
    },
    email: {
        required: true,
        type: "email"
    },
    institution: {
        required: true,
        type: "plain text"
    },
    fnb: {
        required: false,
        default: false,
        type: "boolean"
    },
    unit: {
        required: true,
        type: "unit"
    },
    image_logo: {
        required: false,
        default: "",
        type: "url"
    },
    image_location: {
        required: false,
        default: "",
        type: "url"
    },
    contract_date: {
        required: true,
        type: "timestamp"
    }
};
