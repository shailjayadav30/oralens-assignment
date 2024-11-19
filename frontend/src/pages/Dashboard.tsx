import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface FormData {
  name: string;
  age: string;
  file: File | null;
}

const Dashboard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    file: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", data);
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Healthcare Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Enter your personal information</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="120"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your age"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-violet-50 file:text-violet-700 
                  hover:file:bg-violet-100"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Information
            </button>
          </div>
        </ form>
      </div>
    </div>
  );
};

export default Dashboard;