var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const TenantSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

// method to compare user passwords
const isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}

// Pre-Hook to convert plain-text password to hash before storage
const hash_password = async function(next) {

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
}

AdminSchema.pre("save", hash_password);
AdminSchema.methods.isValidPassword = isValidPassword;

TenantSchema.pre("save", hash_password);
TenantSchema.methods.isValidPassword = isValidPassword;

const TenantModel = mongoose.model("tenant", TenantSchema);
const AdminModel = mongoose.model("admin", AdminSchema);

module.exports = {TenantModel, AdminModel};
