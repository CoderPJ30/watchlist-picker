import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const bulkUploadFromJSON= async(data) => {
    for (const item of data) {
        await addDoc(collection(db, "watchlist"), {
            name: item.name,
            image: item.image,
            type: item.type,
            createdAt: Date.now(),
        });
    }
};

export const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) {
          alert("JSON must be an array");
          return;
        }

        await bulkUploadFromJSON(data);
        alert("Bulk upload successful 🎉");
      } catch (err) {
        alert("Invalid JSON file ❌");
        console.error(err);
      }
    };

    reader.readAsText(file);
  };