import validateForm from "../lib/validate.js";
import Photo from "../models/photo.model.js";

export const savePhotoDetails = async (req, res, next) => {
	const {
		snapType,
		photoNo,
		photoSize,
		quantity,
		amount,
		printMethod,
		printType,
		deliveryType,
		labPhotoSize,
		labQuantity,
	} = req.body;

	const photo = new Photo({
		snapType,
		...(snapType === "Snapshot" ? { photoNo } : {}),
		photoSize,
		quantity,
		amount,
		printMethod,
		...(printMethod === "Lab"
			? {
					printType,
					deliveryType,
					labPhotoSize,
					labQuantity,
				}
			: {}),
	});

	try {
		await photo.save();
		next();
	} catch (error) {
		console.error("Error saving photo details:", error);
		if (error.name === "ValidationError") {
			return res.status(400).json({ message: "Validation error", error: error.message });
		}
		next(error);
	}
};
