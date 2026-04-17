// @ts-nocheck

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * TODO: Define User schema
 *
 * Fields:
 * - name: String, required, trim, minlength 2, maxlength 50
 * - email: String, required, unique, lowercase, trim
 *   Use regex validation: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * - password: String, required, minlength 6
 *   IMPORTANT: Add { select: false } so password isn't returned by default
 * - role: String, enum ['user', 'admin'], default 'user'
 *
 * Options:
 * - Enable timestamps (createdAt, updatedAt)
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Plesae enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
  },
  {
    // Schema options here
    timestamps: true,
  }
);

/**
 * TODO: Add pre-save hook to hash password
 *
 * Before saving a user:
 * 1. Check if password is modified (if not, skip hashing)
 * 2. Hash password using bcrypt.hash(password, 10)
 * 3. Replace plain text password with hashed version
 *
 * Example structure:
 * userSchema.pre('save', async function(next) {
 *   // Only hash if password is modified
 *
 *   // Hash password and replace
 *
 * });
 */

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// }

// TODO: Create and export the User model
export const User = mongoose.model("User", userSchema);


// async function runDemo() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/demo");

//   const user = await User.create({
//     name: " Alice ",
//     email: "ALICE@EXAMPLE.COM",
//     password: "secret123",
//   });

//   console.log("=== Raw Mongoose Document ===");
//   console.log(user); // includes methods, schema info, etc.

//   console.log("\n=== Plain Object via toObject() ===");
//   const userObj = user.toObject();
//   console.log(userObj);

//   console.log("\n=== After deleting password ===");
//   delete userObj.password;
//   console.log(userObj);

//   await mongoose.disconnect();
// }

// runDemo();