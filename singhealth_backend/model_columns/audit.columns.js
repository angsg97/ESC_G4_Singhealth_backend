module.exports = {
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
    score: {
        required: true,
        type: "number"
    },
    type: {
        required: true,
        type: "plain text"
    },
    all_resolved: {
        required: false,
        default: false,
        type: "boolean"
    }
};
