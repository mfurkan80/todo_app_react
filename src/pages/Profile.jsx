import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import axios from "axios";

export const profileLoader = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data.",
    );
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const initialUser = useLoaderData();

  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: initialUser.email,
    currentPassword: "",
    newPassword: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Bildirimleri tutacağımız yeni state (type: 'success' veya 'error', text: 'mesaj içeriği')
  const [message, setMessage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null); // Her yeni kaydetme işleminde eski mesajı temizle

    try {
      const response = await axios.put(
        "http://localhost:3000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setUser({ email: response.data.email });
      setIsEditing(false);
      setFormData({
        email: response.data.email,
        currentPassword: "",
        newPassword: "",
      });

      // Başarılı olursa alert yerine state'i yeşil mesaj için güncelle
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while updating your profile.";

      // Hata olursa alert yerine state'i kırmızı hata mesajı için güncelle
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <div className="w-full max-w-xl px-4 flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white transition-colors font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 border-b border-gray-700 pb-4">
            Profile Details
          </h2>

          {/* MESAJ KUTUSU BURAYA EKLENDİ */}
          {message && (
            <div
              className={`p-4 rounded-md mb-6 border ${
                message.type === "error"
                  ? "bg-red-500/10 border-red-500/50 text-red-400"
                  : "bg-green-500/10 border-green-500/50 text-green-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col gap-5">
            {/* Email Alanı */}
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400 font-medium">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="bg-gray-900/50 border border-transparent rounded-md p-3 text-white">
                  {user.email}
                </div>
              )}
            </div>

            {/* Sadece Düzenleme Modunda Görünen Şifre Değiştirme Alanı */}
            {isEditing && (
              <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-1">
                  Leave password fields blank if you don't want to change it.
                </p>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400 font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                    className="bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400 font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="bg-gray-900 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Aksiyon Butonları */}
            <div className="mt-6 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setMessage(null); // İptal edildiğinde mesajı da gizle
                      setFormData({
                        email: user.email,
                        currentPassword: "",
                        newPassword: "",
                      });
                    }}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMessage(null); // Yeni düzenlemeye başlarken eski mesajı temizle
                  }}
                  className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
