module.exports = {
    audit_id: {
        required: true,
        type: "id"
    },
    name: {
        required: true,
        type: "any text"
    },
    category: {
        required: true,
        type: "any text"
    },
    description: {
        required: true,
        type: "any text"
    },
    due_date: {
        required: true,
        type: "timestamp"
    },
    resolved: {
        required: false,
        default: false,
        type: "boolean"
    }
}
