module.exports = {
    issue_id: {
        required: true,
        type: "id"
    },
    staff_id: {
        required: true,
        type: "id"
    },
    tenant_id: {
        required: true,
        type: "id"
    },
    time: {
        required: false,
        default: "Date.now()",
        type: "timestamp"
    },
    from_staff: {
        required: false,
        default: false,
        type: "boolean"
    },
    tag: {
        required: false,
        default: "",
        type: "any text"
    },
    info: {
        required: false,
        default: "",
        type: "any text"
    },
    body: {
        required: false,
        default: "",
        type: "any text"
    },
    image: {
        required: false,
        default: "",
        type: "url"
    }

};
