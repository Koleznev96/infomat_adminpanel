/**
 * Convert BASE64 to BLOB
 * @param base64Image Pass Base64 image data to convert into the BLOB
 * @link https://stackoverflow.com/a/55257089/1847769
 */
export const convertBase64ToBlobParts = (base64Image: string) => {
	// Split into two parts
	const parts = base64Image.split(';base64,');

	// Decode Base64 string
	const decodedData = window.atob(parts[1]);

	// Create UNIT8ARRAY of size same as row data length
	const uInt8Array = new Uint8Array(decodedData.length);

	// Insert all character code into uInt8Array
	for (let i = 0; i < decodedData.length; ++i) {
		uInt8Array[i] = decodedData.charCodeAt(i);
	}

	// Return BLOB image after conversion
	return [uInt8Array];
};
