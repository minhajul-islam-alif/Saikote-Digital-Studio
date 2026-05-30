import mongoose from "mongoose";

const photoSchema = mongoose.Schema(
	{
		snapType: {
			type: String,
			enum: ["Snapshot", "Scan"],
			default: "Snapshot",
			required: true,
		},
		photoNo: {
			type: String,
			required: function () {
				return this.snapType !== "Scan";
			},
		},
		photoSize: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		printMethod: {
			type: String,
			enum: ["Normal", "Lab"],
			default: "Normal",
			required: true,
		},
		printType: {
			type: String,
			enum: ["Glossy", "Matte"],
			default: "Glossy",
			required: function () {
				return this.printMethod === "Lab";
			},
		},
		deliveryType: {
			type: String,
			enum: ["Non-Urgent", "Urgent"],
			default: "Non-Urgent",
			required: function () {
				return this.printMethod === "Lab";
			},
		},
		labPhotoSize: {
			type: String,
			required: function () {
				return this.printMethod === "Lab";
			},
		},
		labQuantity: {
			type: Number,
			required: function () {
				return this.printMethod === "Lab";
			},
		},
	},
	{ timestamps: true },
);

const Photo = mongoose.model("Photo", photoSchema);

export default Photo;
