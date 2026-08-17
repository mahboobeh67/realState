"use client";

import { useState } from "react";
type ProfileFormData = {
  title: string
  description: string
  location: string
  phone: string
  realState: string
  constructionDate: Date
  category: string
  rules: Record<string, string>
  amenities: string[]
}
function AddProfilePage() {
  const [serviseDate, setServiseDate] = useState<ProfileFormData>({
    title: "",
    description: "",
    location: "",
    phone: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: {},
    amenities: [],
  });
  return <div>AddProfilePage</div>;
}

export default AddProfilePage;

