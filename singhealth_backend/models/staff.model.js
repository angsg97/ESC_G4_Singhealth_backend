const sql = require("./db.js");

// constructor
const Staff = function(staff) {
    this.id = staff.id;
    this.name = staff.name;
    this.phone = staff.phone;
    this.email = staff.email;
    this.institution = staff.institution;
};

Staff.create = (newStaff, result) => {
    sql.query("INSERT INTO staff SET ?", newStaff, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created staff: ", { id: res.insertId, ...newStaff });
        result(null, { id: res.insertId, ...newStaff });
    });
};


Staff.findById = (staffId, result) => {
    sql.query(`SELECT * FROM staff WHERE id = ${staffId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found staff: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Staff with the id
        result({ kind: "not_found" }, null);
    });
};


Staff.getAll = result => {
    sql.query("SELECT * FROM staff", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("staff: ", res);
        result(null, res);
    });
};

Staff.updateById = (id, staff, result) => {
    sql.query(
        "UPDATE staff SET name = ?, phone = ?, email = ? , institution = ? WHERE id = ?",
        [staff.name, staff.phone, staff.email, staff.institution, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Staff with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated staff: ", { id: id, ...staff });
            result(null, { id: id, ...staff });
        }
    );
};

Staff.remove = (id, result) => {
    sql.query("DELETE FROM staff WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Staff with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted staff with id: ", id);
        result(null, res);
    });
};

Staff.removeAll = result => {
    sql.query("DELETE FROM staff", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} staff`);
        result(null, res);
    });
};

module.exports = Staff;
